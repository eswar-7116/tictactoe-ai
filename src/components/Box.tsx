import { type HTMLProps } from "react";

type BoxProps = {
  value: string;
} & HTMLProps<HTMLDivElement>;

export default function Box({ value, ...props }: BoxProps) {
  const color = value === "X" ? "emerald-400" : "cyan-500";

  return (
    <div
      {...props}
      className={`flex items-center justify-center bg-zinc-700 size-30 m-2 rounded-xl hover:bg-zinc-600 cursor-pointer text-5xl font-bold text-${color} text-shadow-lg text-shadow-${color}`}
    >
      {value}
    </div>
  );
}
