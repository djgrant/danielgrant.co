"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { setScrollNav } from "../hooks/use-scroll-nav";

export function ScrollProgress(props: {
  children: React.ReactNode;
  className?: string;
  sectionCount: number;
  sectionTitles: string[];
}) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const navigate = useCallback((direction: "left" | "right") => {
    const el = scrollRef.current;
    if (!el) return;
    const sections = Array.from(el.querySelectorAll<HTMLElement>(":scope > *"));

    let targetIdx: number;

    if (direction === "left") {
      // Find the first section whose left edge is at or beyond scroll position;
      // then go one before it
      let anchorIdx = 0;
      for (let i = 0; i < sections.length; i++) {
        if (sections[i].offsetLeft - el.offsetLeft >= el.scrollLeft - 10) {
          anchorIdx = i;
          break;
        }
      }
      targetIdx = Math.max(0, anchorIdx - 1);
    } else {
      // Find the last section whose left edge the scroll has passed;
      // then go one after it
      let anchorIdx = 0;
      for (let i = sections.length - 1; i >= 0; i--) {
        if (el.scrollLeft >= sections[i].offsetLeft - el.offsetLeft - 10) {
          anchorIdx = i;
          break;
        }
      }
      targetIdx = Math.min(sections.length - 1, anchorIdx + 1);
    }

    sections[targetIdx]?.scrollIntoView({
      behavior: "smooth",
      block: "nearest",
      inline: "start",
    });
  }, []);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    function update() {
      const el = scrollRef.current;
      if (!el) return;
      const maxScroll = el.scrollWidth - el.clientWidth;
      if (maxScroll <= 0) return;
      const progress = el.scrollLeft / maxScroll;
      const idx = Math.round(progress * (props.sectionCount - 1));
      setActiveIndex(idx);

      const lastChild = el.lastElementChild as HTMLElement | null;
      const lastChildFullyVisible = lastChild
        ? lastChild.offsetLeft + lastChild.offsetWidth <=
          el.scrollLeft + el.clientWidth + 10
        : true;

      setScrollNav({
        canGoLeft: el.scrollLeft > 10,
        canGoRight: !lastChildFullyVisible,
        goLeft: () => navigate("left"),
        goRight: () => navigate("right"),
        activeIndex: idx,
        sectionTitles: props.sectionTitles,
      });
    }

    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "ArrowLeft" || e.key === "ArrowRight") {
        e.preventDefault();
        navigate(e.key === "ArrowLeft" ? "left" : "right");
      }
    }

    // Lock vertical scrolling on sections during horizontal swipe
    let scrollTimeout: ReturnType<typeof setTimeout>;
    const sections = el.querySelectorAll<HTMLElement>(":scope > *");

    function onHScroll() {
      sections.forEach((s) => {
        const inner = s.querySelector<HTMLElement>(".overflow-y-scroll");
        if (inner) inner.style.overflowY = "hidden";
      });
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        sections.forEach((s) => {
          const inner = s.querySelector<HTMLElement>(".overflow-y-scroll");
          if (inner) inner.style.overflowY = "";
        });
      }, 120);
    }

    update();
    el.addEventListener("scroll", update, { passive: true });
    el.addEventListener("scroll", onHScroll, { passive: true });
    document.addEventListener("keydown", onKeyDown);
    return () => {
      el.removeEventListener("scroll", update);
      el.removeEventListener("scroll", onHScroll);
      document.removeEventListener("keydown", onKeyDown);
      clearTimeout(scrollTimeout);
    };
  }, [props.sectionCount, navigate]);

  return (
    <div className={"relative " + props.className}>
      <div
        ref={scrollRef}
        className="flex min-h-0 h-full overflow-x-scroll snap-x snap-mandatory <md:hide-scrollbar focus:outline-none focus-visible:ring-2 relative"
        tabIndex={0}
      >
        {props.children}
      </div>
      <div className="md:hidden absolute top-[2.3rem] left-8 right-8 flex gap-2">
        {Array.from({ length: props.sectionCount }, (_, i) => (
          <div
            key={i}
            className={
              "h-[2.5px] flex-1 rounded-full transition-colors duration-200 " +
              (i <= activeIndex
                ? "bg-slate-800 dark:bg-white"
                : "bg-black/15 dark:bg-white/30")
            }
          />
        ))}
      </div>
    </div>
  );
}
