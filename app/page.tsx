import { Posts } from "../components/posts";
import { Intro } from "../components/intro";
import { getPosts } from "../models/posts.model";

export const revalidate = "force-cache";

export default async function Home() {
  const posts = await getPosts();
  return (
    <main className="prose prose-lg max-w-none pt-16 pb-6">
      <Intro />
      <h2>Posts</h2>
      <Posts posts={posts} />
    </main>
  );
}
