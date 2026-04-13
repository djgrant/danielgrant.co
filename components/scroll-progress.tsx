"use client";

import { useEffect, useRef, useState } from "react";

export function ScrollProgress(props: {
  children: React.ReactNode;
  className?: string;
  sectionCount: number;
}) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    function onScroll() {
      const el = scrollRef.current;
      if (!el) return;
      const maxScroll = el.scrollWidth - el.clientWidth;
      if (maxScroll <= 0) return;
      const progress = el.scrollLeft / maxScroll;
      setActiveIndex(Math.round(progress * (props.sectionCount - 1)));
    }

    el.addEventListener("scroll", onScroll, { passive: true });
    return () => el.removeEventListener("scroll", onScroll);
  }, [props.sectionCount]);

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
