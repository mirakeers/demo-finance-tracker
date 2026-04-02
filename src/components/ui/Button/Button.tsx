import { Button as HeadlessButton } from "@headlessui/react";
import type { ComponentProps, ReactNode } from "react";

type ButtonVariant = "primary" | "secondary" | "ghost";

type ButtonProps = {
  children: ReactNode;
  variant?: ButtonVariant;
  className?: string;
} & Omit<ComponentProps<typeof HeadlessButton>, "className">;

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    "bg-interaction text-white enabled:hover:bg-interaction-hover disabled:opacity-40",
  secondary:
    "bg-slate-800 text-slate-200 enabled:hover:bg-slate-700  disabled:opacity-40",
  ghost:
    "bg-transparent text-slate-300 enabled:hover:bg-slate-800 disabled:opacity-40",
};

export const Button = ({
  children,
  variant = "secondary",
  className = "",
  ...props
}: ButtonProps) => (
  <HeadlessButton
    className={`inline-flex items-center justify-center rounded-lg px-3 py-2 text-sm font-medium transition disabled:cursor-not-allowed ${variantClasses[variant]} ${className}`}
    {...props}
  >
    {children}
  </HeadlessButton>
);
