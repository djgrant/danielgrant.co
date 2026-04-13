import Link from "next/link";
import { RxCaretLeft } from "react-icons/rx";

export function Header() {
  return (
    <Link href="/" className="inline-block my-6 sm:my-10 -ml-[0.5em]">
      <div className="flex place-items-center text-base font-sans text-slate-500 dark:text-slate-400">
        <RxCaretLeft size={18} className="-right-1 sm:right-0 relative" />
        <span className="leading-4 ml-1">Posts</span>
      </div>
    </Link>
  );
}
