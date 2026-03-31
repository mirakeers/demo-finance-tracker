import type { ComponentProps } from "react";
type BadgeProps = ComponentProps<"span">;

export const Badge = ({ className, ...props }: BadgeProps) => {
  return (
    <span
      className={`inline-flex px-3 py-1 rounded-sm ${className}`}
      {...props}
    />
  );
};
