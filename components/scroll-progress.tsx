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
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)");
    setIsMobile(mq.matches);
    const onChange = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

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

      if (isMobile) {
        const sections = Array.from(el.querySelectorAll<HTMLElement>(":scope > *"));
        sections.forEach((s) => {
          const heading = s.querySelector<HTMLElement>(":scope > div:nth-child(2)");
          if (!heading) return;
          const offset = Math.abs(s.offsetLeft - el.offsetLeft - el.scrollLeft);
          const opacity = Math.max(0, 1 - offset / (s.offsetWidth * 0.5));
          heading.style.opacity = String(opacity);
        });
      }

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

    // Lock vertical scrolling on sections during horizontal swipe (touch only)
    let scrollTimeout: ReturnType<typeof setTimeout>;
    let isTouching = false;
    const sections = el.querySelectorAll<HTMLElement>(":scope > *");

    function onTouchStart() {
      isTouching = true;
    }
    function onTouchEnd() {
      isTouching = false;
    }

    function onHScroll() {
      if (!isTouching) return;
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
    el.addEventListener("touchstart", onTouchStart, { passive: true });
    el.addEventListener("touchend", onTouchEnd, { passive: true });
    document.addEventListener("keydown", onKeyDown);
    return () => {
      el.removeEventListener("scroll", update);
      el.removeEventListener("scroll", onHScroll);
      el.removeEventListener("touchstart", onTouchStart);
      el.removeEventListener("touchend", onTouchEnd);
      document.removeEventListener("keydown", onKeyDown);
      clearTimeout(scrollTimeout);
      el.querySelectorAll<HTMLElement>(":scope > * > div:nth-child(2)").forEach(
        (h) => h.style.removeProperty("opacity")
      );
    };
  }, [props.sectionCount, navigate, isMobile]);

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
                ? "bg-slate-800 dark:bg-white/90"
                : "bg-black/15 dark:bg-white/30")
            }
          />
        ))}
      </div>
    </div>
  );
}
