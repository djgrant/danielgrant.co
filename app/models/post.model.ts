import type { Post } from "~/types";
import path from "path";
import fs from "fs/promises";

export async function getPosts(): Promise<Post[]> {
  const postsPath = path.join(process.cwd(), "./posts/index.json");
  const postsRaw = await fs.readFile(postsPath, { encoding: "utf-8" });
  return JSON.parse(postsRaw);
}

export async function getPost(slug: string): Promise<Post | null> {
  const postPath = path.join(process.cwd(), `./posts/${slug}.json`);
  try {
    const postRaw = await fs.readFile(postPath, { encoding: "utf-8" });
    return JSON.parse(postRaw);
  } catch {
    return null;
  }
}
