import type { Page, PageMeta } from "notion-cms";

export const getPosts = async () => {
  return (await import("../data/posts/index.json")).default as PageMeta[];
};

export const getPost = async (slug: string) => {
  return (await import(`../data/posts/${slug}.json`)).default as Page;
};
