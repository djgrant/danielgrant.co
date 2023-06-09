import type { PageMeta } from "~/services/notion";
import { NavLink } from "@remix-run/react";

export function Posts({ posts }: { posts: PageMeta[] }) {
  return (
    <ul>
      {posts.map((post) => (
        <li key={post.slug}>
          <NavLink to={`/posts/${post.slug}`}>{post.title}</NavLink>
        </li>
      ))}
    </ul>
  );
}
