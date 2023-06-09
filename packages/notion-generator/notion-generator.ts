import { Client as NotionClient } from "@notionhq/client";
import { NotionToMarkdown } from "notion-to-md";
import slugify from "@sindresorhus/slugify";
import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkGfm from "remark-gfm";
import remarkRehype from "remark-rehype";
import rehypeRaw from "rehype-raw";
import rehypePrism from "@mapbox/rehype-prism";
import rehypeStringify from "rehype-stringify";
import { QueryDatabaseResponse } from "@notionhq/client/build/src/api-endpoints.js";

export type PageMeta = { title: string; slug: string; date: string };
export type Page = PageMeta & { content: string };

export class NotionGenerator {
  private notion: NotionClient;
  private n2m: NotionToMarkdown;
  constructor(opts: { notionSecret: string }) {
    this.notion = new NotionClient({ auth: opts.notionSecret });
    this.n2m = new NotionToMarkdown({ notionClient: this.notion });
  }

  async getPages(databaseId: string) {
    const queryResponse = await this.notion.databases.query({
      database_id: databaseId,
    });

    // todo: handle response.has_more
    return queryResponse.results.map(NotionGenerator.getPageMeta);
  }

  async getPageBySlug(slug: string, databaseId: string): Promise<Page | null> {
    const queryResponse = await this.notion.databases.query({
      database_id: databaseId,
      filter: { property: "Slug", rich_text: { equals: slug } },
    });
    const page = queryResponse.results[0];

    if (!page) return null;

    const meta = NotionGenerator.getPageMeta(page);
    const markdownAst = await this.n2m.pageToMarkdown(page.id);
    const markdownObj = this.n2m.toMarkdownString(markdownAst);
    const markdown = markdownObj.parent.replaceAll(
      "</details>\n",
      "</details>\n\n"
    );
    const content = await NotionGenerator.markdownToHTML(markdown);

    return { ...meta, content };
  }

  private static getPageMeta(
    page: QueryDatabaseResponse["results"][number]
  ): PageMeta {
    if (!("properties" in page)) {
      throw new Error("Database query did not return a list of pages");
    }

    const title = (page.properties.Name as any).title[0].plain_text;
    const slug = slugify(title);
    const date = (page.properties.Date as any).date.start;

    return { slug, title, date };
  }

  private static async markdownToHTML(markdown: string) {
    const file = await unified()
      .use(remarkParse)
      .use(remarkGfm)
      .use(remarkRehype, { allowDangerousHtml: true })
      .use(rehypeRaw)
      .use(rehypePrism)
      .use(rehypeStringify)
      .process(markdown);

    return String(file);
  }
}
