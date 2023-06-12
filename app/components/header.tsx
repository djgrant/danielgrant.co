import { NavLink } from "@remix-run/react";
import { RxCaretLeft } from "react-icons/rx";

export function Header() {
  return (
    <NavLink to="/" className="inline-block my-8 sm:my-10 -ml-[1.25em]">
      <div className="flex place-items-center text-sm font-sans text-slate-500">
        <RxCaretLeft size={16} className="-right-0.5 sm:right-0 relative" />
        <span className="leading-4 ml-1">Posts</span>
      </div>
    </NavLink>
  );
}
