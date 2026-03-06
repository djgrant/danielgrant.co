import React from "react";
import Link, { LinkProps } from "next/link";
import { RiLinkedinBoxLine, RiBlueskyLine, RiGithubLine, RiTwitterXLine } from "react-icons/ri";
import { FaHackerNews } from "react-icons/fa";
import type { SocialLinks } from "notion-cms";

type SocialIconsProps = { className?: string; socialLinks?: SocialLinks };

export const SocialIcons = (props: SocialIconsProps) => (
  <div className={`flex text-3xl space-x-5 ${props.className || ""}`}>
    <IconLink
      icon={RiBlueskyLine}
      href={props.socialLinks?.bluesky || "https://bsky.app/profile/djgrant.bsky.social"}
      aria-label="Bluesky"
    />
    <IconLink
      icon={RiLinkedinBoxLine}
      href={props.socialLinks?.linkedin || "https://www.linkedin.com/in/~djgrant/"}
      aria-label="LinkedIn"
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
    className="hover:text-teal-500 dark:text-zinc-300"
  >
    {React.createElement(icon)}
  </Link>
);
