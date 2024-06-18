import { classy, switchCase } from "@djgrant/classy";

export const Pill = classy.div((props: { type: "red" | "green" }) => [
  "inline-block",
  "px-1.5 py-1",
  "rounded",
  "text-xs font-sans uppercase",
  "text-white",
  switchCase(props.type, {
    red: "bg-red-300 dark:bg-red-400",
    green: "bg-green-300 dark:bg-green-400",
  }),
]);
