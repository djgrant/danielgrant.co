import type { Page } from "notion-cms";
import Link from "next/link";
import { Header } from "./header";
import { SignUpForm } from "./sign-up";
import { SocialIcons } from "./socials";
import { Pill } from "./pill";

export default function Post(props: { post: Page }) {
  const { date, title, content, socialLinks } = props.post;
  const hasPostLinks = socialLinks && Object.values(socialLinks).some(Boolean);
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
              Published on{" "}
              {new Date(date).toLocaleDateString("en-UK", {
                dateStyle: "long",
              })}
            </div>
          </div>
        </div>
        {Boolean(props.post.tags.length) && (
          <div className="space-x-2">
            {props.post.tags.map((tag) => (
              <div key={tag.id}>
                <Pill type={tag.color as any}>{tag.name}</Pill>
                {tag.name === "Month Notes" && props.post.month && (
                  <Pill type="green" className="ml-2">
                    {props.post.month}
                  </Pill>
                )}
              </div>
            ))}
          </div>
        )}
        <div className="pt-2" dangerouslySetInnerHTML={{ __html: content }} />
        <div className="mt-14 pt-8 w-40 border-t-2 border-teal-300 not-prose font-sans">
          {hasPostLinks && <h3 className="text-lg font-semibold mb-4">Comments</h3>}
          <SocialIcons socialLinks={socialLinks} />
        </div>
        <div className="pt-4 p-4 mt-10 mb-10 border dark:border-slate-700 rounded-lg not-prose font-sans">
          <p className="opacity-75 text-base mb-4">
            Thanks for reading! If you enjoyed this, subscribe for free to get
            next month's post delivered direct to your inbox.
          </p>
          <SignUpForm />
        </div>
      </article>
    </main>
  );
}
