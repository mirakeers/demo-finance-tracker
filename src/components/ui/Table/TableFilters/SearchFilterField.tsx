import { Input } from "@headlessui/react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import styles from "../../Form/FormLayout.module.css";
import { FilterClearButton } from "../FilterClearButton";

type SearchFilterFieldProps = {
  value: string;
  placeholder?: string;
  onChange: (value: string) => void;
  onClear: () => void;
};

export const SearchFilterField = ({
  value,
  placeholder,
  onChange,
  onClear,
}: SearchFilterFieldProps) => {
  const isActive = value.trim() !== "";

  return (
    <div className={styles.baseInputGroup}>
      <MagnifyingGlassIcon className={styles.icon} />
      <Input
        className={styles.textInput}
        value={value}
        placeholder={placeholder}
        onChange={(event) => onChange(event.target.value)}
      />
      {isActive && <FilterClearButton onClick={onClear} />}
    </div>
  );
};
