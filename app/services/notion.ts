import "dotenv/config";
import fs from "fs/promises";
import { Client } from "@notionhq/client";
import { NotionToMarkdown } from "notion-to-md";
import slugify from "@sindresorhus/slugify";
import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkGfm from "remark-gfm";
import remarkRehype from "remark-rehype";
import rehypeRaw from "rehype-raw";
import rehypePrism from "@mapbox/rehype-prism";
import rehypeStringify from "rehype-stringify";
import { getEnv } from "~/utils/env";
import { QueryDatabaseResponse } from "@notionhq/client/build/src/api-endpoints";

const notionSecret = getEnv("NOTION_SECRET");
const notion = new Client({ auth: notionSecret });
const n2m = new NotionToMarkdown({ notionClient: notion });

export type PageMeta = { title: string; slug: string; date: string };
export type Page = PageMeta & { content: string };

export async function getPages(databaseId: string) {
  const queryResponse = await notion.databases.query({
    database_id: databaseId,
  });

  // todo: handle response.has_more
  return queryResponse.results.map(getPageMeta);
}

export async function getPageBySlug(
  slug: string,
  databaseId: string
): Promise<Page | null> {
  const queryResponse = await notion.databases.query({
    database_id: databaseId,
    filter: { property: "Slug", rich_text: { equals: slug } },
  });
  const page = queryResponse.results[0];

  if (!page) return null;

  const meta = getPageMeta(page);
  const markdownAst = await n2m.pageToMarkdown(page.id);
  const markdownObj = n2m.toMarkdownString(markdownAst);
  const markdown = markdownObj.parent.replaceAll(
    "</details>\n",
    "</details>\n\n"
  );
  const content = await markdownToHTML(markdown);

  return { ...meta, content };
}

function getPageMeta(page: QueryDatabaseResponse["results"][number]): PageMeta {
  if (!("properties" in page)) {
    throw new Error("Database query did not return a list of pages");
  }

  const title = (page.properties.Name as any).title[0].plain_text;
  const slug = slugify(title);
  const date = (page.properties.Date as any).date.start;

  return { slug, title, date };
}

async function markdownToHTML(markdown: string) {
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
