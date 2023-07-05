import Post from "@/components/post";
import { getPost, getPosts } from "@/models/posts.model";

export type Props = { params: { slug: string } };

export const revalidate = "force-cache";

export default async function Page({ params }: Props) {
  const post = await getPost(params.slug);
  return <Post post={post} />;
}

export async function generateMetadata({ params }: Props) {
  const post = await getPost(params.slug);
  return {
    title: post.title,
    openGraph: {
      title: post.title,
      description: post.summary,
      url: `/posts/${post.slug}`,
      type: "website",
    },
  };
}

export async function generateStaticParams() {
  const posts = await getPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}
