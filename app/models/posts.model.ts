import fse from "fs-extra";
import type { Page, PageMeta } from "notion-generator";

export const getPosts = (): Promise<PageMeta[]> => {
  return fse.readJSON("./data/posts/index.json", { encoding: "utf-8" });
};

export const getPost = (slug: string): Promise<Page> => {
  return fse.readJson(`./data/posts/${slug}.json`, { encoding: "utf-8" });
};
