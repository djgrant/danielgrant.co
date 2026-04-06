import { SocialIcons } from "./socials";

export function Intro() {
  return (
    <div className="prose prose-lg prose-slate dark:prose-invert">
      <h1>Hello!</h1>
      <p className="mb-6 md:mb-2">
        I'm Daniel Grant. I build software products, support communties, and
        write things.
      </p>
      <p className="mt-0 mb-8">
        HMU if we share some interests. I love to talk!
      </p>
      <SocialIcons />
    </div>
  );
}
