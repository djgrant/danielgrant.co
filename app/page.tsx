import { Posts } from "../components/posts";
import { Intro } from "../components/intro";
import { LinkList } from "../components/link-list";
import { getPosts } from "../models/posts.model";
import openSource from "../data/open-source.json";
import talks from "../data/talks.json";
import research from "../data/research.json";
import products from "../data/products.json";

function Section({
  title,
  children,
  className,
}: {
  title: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      role="region"
      aria-label={title}
      className={
        "snap-start min-h-0 min-w-[100vw] sm:min-w-[420px] flex-1 flex flex-col h-full prose dark:prose-invert " +
        "border-l border-dashed border-white/10 " +
        className
      }
    >
      <h2 className="pb-2 !m-0 pl-8">{title}</h2>
      <div className="min-h-0 h-full overflow-y-scroll pl-8 pb-8 pr-16 pt-6">
        {children}
      </div>
    </div>
  );
}

export default async function Home() {
  const posts = await getPosts();
  return (
    <main className="h-dvh flex flex-col gap-y-4 pt-12">
      <div className="absolute top-3 left-0 w-full border-b border-dashed border-white/10"></div>
      <div className="flex-0 prose prose-lg dark:prose-invert pb-8">
        <Intro />
      </div>
      <div className="flex-1 min-h-0">
        <div
          className="flex min-h-0 h-full -ml-8 overflow-x-scroll snap-x snap-mandatory focus:outline-none focus-visible:ring-2"
          tabIndex={0}
        >
          <Section title="Posts">
            <Posts posts={posts} />
          </Section>

          <Section title="Research">
            <LinkList items={research} />
          </Section>

          <Section title="Open Source">
            <LinkList items={openSource} />
          </Section>

          <Section title="Talks">
            <LinkList items={talks} />
          </Section>

          <Section title="Products">
            <LinkList items={products} />
          </Section>

          <Section title="Career">
            <p className="mt-0">
              I worked at <a href="https://www.skyscanner.net">Skyscanner</a>,{" "}
              <a href="https://www.volvocars.com">Volvo</a>,{" "}
              <a href="https://www.kashflow.com">KashFlow</a>,{" "}
              <a href="https://www.ibm.com">IBM</a> and{" "}
              <a href="https://www.bbc.co.uk">BBC</a>.
            </p>
            <p>
              I helped <a href="https://www.wonderbly.com">Wonderbly</a>,{" "}
              <a href="https://www.meetfern.ai">Fern</a> and{" "}
              <a href="https://contact.xyz/">Contact</a> get off the ground.
            </p>
            <p>
              Interested in working with me? <br />
              Slide in my{" "}
              <a href="https://www.linkedin.com/in/~djgrant/">DMs</a>.{" "}
            </p>
          </Section>
        </div>
      </div>
    </main>
  );
}
