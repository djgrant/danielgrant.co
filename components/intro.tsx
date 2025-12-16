import { SocialIcons } from "./socials";

export function Intro() {
  return (
    <div className="prose prose-lg prose-slate dark:prose-invert">
      <h1>Hello!</h1>
      <p>
        I'm Daniel Grant, a software engineer and startup founder based in
        Scotland. I currently thinking about what to work on next. HMU if we
        share some interests. I love to talk!
      </p>
      <SocialIcons />
    </div>
  );
}
