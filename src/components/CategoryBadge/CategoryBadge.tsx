import type { Category } from "../../data/categories";
import { getCategoryColor } from "../../utils/getCategoryColor";
import { Badge } from "../ui/Badge/Badge";
import { useTranslation } from "react-i18next";

type CategoryBadgeProps = {
  category: Category;
};
export const CategoryBadge = ({ category }: CategoryBadgeProps) => {
  const { t } = useTranslation();
  return (
    <Badge color={getCategoryColor(category)}>
      {t(($) => $.category[category])}
    </Badge>
  );
};
