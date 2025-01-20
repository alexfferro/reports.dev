import type { ComponentProps, ReactNode } from "react";

interface BubbleButtonProps extends ComponentProps<"button"> {
  children: ReactNode;
}

export function BubbleButton(props: BubbleButtonProps) {
  return (
    <button
      className="p-2 text-zinc-300 text-sm flex items-center gap-1.5 font-medium leading-none hover:text-zinc-50 hover:bg-slate-700 data-[active=true]:text-amber-600 data-[active=true]:bg-slate-700"
      {...props}
    />
  );
}
