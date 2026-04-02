import type { SocialLinks } from "notion-cms";
import { SocialIcons } from "./socials";

export function Footer(props: { className?: string; socialLinks?: SocialLinks; hideSocials?: boolean }) {
  return (
    <div
      className={`w-40 mt-10 pt-10 pb-4 border-t-2 border-teal-300 ${props.className}`}
    >
      {!props.hideSocials && <SocialIcons socialLinks={props.socialLinks} />}
    </div>
  );
}
