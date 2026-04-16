import React from "react";
import Link, { LinkProps } from "next/link";
import {
  RiLinkedinBoxLine,
  RiBlueskyLine,
  RiGithubLine,
  RiTwitterXLine,
} from "react-icons/ri";
import { FaHackerNews } from "react-icons/fa";
import type { SocialLinks } from "notion-cms";

type SocialIconsProps = { className?: string; socialLinks?: SocialLinks };

export const SocialIcons = (props: SocialIconsProps) => (
  <div className={`flex text-3xl space-x-4 ${props.className || ""}`}>
    <IconLink
      icon={RiLinkedinBoxLine}
      href={
        props.socialLinks?.linkedin || "https://www.linkedin.com/in/~djgrant/"
      }
      aria-label="LinkedIn"
    />
    <IconLink
      icon={RiBlueskyLine}
      href={
        props.socialLinks?.bluesky ||
        "https://bsky.app/profile/djgrant.bsky.social"
      }
      aria-label="Bluesky"
    />
    <IconLink
      icon={RiTwitterXLine}
      href={props.socialLinks?.x || "https://x.com/djgrant_"}
      aria-label="X"
    />
    {props.socialLinks?.hn ? (
      <IconLink
        icon={FaHackerNews}
        href={props.socialLinks.hn}
        aria-label="Hacker News"
      />
    ) : (
      <IconLink
        icon={RiGithubLine}
        href="https://github.com/djgrant"
        aria-label="Github"
      />
    )}
  </div>
);

type IconLinkProps = { icon: React.FunctionComponent } & LinkProps;

const IconLink = ({ icon, ...linkProps }: IconLinkProps) => (
  <Link
    {...linkProps}
    target="_blank"
    className="dark:text-white/70 text-zinc-700 md:dark:text-white/90 md:text-slate-800"
  >
    {React.createElement(icon, {
      className:
        "w-[22px] h-[22px] xs:w-[25px] xs:h-[25px] md:w-[28px] md:h-[28px]",
    } as any)}
  </Link>
);
