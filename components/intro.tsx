import { SocialIcons } from "./socials";

export function Intro() {
  return (
    <div className="prose prose-lg">
      <h1>Hello!</h1>
      <p>
        I'm Daniel Grant, a software developer based in Scotland. I currently am
        building <a href="https://github.com/notation-dev/notation">Notation</a>
        , an open source framework for building serverless applications. HMU if
        we share some interests. I love to talk!
      </p>
      <SocialIcons />
    </div>
  );
}
