"use client";

import { RiArrowLeftSLine, RiArrowRightSLine } from "react-icons/ri";
import { useScrollNav } from "../hooks/use-scroll-nav";

export function ScrollArrows(props: { className?: string }) {
  const { canGoLeft, canGoRight, goLeft, goRight } = useScrollNav();

  return (
    <div className={"flex gap-1 " + props.className}>
      <button
        onClick={goLeft}
        disabled={!canGoLeft}
        aria-label="Previous section"
        className={
          "p-0.5 rounded transition-colors " +
          (canGoLeft
            ? "text-black dark:text-white/90 hover:bg-black/10 dark:hover:bg-white/10"
            : "text-black/20 dark:text-white/20 cursor-default")
        }
      >
        <RiArrowLeftSLine className="w-5 h-5" />
      </button>
      <button
        onClick={goRight}
        disabled={!canGoRight}
        aria-label="Next section"
        className={
          "p-0.5 rounded transition-colors " +
          (canGoRight
            ? "text-black dark:text-white/90 hover:bg-black/10 dark:hover:bg-white/10"
            : "text-black/20 dark:text-white/20 cursor-default")
        }
      >
        <RiArrowRightSLine className="w-5 h-5" />
      </button>
    </div>
  );
}
