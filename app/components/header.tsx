import { NavLink } from "@remix-run/react";
import { SocialIcons } from "./socials";

export function Header() {
  return (
    <header className="flex pt-9 pb-8 mb-6 border-b">
      <div className="flex-1">
        <NavLink to="/" className="text-2xl">
          Daniel Grant
        </NavLink>
      </div>
      <SocialIcons />
    </header>
  );
}
