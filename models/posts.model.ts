import fse from "fs-extra";
import type { Page, PageMeta } from "notion-cms";

export const getPosts = async () => {
  const posts = (await fse.readJSON("./data/posts/index.json", {
    encoding: "utf-8",
  })) as PageMeta[];

  if (process.env.NODE_ENV === "production") {
    return posts.filter((post) => post.status === "Published");
  }

  return posts;
};

export const getPost = async (slug: string) => {
  const post = (await fse.readJson(`./data/posts/${slug}.json`, {
    encoding: "utf-8",
  })) as Page;

  return post;
};
