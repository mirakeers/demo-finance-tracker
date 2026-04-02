import { Input } from "@headlessui/react";
import styles from "../../Form/FormLayout.module.css";
import { FilterClearButton } from "../FilterClearButton";

type TextFilterFieldProps = {
  value: string;
  placeholder?: string;
  slot?: React.ReactNode;
  onChange: (value: string) => void;
  onClear: () => void;
  onCommit?: (value: string) => void;
};

export const TextFilterField = ({
  value,
  placeholder,
  slot,
  onChange,
  onClear,
  onCommit,
}: TextFilterFieldProps) => {
  const isActive = value.trim() !== "";

  return (
    <div className={styles.baseInputGroup}>
      {slot}
      <Input
        className={styles.textInput}
        value={value}
        placeholder={placeholder}
        onChange={(event) => onChange(event.target.value)}
        onBlur={(event) => onCommit?.(event.target.value)}
      />
      {isActive && <FilterClearButton onClick={onClear} />}
    </div>
  );
};
