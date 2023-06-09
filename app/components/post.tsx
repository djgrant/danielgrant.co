import type { Page } from "notion-cms";

export default function Post(props: { post: Page }) {
  const { date, title, content } = props.post;
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
