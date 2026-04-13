import { Posts } from "../components/posts";
import { Intro } from "../components/intro";
import { LinkList } from "../components/link-list";
import { ScrollProgress } from "../components/scroll-progress";
import { SocialIcons } from "../components/socials";
import { getPosts } from "../models/posts.model";
import openSource from "../data/open-source.json";
import talks from "../data/talks.json";
import research from "../data/research.json";
import products from "../data/products.json";

function Section(props: { title: string; children: React.ReactNode }) {
  return (
    <div
      role="region"
      aria-label={props.title}
      className={
        "snap-start min-h-0 " +
        "min-w-[100vw] md:min-w-[420px] flex-1 flex flex-col h-full prose dark:prose-invert " +
        "md:border-l border-dashed border-white/10 "
      }
    >
      <div className="pb-5 pl-8 font-medium text-2xl dark:text-white/80 leading-5">
        {props.title}
      </div>
      <div className="min-h-0 h-full overflow-y-scroll pl-8 pb-8 pt-5">
        {props.children}
      </div>
    </div>
  );
}

export default async function Home() {
  const posts = await getPosts();
  return (
    <main className="h-dvh flex flex-col gap-y-4 md:pt-12">
      <div className="hidden md:block absolute top-3 left-0 w-full border-b border-dashed border-white/10"></div>
      <div className="hidden md:block flex-0 prose prose-lg dark:prose-invert pt-4 pb-14">
        <Intro />
        <SocialIcons />
      </div>
      <div className="flex items-end justify-between pt-3 sm:pt-8 md:hidden">
        <div className="dark:text-white/90 text-2xl font-extralight tracking-wide leading-4">
          Daniel's
        </div>
        <SocialIcons className="-mt-0.5" />
      </div>
      <ScrollProgress sectionCount={6}>
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
            I have worked at <a href="https://www.skyscanner.net">Skyscanner</a>
            , <a href="https://www.volvocars.com">Volvo</a>,{" "}
            <a href="https://www.kashflow.com">KashFlow</a>,{" "}
            <a href="https://www.ibm.com">IBM</a> and{" "}
            <a href="https://www.bbc.co.uk">BBC</a>.
          </p>
          <p>
            I helped startups <a href="https://www.wonderbly.com">Wonderbly</a>,{" "}
            <a href="https://www.meetfern.ai">Fern</a> and{" "}
            <a href="https://contact.xyz/">Contact</a> get off the ground.
          </p>
          <p>
            Interested in working with me? <br />
            Slide in my <a href="https://www.linkedin.com/in/~djgrant/">DMs</a>
            .{" "}
          </p>
        </Section>
      </ScrollProgress>
    </main>
  );
}
