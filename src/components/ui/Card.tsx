import type { ComponentProps } from "react";
type CardProps = ComponentProps<"div">;

export const Card = ({ className, ...props }: CardProps) => {
  return <div className={`bg-b-card p-6 ${className}`} {...props} />;
};
