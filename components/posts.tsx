import type { PageMeta } from "notion-cms";
import Link from "next/link";

export function Posts({ posts }: { posts: PageMeta[] }) {
  return (
    <ul>
      {posts.map((post) => (
        <li key={post.slug}>
          <Link href={`/posts/${post.slug}`}>{post.title}</Link>
        </li>
      ))}
    </ul>
  );
}
