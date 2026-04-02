import { XMarkIcon } from "@heroicons/react/24/outline";
import { Button } from "../Button/Button";
import { useTranslation } from "react-i18next";

type FilterClearButtonProps = {
  onClick: () => void;
  className?: string;
};

export const FilterClearButton = ({
  onClick,
  className = "",
}: FilterClearButtonProps) => {
  const { t } = useTranslation();
  return (
    <Button
      type="button"
      variant="ghost"
      aria-label={t(($) => $.general.clearSelection)}
      onClick={onClick}
      className={className}
    >
      <XMarkIcon className="size-4" />
    </Button>
  );
};
