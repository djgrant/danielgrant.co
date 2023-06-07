import "dotenv/config";
import fs from "fs/promises";
import { Client } from "@notionhq/client";
import { NotionToMarkdown } from "notion-to-md";
import slugify from "@sindresorhus/slugify";

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
  const blocks = await n2m.pageToMarkdown(notionPage.id);
  const postContentMarkdown = n2m.toMarkdownString(blocks);
  const post = postTemplate(notionPage, postContentMarkdown);
  const postJson = JSON.stringify(post, null, 2);
  await fs.writeFile(`./posts/${post.slug}.json`, postJson);

  const { content, ...postMeta } = post;
  posts.push(postMeta);
}

await fs.writeFile(`./posts/index.json`, JSON.stringify(posts, null, 2));

function postTemplate(page, content) {
  const title = page.properties.Name.title[0].plain_text;
  const slug = slugify(title);
  const date = page.properties.Date.date.start;
  return {
    slug,
    title,
    date,
    content: content.parent,
  };
}
