import type {
  V2_MetaFunction,
  LoaderArgs,
  HeadersFunction,
} from "@remix-run/node";
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { getPost } from "../models/post.model";
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

export default function Post() {
  const { date, title, content } = useLoaderData<typeof loader>();
  return (
    <main>
      <article className="prose max-w-none pb-4">
        <h1 className="mb-2">{title}</h1>
        <div>{date}</div>
        <div dangerouslySetInnerHTML={{ __html: content }} />
      </article>
    </main>
  );
}

function isRecentlyPublished(publishedAt: string) {
  let oneDayMs = 86400000;
  let millisecondsSincePublished = Date.now() - Date.parse(publishedAt);
  return millisecondsSincePublished < oneDayMs;
}
