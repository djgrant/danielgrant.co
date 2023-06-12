import type { Page } from "notion-cms";
import { Header } from "./header";
import { Footer } from "./footer";
import { RxCalendar } from "react-icons/rx";

export default function Post(props: { post: Page }) {
  const { date, title, content } = props.post;
  return (
    <main>
      <Header />
      <article className="prose max-w-none pb-1">
        <h1 className="mb-3">{title}</h1>
        <div className="flex align-center mb-6 text-slate-500">
          <RxCalendar className="mr-1.5" size={14} />
          <div className="leading-4 font-sans text-xs">
            {new Date(date).toLocaleDateString("en-UK", {
              dateStyle: "long",
            })}
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
