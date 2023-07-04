import Post from "@/components/post";
import { getPost, getPosts } from "@/models/posts.model";

export default async function Page(props: { params: { slug: string } }) {
  const post = await getPost(props.params.slug);
  return <Post post={post} />;
}

export async function generateStaticParams() {
  const posts = await getPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata() {
  return { title: "Hello" };
}
