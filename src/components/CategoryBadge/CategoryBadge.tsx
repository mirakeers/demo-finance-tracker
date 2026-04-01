import { t } from "i18next";
import type { Category } from "../../data/categories";
import { getCategoryColor } from "../../utils/getCategoryColor";
import { Badge } from "../ui/Badge/Badge";

type CategoryBadgeProps = {
  category: Category;
};
export const CategoryBadge = ({ category }: CategoryBadgeProps) => {
  return (
    <Badge color={getCategoryColor(category)}>
      {t(($) => $.category[category])}
    </Badge>
  );
};
