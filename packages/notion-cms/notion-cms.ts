import { Client as NotionClient } from "@notionhq/client";
import { NotionToMarkdown } from "notion-to-md";
import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkGfm from "remark-gfm";
import remarkRehype from "remark-rehype";
import rehypeRaw from "rehype-raw";
import rehypePrism from "@mapbox/rehype-prism";
import rehypeStringify from "rehype-stringify";
import rehypeFigure from "rehype-figure";
import { QueryDatabaseResponse } from "@notionhq/client/build/src/api-endpoints.js";

export type SocialLinks = {
  bluesky?: string;
  linkedin?: string;
  x?: string;
  hn?: string;
};

export type PageMeta = {
  title: string;
  slug: string;
  date: string;
  status: string;
  summary?: string;
  month?: string;
  tags: { id: string; name: string; color: string }[];
  socialLinks: SocialLinks;
};

export type Page = PageMeta & { content: string; minutes: number };

const mdImageRegex = new RegExp(
  /!\[(?<caption>[^\]]*)\]\((?<path>.*?)(?=\"|\))\)/
);

export class NotionCMS {
  private notion: NotionClient;
  private n2m: NotionToMarkdown;
  constructor(opts: { notionSecret: string }) {
    this.notion = new NotionClient({ auth: opts.notionSecret });
    this.n2m = new NotionToMarkdown({ notionClient: this.notion });
    this.n2m.setCustomTransformer("image", async (block) => {
      const image = (block as any).image;
      if (!image) return "";

      const url =
        image.type === "external" ? image.external?.url : image.file?.url;
      if (!url) return "";

      const caption = image.caption
        .map((item: { plain_text: string }) => item.plain_text)
        .join("")
        .trim();

      // Only use the explicit Notion caption; do not fall back to filename.
      return `![${caption}](${url})`;
    });
  }

  async getPages(databaseId: string) {
    const queryResponse = await this.notion.databases.query({
      database_id: databaseId,
      filter: { property: "Status", select: { equals: "Published" } },
      sorts: [{ property: "Date", direction: "descending" }],
    });

    // todo: handle response.has_more
    return queryResponse.results.map(NotionCMS.getPageMeta);
  }

  async getPageBySlug(
    slug: string,
    databaseId: string,
    replaceImageUrl?: (imgUrl: string) => Promise<string> | string
  ): Promise<Page | null> {
    const queryResponse = await this.notion.databases.query({
      database_id: databaseId,
      filter: { property: "Slug", rich_text: { equals: slug } },
    });
    const page = queryResponse.results[0];

    if (!page) return null;

    const meta = NotionCMS.getPageMeta(page);
    let markdownBlocks = await this.n2m.pageToMarkdown(page.id);

    if (replaceImageUrl) {
      markdownBlocks = await Promise.all(
        markdownBlocks.map(async (block) => {
          if (block.type !== "image") return block;
          const imageUrlMatches = block.parent.match(mdImageRegex);
          if (!imageUrlMatches?.groups) return block;
          const { caption, path } = imageUrlMatches.groups;
          const newImageUrl = await replaceImageUrl(path);
          block.parent = `![${caption}](${newImageUrl})`;
          return block;
        })
      );
    }

    const markdown = this.n2m.toMarkdownString(markdownBlocks).parent;
    const html = await NotionCMS.markdownToHTML(markdown);

    const wordCount = markdown.split(" ").length;
    const minutes = Math.ceil(wordCount / 200);

    return { ...meta, minutes, content: html };
  }

  private static getPageMeta(
    page: QueryDatabaseResponse["results"][number]
  ): PageMeta {
    if (!("properties" in page)) {
      throw new Error("Database query did not return a list of pages");
    }
    const summary =
      (page.properties.Summary as any).rich_text[0]?.plain_text || "";
    const status = (page.properties.Status as any).select.name;
    const date = (page.properties.Date as any).date.start;
    const title = (page.properties.Name as any).title[0].plain_text;
    const slug = (page.properties.Slug as any).rich_text[0].plain_text;
    const month = (page.properties.Month as any).rich_text[0]?.plain_text;
    const tags = (page.properties.Tags as any).multi_select;
    const socialLinks: SocialLinks = {
      bluesky: (page.properties.Bluesky as any)?.url || undefined,
      linkedin: (page.properties.LinkedIn as any)?.url || undefined,
      x: (page.properties.X as any)?.url || undefined,
      hn: (page.properties.HN as any)?.url || undefined,
    };

    return { slug, title, date, status, summary, month, tags, socialLinks };
  }

  private static async markdownToHTML(markdown: string) {
    const fixedMarkdown = markdown
      .replaceAll("</details>\n", "</details>\n\n")
      .replaceAll("’", "'")
      .replaceAll("“", '"')
      .replaceAll("”", '"');

    const file = await unified()
      .use(remarkParse)
      .use(remarkGfm)
      .use(remarkRehype, { allowDangerousHtml: true })
      .use(rehypeRaw)
      .use(rehypePrism)
      .use(rehypeFigure, { className: " " })
      .use(rehypeStringify)
      .process(fixedMarkdown);

    return String(file).replaceAll("<p>undefined\n", "<p>");
  }
}
