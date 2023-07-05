import type { Page, PageMeta } from "notion-cms";

export const getPosts = async () => {
  const posts = (await import("../data/posts/index.json"))
    .default as PageMeta[];

  if (process.env.NODE_ENV === "production") {
    return posts.filter((post) => post.status === "Published");
  }

  return posts;
};

export const getPost = async (slug: string) => {
  return (await import(`../data/posts/${slug}.json`)).default as Page;
};
