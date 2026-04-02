import { Button as HeadlessButton } from "@headlessui/react";
import type { ComponentProps, ReactNode } from "react";

type ButtonVariant = "primary" | "outline" | "ghost";

type ButtonProps = {
  children: ReactNode;
  variant?: ButtonVariant;
  className?: string;
} & Omit<ComponentProps<typeof HeadlessButton>, "className">;

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    "px-3 py-2 bg-interaction text-black enabled:hover:bg-interaction-hover disabled:opacity-40",
  outline:
    "px-3 py-2 bg-slate-800 text-slate-200 enabled:hover:bg-slate-700  disabled:opacity-40",
  ghost:
    "p-2 -m-2 bg-transparent text-slate-300 enabled:hover:bg-slate-800 disabled:opacity-40",
};

export const Button = ({
  children,
  variant = "primary",
  className = "",
  ...props
}: ButtonProps) => (
  <HeadlessButton
    className={`inline-flex items-center justify-center rounded-lg text-sm font-semibold transition cursor-pointer disabled:cursor-not-allowed ${variantClasses[variant]} ${className}`}
    {...props}
  >
    {children}
  </HeadlessButton>
);
