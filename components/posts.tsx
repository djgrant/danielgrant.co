"use client";
import React, { useState } from "react";
import type { PageMeta } from "notion-cms";
import Link from "next/link";

export function Posts({ posts }: { posts: PageMeta[] }) {
  const [expanded, setExpanded] = useState(false);
  const displayedPosts = expanded ? posts : posts.slice(0, 15);
  return (
    <>
      <ul className="list-none pl-0">
        {displayedPosts.map((post) => {
          const prettyDate = new Date(post.date).toLocaleDateString("en-UK", {
            dateStyle: "long",
          });
          return (
            <li key={post.slug} className="ps-0">
              <Link href={`/posts/${post.slug}`}>{post.title}</Link>
              <div className="text-sm opacity-70 mt-[1px] mb-6">
                {prettyDate}
              </div>
            </li>
          );
        })}
      </ul>
      {posts.length > 15 && !expanded && (
        <div className="opacity-70">
          <button
            onClick={() => setExpanded(true)}
            className="text-sm underline mt-4"
          >
            Show older posts
          </button>
        </div>
      )}
    </>
  );
}
