import { SocialIcons } from "./socials";

export function Footer() {
  return (
    <header className="flex flex-col sm:flex-row space-y-6 items-center text-center sm:text-left sm:space-y-0 pt-8 pb-9 mt-6 border-t">
      <div className="flex-1">Copyright © 2023 • All rights reserved</div>
      <SocialIcons />
    </header>
  );
}
