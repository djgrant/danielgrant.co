import { SocialIcons } from "./socials";

export function Intro() {
  return (
    <div className="prose prose-lg">
      <h1>Hello!</h1>
      <p>
        I'm Daniel Grant, a software developer based in Scotland. I am currently
        building <a href="https://notation.dev">Notation</a>, a workflow
        platform for TypeScript developers. <br />I write here about
        programming, open source, and growing a business. HMU if we share some
        interests. I love to talk!
      </p>
      <SocialIcons />
    </div>
  );
}
