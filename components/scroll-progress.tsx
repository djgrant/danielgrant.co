"use client";

import { useEffect, useRef, useState } from "react";

export function ScrollProgress({
  children,
  sectionCount,
}: {
  children: React.ReactNode;
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
      setActiveIndex(Math.round(progress * (sectionCount - 1)));
    }

    el.addEventListener("scroll", onScroll, { passive: true });
    return () => el.removeEventListener("scroll", onScroll);
  }, [sectionCount]);

  return (
    <div className="flex-1 min-h-0 relative">
      <div
        ref={scrollRef}
        className="flex min-h-0 h-full -ml-8 overflow-x-scroll snap-x snap-mandatory focus:outline-none focus-visible:ring-2"
        tabIndex={0}
      >
        {children}
      </div>
      <div className="md:hidden absolute top-[2.3rem] left-0 right-0 flex gap-1">
        {Array.from({ length: sectionCount }, (_, i) => (
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
