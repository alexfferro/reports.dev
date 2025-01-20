import { ComponentProps, forwardRef, type ForwardedRef } from "react";

// Definindo as props para o FloatingButton
interface FloatingButtonProps extends ComponentProps<"button"> {
  title: string;
  subtitle: string;
  src: string;
  onAction?: () => void;
}

// Adicionando o forwardRef para passar a ref para o botão
export const FloatingButton = forwardRef(
  (
    { title, subtitle, src, onAction, ...props }: FloatingButtonProps,
    ref: ForwardedRef<HTMLButtonElement>
  ) => {
    return (
      <button
        ref={ref} // Passando a ref para o botão
        className="flex items-center gap-2 p-1 rounded min-w-60 hover:bg-slate-700"
        onClick={onAction}
        {...props}
      >
        <img
          src={src}
          alt="Text"
          className="w-12 border border-slate-700 rounded bg-white"
        />
        <div className="flex flex-col text-left">
          <span className="text-sm">{title}</span>
          <span className="text-xs text-slate-400">{subtitle}</span>
        </div>
      </button>
    );
  }
);

FloatingButton.displayName = "FloatingButton"; // Nome para depuração (opcional)
