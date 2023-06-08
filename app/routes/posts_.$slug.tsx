import type { V2_MetaFunction, LoaderArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { getPost } from "../models/post.model";
import "prismjs/themes/prism-tomorrow.min.css";

export const meta: V2_MetaFunction = ({ data }) => [
  { title: `${data.title} – Daniel Grant` },
];

export async function loader({ params }: LoaderArgs) {
  const slug = params.slug!;
  const post = await getPost(slug);
  if (!post) {
    throw new Response(null, {
      status: 404,
      statusText: "Not Found",
    });
  }
  return json(post);
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
