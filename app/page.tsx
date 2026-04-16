import { Posts } from "../components/posts";
import { Intro } from "../components/intro";
import { LinkList } from "../components/link-list";
import { ScrollArrows } from "../components/scroll-arrows";
import { ScrollProgress } from "../components/scroll-progress";
import { SocialIcons } from "../components/socials";
import { Section } from "../components/section";
import { getPosts } from "../models/posts.model";
import openSource from "../data/open-source.json";
import talks from "../data/talks.json";
import research from "../data/research.json";
import products from "../data/products.json";

export default async function Home() {
  const posts = await getPosts();
  return (
    <main className="h-dvh flex flex-col gap-y-4 md:pt-12">
      <div className="hidden md:block absolute top-3 left-0 z-20 w-full border-b border-dashed dark:border-white/10"></div>

      <div className="hidden flex-0 md:block pb-10">
        <Intro />
        <SocialIcons />
      </div>

      <ScrollArrows
        showLabels={false}
        className="hidden md:flex absolute top-7 right-4 z-20"
      />

      <div className="flex items-end justify-between pt-3 sm:pt-8 md:hidden">
        <div className="text-black dark:text-white/90 text-2xl font-extralight tracking-wide leading-4">
          Daniel's
        </div>
        <SocialIcons className="top-1 relative" />
      </div>
      <ScrollProgress
        sectionCount={6}
        sectionTitles={[
          "Posts",
          "Research",
          "Open Source",
          "Talks",
          "Products",
          "Career",
        ]}
        className="flex-1 min-h-0 -mx-8 relative"
      >
        <ScrollArrows
          showLabels
          className="md:hidden fixed right-3 sm:right-7 z-10"
        />
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

        <Section title="Career" last>
          <p className="mt-0">
            I've worked at <a href="https://www.skyscanner.net">Skyscanner</a>,{" "}
            <a href="https://www.volvocars.com">Volvo</a>,{" "}
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
            Slide into my{" "}
            <a href="https://www.linkedin.com/in/~djgrant/">DMs</a>.{" "}
          </p>
        </Section>
      </ScrollProgress>

      <div className="hidden md:block bg-gradient-to-l from-white dark:from-slate-900 to-transparent w-8 absolute top-0 bottom-4 right-0" />
    </main>
  );
}
