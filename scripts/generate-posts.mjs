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

const notionSecret = process.env.NOTION_SECRET;
const postsDatabaseId = process.env.NOTION_POSTS_DATABASE_ID;

const notion = new Client({
  auth: notionSecret,
  separateChildPage: true,
});

const n2m = new NotionToMarkdown({ notionClient: notion });

const databasePagesResponse = await notion.databases.query({
  database_id: postsDatabaseId,
});

const posts = [];

for (const notionPage of databasePagesResponse.results) {
  const post = await render(notionPage);
  const postJson = JSON.stringify(post, null, 2);
  await fs.writeFile(`./posts/${post.slug}.json`, postJson);

  const { content, ...postMeta } = post;
  posts.push(postMeta);
}

await fs.writeFile(`./posts/index.json`, JSON.stringify(posts, null, 2));

async function render(page) {
  const title = page.properties.Name.title[0].plain_text;
  const slug = slugify(title);
  const date = page.properties.Date.date.start;
  const markdownAst = await n2m.pageToMarkdown(page.id);
  const markdownObj = n2m.toMarkdownString(markdownAst);
  const markdown = markdownObj.parent.replaceAll(
    "</details>\n",
    "</details>\n\n"
  );

  const html = await toHTML(markdown);

  return {
    slug,
    title,
    date,
    content: html,
  };
}

async function toHTML(markdown) {
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
