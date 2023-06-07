import type { V2_MetaFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { getPosts } from "../models/post.model";
import { Posts } from "~/components/posts";

export const meta: V2_MetaFunction = () => [{ title: "Daniel Grant – Posts" }];

export async function loader() {
  const posts = await getPosts();
  return json(posts);
}

export default function PostsPage() {
  const posts = useLoaderData<typeof loader>();

  return (
    <main>
      <h1>Posts</h1>
      <Posts posts={posts} />
    </main>
  );
}
