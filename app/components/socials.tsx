import React from "react";
import { Link, LinkProps } from "@remix-run/react";
import { RiLinkedinBoxLine, RiTwitterLine, RiGithubLine } from "react-icons/ri";

export const SocialIcons = (props: { className?: string }) => (
  <div className={`flex text-3xl space-x-5 ${props.className || ""}`}>
    <IconLink
      icon={RiTwitterLine}
      to="https://twitter.com/djgrant_"
      aria-label="Twitter"
    />
    <IconLink
      icon={RiLinkedinBoxLine}
      to="https://www.linkedin.com/in/~djgrant/"
      aria-label="LinkedIn"
    />
    <IconLink
      icon={RiGithubLine}
      to="https://github.com/djgrant"
      aria-label="Github"
    />
  </div>
);

type IconLinkProps = { icon: React.FunctionComponent } & LinkProps;

const IconLink = ({ icon, ...linkProps }: IconLinkProps) => (
  <Link {...linkProps} target="_blank" className="hover:text-teal-500">
    {React.createElement(icon)}
  </Link>
);
