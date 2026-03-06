"use client";

import { useEffect, useState } from "react";
import type { SocialLinks } from "notion-cms";

type CommentThread = {
  id: string;
  author: string;
  authorUrl: string;
  avatar?: string;
  text: string;
  date: string;
  platform: "bluesky" | "hn";
  url: string;
  replies: CommentThread[];
};

export function Comments({ socialLinks }: { socialLinks?: SocialLinks }) {
  const [threads, setThreads] = useState<CommentThread[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!socialLinks) {
      setLoading(false);
      return;
    }

    const fetchers: Promise<CommentThread[]>[] = [];
    if (socialLinks.bluesky) fetchers.push(fetchBlueskyComments(socialLinks.bluesky));
    if (socialLinks.hn) fetchers.push(fetchHNComments(socialLinks.hn));

    if (fetchers.length === 0) {
      setLoading(false);
      return;
    }

    Promise.all(fetchers)
      .then((results) => setThreads(results.flat()))
      .finally(() => setLoading(false));
  }, [socialLinks]);

  if (loading) {
    return <p className="text-sm text-slate-500">Loading comments…</p>;
  }

  if (threads.length === 0) return null;

  return (
    <div className="space-y-6">
      {threads.map((thread) => (
        <CommentNode key={thread.id} comment={thread} depth={0} />
      ))}
    </div>
  );
}

function CommentNode({ comment, depth }: { comment: CommentThread; depth: number }) {
  return (
    <div>
      <div className="flex gap-3">
        {comment.avatar ? (
          <img
            src={comment.avatar}
            alt=""
            className="w-8 h-8 rounded-full flex-shrink-0 mt-0.5"
          />
        ) : (
          <div className="w-8 h-8 rounded-full flex-shrink-0 mt-0.5 bg-orange-100 text-orange-600 flex items-center justify-center text-xs font-bold">
            {comment.author[0]?.toUpperCase()}
          </div>
        )}
        <div className="min-w-0">
          <div className="flex items-center gap-2 text-sm">
            <a
              href={comment.authorUrl}
              target="_blank"
              className="font-medium hover:text-teal-500"
            >
              {comment.author}
            </a>
            <span className="text-slate-400">·</span>
            <a
              href={comment.url}
              target="_blank"
              className="text-slate-400 hover:text-teal-500"
            >
              {formatDate(comment.date)}
            </a>
            {depth === 0 && <PlatformBadge platform={comment.platform} />}
          </div>
          <p className="text-sm mt-1 whitespace-pre-wrap">{comment.text}</p>
        </div>
      </div>
      {comment.replies.length > 0 && (
        <div className="ml-5 pl-6 mt-4 space-y-4 border-l-2 border-slate-200 dark:border-slate-700">
          {comment.replies.map((reply) => (
            <CommentNode key={reply.id} comment={reply} depth={depth + 1} />
          ))}
        </div>
      )}
    </div>
  );
}

function PlatformBadge({ platform }: { platform: CommentThread["platform"] }) {
  const label = platform === "bluesky" ? "Bluesky" : "HN";
  return (
    <span className="text-[0.65rem] uppercase tracking-wider text-slate-400 font-medium">
      {label}
    </span>
  );
}

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("en-UK", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

// --- Bluesky ---

function blueskyUriFromUrl(url: string): string | null {
  const match = url.match(
    /bsky\.app\/profile\/([^/]+)\/post\/([^/?]+)/
  );
  if (!match) return null;
  return `at://${match[1]}/app.bsky.feed.post/${match[2]}`;
}

function parseBlueskyThread(node: any): CommentThread | null {
  const post = node.post;
  if (!post?.record?.text) return null;

  const rkey = post.uri.split("/").pop();
  const replies = (node.replies || [])
    .map(parseBlueskyThread)
    .filter((r: CommentThread | null): r is CommentThread => r !== null);

  return {
    id: post.uri,
    author: post.author.displayName || post.author.handle,
    authorUrl: `https://bsky.app/profile/${post.author.handle}`,
    avatar: post.author.avatar,
    text: post.record.text,
    date: post.record.createdAt,
    platform: "bluesky",
    url: `https://bsky.app/profile/${post.author.handle}/post/${rkey}`,
    replies,
  };
}

async function fetchBlueskyComments(url: string): Promise<CommentThread[]> {
  const uri = blueskyUriFromUrl(url);
  if (!uri) return [];

  const res = await fetch(
    `https://public.api.bsky.app/xrpc/app.bsky.feed.getPostThread?uri=${encodeURIComponent(uri)}&depth=6`
  );
  if (!res.ok) return [];

  const data = await res.json();
  const replies: any[] = data.thread?.replies || [];

  return replies
    .map(parseBlueskyThread)
    .filter((r): r is CommentThread => r !== null);
}

// --- Hacker News ---

function decodeHNText(html: string): string {
  return html
    .replace(/<p>/g, "\n")
    .replace(/<[^>]+>/g, "")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#x27;/g, "'")
    .trim();
}

async function fetchHNThread(id: number, depth: number): Promise<CommentThread | null> {
  const res = await fetch(
    `https://hacker-news.firebaseio.com/v0/item/${id}.json`
  );
  if (!res.ok) return null;

  const item = await res.json();
  if (item.deleted || item.dead || !item.text) return null;

  let replies: CommentThread[] = [];
  if (depth < 4 && item.kids?.length) {
    const childResults = await Promise.all(
      item.kids.slice(0, 10).map((kid: number) => fetchHNThread(kid, depth + 1))
    );
    replies = childResults.filter((r): r is CommentThread => r !== null);
  }

  return {
    id: String(item.id),
    author: item.by,
    authorUrl: `https://news.ycombinator.com/user?id=${item.by}`,
    text: decodeHNText(item.text),
    date: new Date(item.time * 1000).toISOString(),
    platform: "hn",
    url: `https://news.ycombinator.com/item?id=${item.id}`,
    replies,
  };
}

async function fetchHNComments(url: string): Promise<CommentThread[]> {
  const match = url.match(/id=(\d+)/);
  if (!match) return [];

  const res = await fetch(
    `https://hacker-news.firebaseio.com/v0/item/${match[1]}.json`
  );
  if (!res.ok) return [];

  const item = await res.json();
  const kids: number[] = item.kids || [];
  if (kids.length === 0) return [];

  const results = await Promise.all(
    kids.slice(0, 20).map((id) => fetchHNThread(id, 0))
  );
  return results.filter((r): r is CommentThread => r !== null);
}
