import { Button as HeadlessButton } from "@headlessui/react";
import type { ComponentProps, ReactNode } from "react";

type ButtonVariant = "primary" | "outline" | "icon";

type ButtonProps = ComponentProps<"button"> & {
  children: ReactNode;
  variant?: ButtonVariant;
};

const baseClasses =
  "inline-flex items-center justify-center gap-2 rounded-md transition cursor-pointer focus:outline-none disabled:cursor-not-allowed";

const variantClasses: Record<ButtonVariant, string> = {
  primary: `px-3 h-8 min-h-10 bg-interaction hover:bg-interaction-hover text-black font-semibold`,
  outline: `px-3 h-8 min-h-10 border-1 border-interaction hover:border-interaction-hover text-interaction hover:text-interaction-hover font-semibold`,
  icon: "p-2 text-t-light hover:text-interaction hover:bg-white/10",
};

export const Button = ({
  children,
  className = "",
  variant = "primary",
  type = "button",
  ...props
}: ButtonProps) => {
  return (
    <HeadlessButton
      type={type}
      className={`${baseClasses} ${variantClasses[variant]} ${className}`}
      {...props}
    >
      {children}
    </HeadlessButton>
  );
};
