import fse from "fs-extra";
import { NotionGenerator } from "notion-generator";
import { notionSecret, postsDatabaseId } from "./envs.js";

const notion = new NotionGenerator({ notionSecret });

await fse.ensureDir("./data/posts");

// Write page manifest
const pages = await notion.getPages(postsDatabaseId);
await fse.writeJson("./data/posts/index.json", pages, { spaces: 2 });

// Write pages
for (const pageMeta of pages) {
  const page = await notion.getPageBySlug(pageMeta.slug, postsDatabaseId);
  if (!page) continue;
  await fse.writeJSON(`./data/posts/${page.slug}.json`, page, { spaces: 2 });
}
