import type { V2_MetaFunction, HeadersFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { Posts } from "~/components/posts";
import { Intro } from "~/components/intro";
import { getPosts } from "~/models/posts.model";

export const meta: V2_MetaFunction = () => [{ title: "Daniel Grant" }];

export const headers: HeadersFunction = ({ loaderHeaders }) => ({
  "Cache-Control": loaderHeaders.get("Cache-Control") || "no-store",
});

export async function loader() {
  const posts = await getPosts();
  return json(posts, {
    headers: {
      "Cache-Control":
        "public, max-age=600, s-maxage=1800, stale-while-revalidate=604800",
    },
  });
}

export default function IndexRoute() {
  const posts = useLoaderData<typeof loader>();

  return (
    <main className="prose prose-lg max-w-none pt-16 pb-6">
      <Intro />
      <h2>Posts</h2>
      <Posts posts={posts} />
    </main>
  );
}
