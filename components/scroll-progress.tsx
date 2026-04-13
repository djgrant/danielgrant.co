"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { setScrollNav } from "../hooks/use-scroll-nav";

export function ScrollProgress(props: {
  children: React.ReactNode;
  className?: string;
  sectionCount: number;
}) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const navigate = useCallback((direction: "left" | "right") => {
    const el = scrollRef.current;
    if (!el) return;
    const sections = Array.from(
      el.querySelectorAll<HTMLElement>(":scope > *")
    );
    let currentIdx = 0;
    for (let i = sections.length - 1; i >= 0; i--) {
      if (el.scrollLeft >= sections[i].offsetLeft - el.offsetLeft - 10) {
        currentIdx = i;
        break;
      }
    }
    const nextIdx =
      direction === "left"
        ? Math.max(0, currentIdx - 1)
        : Math.min(sections.length - 1, currentIdx + 1);
    sections[nextIdx]?.scrollIntoView({
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
      setActiveIndex(Math.round(progress * (props.sectionCount - 1)));

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
        className="flex min-h-0 h-full overflow-x-scroll snap-x snap-mandatory hide-scrollbar focus:outline-none focus-visible:ring-2"
        tabIndex={0}
      >
        {props.children}
      </div>
      <div className="md:hidden absolute top-[2.3rem] left-8 right-8 flex gap-1">
        {Array.from({ length: props.sectionCount }, (_, i) => (
          <div
            key={i}
            className={
              "h-[1.5px] flex-1 transition-colors duration-200 " +
              (i <= activeIndex
                ? "bg-slate-800 dark:bg-white"
                : "bg-black/10 dark:bg-white/30")
            }
          />
        ))}
      </div>
    </div>
  );
}
