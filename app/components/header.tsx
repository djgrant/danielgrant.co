import { NavLink } from "@remix-run/react";

export function Header() {
  return (
    <header className="py-8 mb-6 border-b">
      <NavLink to="/" className="text-2xl">
        Daniel Grant
      </NavLink>
    </header>
  );
}
