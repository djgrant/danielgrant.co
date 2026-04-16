"use client";

import { RiArrowLeftSLine, RiArrowRightSLine } from "react-icons/ri";
import { useScrollNav } from "../hooks/use-scroll-nav";

export function ScrollArrows(props: {
  showLabels: boolean;
  className?: string;
}) {
  const { canGoLeft, canGoRight, goLeft, goRight, activeIndex, sectionTitles } =
    useScrollNav();

  const prevLabel = activeIndex > 0 ? sectionTitles[activeIndex - 1] : null;
  const nextLabel =
    activeIndex < sectionTitles.length - 1
      ? sectionTitles[activeIndex + 1]
      : null;

  return (
    <div className={"flex md:gap-2 items-center " + props.className}>
      {(canGoLeft || !props.showLabels) && (
        <button
          onClick={goLeft}
          disabled={!canGoLeft}
          aria-label="Previous section"
          className={
            "p-1 rounded transition-colors md:border dark:border-slate-600 " +
            (props.showLabels ? "flex items-center xs:pr-2.5 " : " ") +
            (canGoLeft
              ? "text-black/80 dark:text-white/80 md:hover:bg-black/5 md:dark:hover:bg-white/5"
              : "text-black/20 dark:text-white/20 cursor-default")
          }
        >
          <RiArrowLeftSLine className="w-5 h-5 -left-[1px] relative" />
          {props.showLabels && prevLabel && (
            <span className="hidden xs:inline text-xs text-black/70">
              {prevLabel}
            </span>
          )}
        </button>
      )}

      {props.showLabels && canGoLeft && canGoRight && (
        <span className="text-black/30 hidden xs:block">/</span>
      )}

      {(canGoRight || !props.showLabels) && (
        <button
          onClick={goRight}
          disabled={!canGoRight}
          aria-label="Next section"
          className={
            "p-1 rounded transition-colors md:border dark:border-slate-600 " +
            (props.showLabels ? "flex items-center xs:pl-2.5 " : " ") +
            (canGoRight
              ? "text-black/80 dark:text-white/80 md:hover:bg-black/5 md:dark:hover:bg-white/5"
              : "text-black/20 dark:text-white/20 cursor-default")
          }
        >
          {props.showLabels && nextLabel && (
            <span className="hidden xs:inline text-xs text-black/70">
              {nextLabel}
            </span>
          )}
          <RiArrowRightSLine className="w-5 h-5 -right-[1px] relative" />
        </button>
      )}
    </div>
  );
}
