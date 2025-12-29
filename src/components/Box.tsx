import { type HTMLProps } from "react";

type BoxProps = {
  value: string;
} & HTMLProps<HTMLDivElement>;

export default function Box({ value, ...props }: BoxProps) {
  return (
    <div
      {...props}
      className={`flex items-center justify-center bg-zinc-700 size-30 m-2 rounded-xl hover:bg-zinc-600 cursor-pointer text-5xl ${value === "X" ? "text-emerald-400" : "text-cyan-500"} text-shadow-md ${value === "X" ? "text-shadow-emerald-400" : "text-shadow-cyan-500"}`}
    >
      {value}
    </div>
  );
}
