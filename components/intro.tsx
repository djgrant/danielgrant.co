import { SocialIcons } from "./socials";

export function Intro() {
  return (
    <div className="prose prose-lg">
      <h1>Hello!</h1>
      <p>
        I'm Daniel Grant, a software developer based in Scotland. I am currently
        building <a href="https://notation.dev">Notation</a>, a tool for
        compiling TypeScript to cloud-native software. HMU if we share some
        interests. I love to talk!
      </p>
      <SocialIcons />
    </div>
  );
}
