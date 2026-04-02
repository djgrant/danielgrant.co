import { Posts } from "../components/posts";
import { Intro } from "../components/intro";
import { Footer } from "../components/footer";
import { getPosts } from "../models/posts.model";

export default async function Home() {
  const posts = await getPosts();
  return (
    <main className="pt-16 pb-6">
      <div className="prose prose-lg dark:prose-invert">
        <Intro />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-[3fr_2fr] gap-x-8 mt-2">
        <div className="prose prose-lg dark:prose-invert">
          <h2>Posts</h2>
          <Posts posts={posts} />
        </div>

        <div className="prose prose-lg dark:prose-invert">
          <h2>Open Source</h2>
          <ul className="list-none pl-0 [&>li]:ps-0">
            <li>
              <a href="https://github.com/djgrant/piq">piq</a>
              <div className="text-base opacity-70">
                TypeScript SDK for document collections
              </div>
            </li>
            <li>
              <a href="https://github.com/djgrant/pok">pok</a>
              <div className="text-base opacity-70">
                Like Next.js but for CLI apps
              </div>
            </li>
            <li>
              <a href="https://github.com/notationlabs/yieldstar">yieldstar</a>
              <div className="text-base opacity-70">
                Local-first durable workflows
              </div>
            </li>
            <li>
              <a href="https://notation.dev">notation</a>
              <div className="text-base opacity-70">
                TypeScript-native infrastructure-as-code
              </div>
            </li>
            <li>
              <a href="https://github.com/djgrant/mdz">mdz</a>
              <div className="text-base opacity-70">
                Markdown superset for LLMs as a runtime
              </div>
            </li>
            <li>
              <a href="https://code-input.vercel.app/">react-code-input</a>
              <div className="text-base opacity-70">
                Turn &lt;input /&gt; into a mini code editor
              </div>
            </li>
            <li>
              <a href="https://github.com/djgrant/classy">classy</a>
              <div className="text-base opacity-70">
                Build React/Solid components from CSS classes
              </div>
            </li>
          </ul>

          <h2>Talks</h2>
          <ul className="list-none pl-0 [&>li]:ps-0">
            <li>
              <a href="https://youtu.be/Z5tg6_eIphc?t=12843">
                Monorepos and Microservices
              </a>
              <div className="text-base opacity-70">Monorepo.World 2024</div>
            </li>
            <li>
              <a href="https://www.youtube.com/watch?v=BLWDvDuXsE0">
                Building Serverless Applications
              </a>
              <div className="text-base opacity-70">SFNode Meetup 2024</div>
            </li>
            <li>
              <a href="https://www.youtube.com/watch?v=lYUutf4HEME">
                The Art of Reduxion
              </a>
              <div className="text-base opacity-70">Ember London 2016</div>
            </li>
            <li>
              <a href="https://codepen.io/collection/AEZORX">
                Exploring CSS3's 3D Space
              </a>
              <div className="text-base opacity-70">Frontend London 2014</div>
            </li>
          </ul>

          <h2>Career</h2>
          <p>
            I've worked at <a href="https://www.skyscanner.net">Skyscanner</a>,{" "}
            <a href="https://www.volvocars.com">Volvo Cars</a>,{" "}
            <a href="https://www.ibm.com">IBM</a>,{" "}
            <a href="https://www.bbc.co.uk">BBC</a>,{" "}
            <a href="https://www.wonderbly.com">Wonderbly</a>, and{" "}
            <a href="https://www.kashflow.com">KashFlow</a>.
          </p>
        </div>
      </div>

      <Footer />
    </main>
  );
}
