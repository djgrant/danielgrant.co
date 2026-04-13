import { SocialIcons } from "./socials";

export function Intro() {
  return (
    <div className="prose prose-lg prose-slate dark:prose-invert">
      <h2 className="!mt-0 !mb-3">Hello!</h2>
      <p className="mb-6 text-base">
        I'm Daniel. I create software and write things.
      </p>
      <SocialIcons />
    </div>
  );
}
