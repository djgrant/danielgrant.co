import { classy, switchCase } from "@djgrant/classy";

export const Callout = classy.div(
  (props: { type: "info" | "alert" | "success" }) => [
    "flex items-center",
    "p-2.5",
    "border",
    "rounded-lg",
    "bg-opacity-10 dark:bg-gray-800/100",
    "before:mr-3 before:text-2xl",
    "text-sm",
    switchCase(props.type, {
      success: "before:content-['☑'] border-green bg-green text-green-dark",
      alert: "before:content-['⚠️'] border-red text-red",
      info: "before:content-['ⓘ'] before:text-xl border-blue text-blue-dark",
    }),
  ]
);
