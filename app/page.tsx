import { Posts } from "../components/posts";
import { Intro } from "../components/intro";
import { Footer } from "../components/footer";
import { LinkList } from "../components/link-list";
import { getPosts } from "../models/posts.model";
import openSource from "../data/open-source.json";
import talks from "../data/talks.json";

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="prose prose-lg dark:prose-invert">
      <h2>{title}</h2>
      {children}
    </div>
  );
}

export default async function Home() {
  const posts = await getPosts();
  return (
    <main className="pt-16 pb-6">
      <div className="prose prose-lg dark:prose-invert">
        <Intro />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-[3fr_2fr] gap-x-8 mt-2">
        <Section title="Posts">
          <Posts posts={posts} />
        </Section>

        <div className="flex flex-col">
          <Section title="Open Source">
            <LinkList items={openSource} />
          </Section>

          <Section title="Talks">
            <LinkList items={talks} />
          </Section>

          <Section title="Career">
            <p>
              I've worked at <a href="https://www.skyscanner.net">Skyscanner</a>
              , <a href="https://www.volvocars.com">Volvo Cars</a>,{" "}
              <a href="https://www.ibm.com">IBM</a>,{" "}
              <a href="https://www.bbc.co.uk">BBC</a>,{" "}
              <a href="https://www.wonderbly.com">Wonderbly</a>,{" "}
              <a href="https://www.kashflow.com">KashFlow</a>, and helped
              several startups get off the ground.
            </p>
          </Section>
        </div>
      </div>

      <Footer />
    </main>
  );
}
