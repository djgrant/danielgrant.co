import type { Post } from "~/types";
import { NavLink } from "@remix-run/react";

export function Posts({ posts }: { posts: Post[] }) {
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
