import type {
  V2_MetaFunction,
  LoaderArgs,
  HeadersFunction,
} from "@remix-run/node";
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { getPost } from "~/models/posts.model";
import Post from "~/components/post";
import "prismjs/themes/prism-tomorrow.min.css";

export const meta: V2_MetaFunction = ({ data }) => [
  { title: `${data.title} – Daniel Grant` },
];

export const headers: HeadersFunction = ({ loaderHeaders }) => ({
  "Cache-Control": loaderHeaders.get("Cache-Control") || "no-store",
});

export async function loader({ params }: LoaderArgs) {
  const slug = params.slug!;
  const post = await getPost(slug);
  if (!post) {
    throw new Response(null, {
      status: 404,
      statusText: "Not Found",
    });
  }
  return json(post, {
    headers: {
      "cache-control": isRecentlyPublished(post.date)
        ? "public, max-age=60, s-maxage=300, stale-while-revalidate=604800"
        : "public, max-age=600, s-maxage=1800, stale-while-revalidate=604800",
    },
  });
}

export default function PostRoute() {
  const post = useLoaderData<typeof loader>();
  return <Post post={post} />;
}

function isRecentlyPublished(publishedAt: string) {
  let oneDayMs = 86400000;
  let millisecondsSincePublished = Date.now() - Date.parse(publishedAt);
  return millisecondsSincePublished < oneDayMs;
}
