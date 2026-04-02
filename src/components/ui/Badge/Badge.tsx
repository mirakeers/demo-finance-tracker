import type { ComponentProps } from "react";
import { getBadgeColorClasses } from "../../../utils/getCategoryColor";
import type { ColorClass } from "../../../types";
type BadgeProps = ComponentProps<"span"> & {
  color?: ColorClass;
};

export const Badge = ({ color, className, ...props }: BadgeProps) => {
  return (
    <span
      className={`inline-flex px-3 py-1 rounded-sm whitespace-nowrap ${color ? getBadgeColorClasses(color) : "bg-white/10"} ${className}`}
      {...props}
    />
  );
};
