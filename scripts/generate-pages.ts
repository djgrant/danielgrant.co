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

  // Write pages (skip existing posts)
  for (const pageMeta of pages) {
    const postPath = `./data/posts/${pageMeta.slug}.json`;
    if (await fse.pathExists(postPath)) {
      console.log(`Skipping existing post: ${pageMeta.slug}`);
      continue;
    }
    const page = await notion.getPageBySlug(
      pageMeta.slug,
      postsDatabaseId,
      imageReplacer
    );
    if (!page) continue;
    await fse.writeJSON(postPath, page, { spaces: 2 });
    console.log(`Created post: ${page.slug}`);
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
