import { SocialIcons } from "./socials";

export function Intro() {
  return (
    <div className="prose prose-lg prose-slate dark:prose-invert">
      <h1>Hello!</h1>
      <p className="mb-8">
        I'm Daniel Grant, a software engineer and startup founder based in
        Scotland. <br />
        HMU if we share some interests. I love to talk!
      </p>
      <SocialIcons />
    </div>
  );
}
