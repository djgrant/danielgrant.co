import type { V2_MetaFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { getPosts } from "~/models/post.model";
import { Posts } from "~/components/posts";

export const meta: V2_MetaFunction = () => [{ title: "Daniel Grant" }];

export async function loader() {
  const posts = await getPosts();
  return json(posts);
}

export default function Index() {
  const posts = useLoaderData<typeof loader>();

  return (
    <main className="prose max-w-none pb-6">
      <h2>Hello!</h2>
      <p>Description about Daniel Grant</p>
      <h2>Posts</h2>
      <Posts posts={posts} />
    </main>
  );
}
