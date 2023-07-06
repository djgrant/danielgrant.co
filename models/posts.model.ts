import type { Page, PageMeta } from "notion-cms";
import { notFound } from "next/navigation";

export const getPosts = async () => {
  return (await import("../data/posts/index.json").catch(notFound))
    .default as PageMeta[];
};

export const getPost = async (slug: string) => {
  return (await import(`../data/posts/${slug}.json`).catch(notFound))
    .default as Page;
};
