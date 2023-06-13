import type { Page } from "notion-cms";
import { Link } from "@remix-run/react";
import { Header } from "./header";
import { Footer } from "./footer";

export default function Post(props: { post: Page }) {
  const { date, title, content } = props.post;
  return (
    <main>
      <Header />
      <article className="prose max-w-none pb-1">
        <h1 className="mb-6">{title}</h1>
        <div className="flex mb-6 not-prose">
          <Link to="/">
            <img
              src="/images/profile.png"
              alt="Daniel Grant profile photo"
              className="block w-10 h-10 mr-3 rounded-full"
            />
          </Link>
          <div className="font-sans">
            <Link to="/">
              <div className="text-[0.85em] font-medium -mb-0.5">
                Daniel Grant
              </div>
            </Link>
            <div className="text-xs text-slate-500">
              {new Date(date).toLocaleDateString("en-UK", {
                dateStyle: "long",
              })}
            </div>
          </div>
        </div>
        <div
          className="border-t"
          dangerouslySetInnerHTML={{ __html: content }}
        />
      </article>
      <Footer className="mt-1 sm:mt-2 mb-1.5" />
    </main>
  );
}
