import fse from "fs-extra";
import { NotionCMS } from "notion-cms";
import { notionSecret, postsDatabaseId } from "./envs.js";
import download from "image-downloader";
import path from "path";

const notion = new NotionCMS({ notionSecret });

runGenerate();

async function runGenerate() {
  // Write page manifest
  const pages = await notion.getPages(postsDatabaseId);
  await fse.writeJson("./data/posts/index.json", pages, { spaces: 2 });

  // Write pages
  for (const pageMeta of pages) {
    const page = await notion.getPageBySlug(
      pageMeta.slug,
      postsDatabaseId,
      imageReplacer
    );
    if (!page) continue;
    await fse.writeJSON(`./data/posts/${page.slug}.json`, page, { spaces: 2 });
  }
}

async function imageReplacer(url: string) {
  const parsedUrl = new URL(url);
  const webPath = path.join(
    "/images",
    parsedUrl.pathname.replace("secure.notion-static.com", "pages")
  );
  const fsPath = path.join(process.cwd(), "public", webPath);

  await fse.ensureDir(path.dirname(fsPath));
  await download.image({ url, dest: fsPath });

  return webPath;
}
