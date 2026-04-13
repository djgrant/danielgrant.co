import React from "react";
import type { PageMeta } from "notion-cms";
import Link from "next/link";

export function Posts({ posts }: { posts: PageMeta[] }) {
  return (
    <div className="space-y-6">
      {posts.map((post) => {
        const prettyDate = new Date(post.date).toLocaleDateString("en-UK", {
          dateStyle: "long",
        });
        return (
          <div key={post.slug}>
            <Link href={`/posts/${post.slug}`} className="text-lg">
              {post.title}
            </Link>
            <div className="text-sm mt-[1px] mb-6">{prettyDate}</div>
          </div>
        );
      })}
    </div>
  );
}
