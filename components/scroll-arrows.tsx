"use client";

import { RiArrowLeftSLine, RiArrowRightSLine } from "react-icons/ri";
import { useScrollNav } from "../hooks/use-scroll-nav";

export function ScrollArrows(props: {
  showLabels: boolean;
  className?: string;
}) {
  const { canGoLeft, canGoRight, goLeft, goRight, activeIndex, sectionTitles } =
    useScrollNav();

  const hasPrev = activeIndex > 0;
  const hasNext = activeIndex < sectionTitles.length - 1;
  const prevLabel = hasPrev ? sectionTitles[activeIndex - 1] : null;
  const nextLabel = hasNext ? sectionTitles[activeIndex + 1] : null;

  return (
    <div className={"flex md:gap-2 items-center " + props.className}>
      {(hasPrev || !props.showLabels) && (
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
          <RiArrowLeftSLine className="w-4 h-4 sm:w-5 sm:h-5 top-[1px] sm:top-0 -left-[1px] relative" />
          {props.showLabels && (
            <span
              className={
                "hidden xs:inline text-xs transition-opacity duration-300 " +
                (prevLabel
                  ? "opacity-100 text-black/70 dark:text-white/70"
                  : "opacity-0")
              }
            >
              {prevLabel ?? sectionTitles[0]}
            </span>
          )}
        </button>
      )}

      {props.showLabels && hasPrev && hasNext && (
        <span className="text-black/20 dark:text-white/20 hidden xs:block">
          /
        </span>
      )}

      {(hasNext || !props.showLabels) && (
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
          {props.showLabels && (
            <span
              className={
                "hidden xs:inline text-xs transition-opacity duration-300 " +
                (nextLabel
                  ? "opacity-100 text-black/70 dark:text-white/70"
                  : "opacity-0")
              }
            >
              {nextLabel ?? sectionTitles[sectionTitles.length - 1]}
            </span>
          )}
          <RiArrowRightSLine className="w-4 h-4 sm:w-5 sm:h-5 top-[1px] sm:top-0 -right-[1px] relative" />
        </button>
      )}
    </div>
  );
}
