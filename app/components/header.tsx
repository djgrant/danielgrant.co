import { NavLink } from "@remix-run/react";
import { SocialIcons } from "./socials";

export function Header() {
  return (
    <header className="flex flex-col sm:flex-row space-y-6 sm:text-left sm:space-y-0 sm:pt-9 sm:pb-8 pt-5 pb-4 mb-6 border-b">
      <div className="flex-1">
        <NavLink to="/" className="text-2xl font-sans font-extrabold">
          Daniel Grant
        </NavLink>
      </div>
      <div className="hidden sm:block">
        <SocialIcons />
      </div>
    </header>
  );
}
