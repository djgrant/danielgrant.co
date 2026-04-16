export function Section(props: {
  title: string;
  children: React.ReactNode;
  className?: string;
  last?: true;
}) {
  return (
    <div
      role="region"
      aria-label={props.title}
      className={
        "min-h-0 " +
        (props.last
          ? "min-w-[calc(100vw+2rem)]  "
          : "min-w-[calc(100vw+1rem)] ") +
        "sm:min-w-[calc(100vw)] md:min-w-[440px] flex-1 flex flex-col h-full prose dark:prose-invert " +
        "md:border-r border-dashed dark:border-white/10 pl-8 " +
        props.className
      }
    >
      <div className="snap-start -ml-8"></div>
      <div className="pb-5 md:pb-3 font-medium text-2xl text-black dark:text-white/90 leading-5 md:border-b border-dashed dark:border-white/10">
        {props.title}
      </div>
      <div className="min-h-0 h-full overflow-y-scroll pb-8 pt-5 pr-8">
        {props.children}
      </div>
    </div>
  );
}
