import { SocialIcons } from "./socials";

export function Footer(props: { className?: string }) {
  return (
    <div
      className={`w-40 py-8 sm:py-8 border-t-2 border-teal-300 ${props.className}`}
    >
      <SocialIcons />
    </div>
  );
}
