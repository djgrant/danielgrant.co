import React from "react";
import Link, { LinkProps } from "next/link";
import { RiLinkedinBoxLine, RiTwitterLine, RiGithubLine } from "react-icons/ri";

export const SocialIcons = (props: { className?: string }) => (
  <div className={`flex text-3xl space-x-5 ${props.className || ""}`}>
    <IconLink
      icon={RiTwitterLine}
      href="https://twitter.com/djgrant_"
      aria-label="Twitter"
    />
    <IconLink
      icon={RiLinkedinBoxLine}
      href="https://www.linkedin.com/in/~djgrant/"
      aria-label="LinkedIn"
    />
    <IconLink
      icon={RiGithubLine}
      href="https://github.com/djgrant"
      aria-label="Github"
    />
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
