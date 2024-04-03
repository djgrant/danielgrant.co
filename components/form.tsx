import { classy, switchCase } from "@djgrant/classy";

type ButtonProps = { variant?: "outline"; size?: "sm" };

const getButtonClasses = (props: ButtonProps) => [
  "rounded-lg",
  "font-semibold",
  "disabled:opacity-75",
  "border-2",
  "!p-3",
  switchCase(props.variant, {
    default:
      "bg-gray-900 text-white border-gray-900 dark:bg-white dark:text-black dark:border-white",
    outline:
      "bg-white text-gray-900 border-gray-700 sm:border-gray-300 dark:bg-[rgba(17,17,17,0.8)] dark:text-white dark:border-gray-300 sm:dark:border-gray-700",
  }),
  switchCase(props.size, {
    default: "sm:text-lg px-4 sm:px-8 py-3.5",
    sm: "px-3 sm:px-6 py-3.5 text-base",
  }),
];

export const Button = classy.button(getButtonClasses);
export const ButtonLink = classy.a(getButtonClasses);

export const Input = classy.input(
  "absolute inset-0",
  "block w-full",
  "!p-0 m-0", // reset pico styles
  "!pt-[1.2rem] !pb-0 !px-2.5",
  "!shadow-none",
  "bg-white dark:bg-gray-800",
  "border-gray-200 dark:border-gray-700 dark:focus:ring-gray-500",
  "font-mono font-semibold",
  "text-sm",
  "rounded-lg"
);

export const LabelWrapper = classy.label(
  "relative",
  "h-14",
  "px-2.5",
  "rounded-lg",
  "border border-gray-300 dark:border-none"
);

const LabelText = classy.span("absolute top-1 z-10", "text-[0.8em] text-blue");

export function Label(props: {
  children: [string, React.ReactElement];
  className: string;
}) {
  const [label, input] = props.children;
  return (
    <LabelWrapper className={props.className}>
      <LabelText>{label}</LabelText>
      {input}
    </LabelWrapper>
  );
}
