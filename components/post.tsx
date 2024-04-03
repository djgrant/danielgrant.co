import type { Page } from "notion-cms";
import Link from "next/link";
import { Header } from "./header";
import { Footer } from "./footer";
import { SignUpForm } from "./sign-up";

export default function Post(props: { post: Page }) {
  const { date, title, content } = props.post;
  return (
    <main>
      <Header />
      <article className="prose prose-lg dark:prose-invert max-w-none pb-1">
        <h1 className="mb-6">{title}</h1>
        <div className="flex mb-6 not-prose">
          <Link href="/">
            <img
              src="/images/profile.png"
              alt="Daniel Grant profile photo"
              className="block w-10 h-10 mr-3 rounded-full"
            />
          </Link>
          <div className="font-sans">
            <Link href="/">
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
        <div className="pt-2" dangerouslySetInnerHTML={{ __html: content }} />
        <div className="pt-4 p-4 my-8 border dark:border-slate-700 rounded-lg not-prose font-sans">
          <p className="opacity-75 text-base mb-4">
            Thanks for reading! If you enjoyed this, subscribe for free to get
            next month's post delivered direct to your inbox.
          </p>
          <SignUpForm />
        </div>
      </article>
      <Footer className="mt-1 sm:mt-2 mb-1.5" />
    </main>
  );
}
