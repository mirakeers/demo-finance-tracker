import { Input } from "@headlessui/react";
import { format, isValid, parse } from "date-fns";
import { useEffect, useMemo, useRef, useState } from "react";
import { DayPicker } from "react-day-picker";
import "react-day-picker/style.css";
import styles from "./../FormLayout.module.css";
import { FilterClearButton } from "../../Table/FilterClearButton";
import { DATE_FORMAT } from "../../../../constants/date";

type DateInputProps = {
  value: string;
  onChange: (value: string) => void;
  onBlur?: (value: string) => void;
  name?: string;
  placeholder?: string;
  disabled?: boolean;
  required?: boolean;
  className?: string;
  clearable?: boolean;
  onClear?: () => void;
};

const parseDate = (value: string) => {
  const parsed = parse(value, DATE_FORMAT, new Date());
  return isValid(parsed) ? parsed : undefined;
};

export const DateInput = ({
  value,
  onChange,
  onBlur,
  name,
  placeholder = DATE_FORMAT,
  disabled = false,
  required = false,
  clearable = false,
  onClear,
}: DateInputProps) => {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [draftValue, setDraftValue] = useState(value);

  useEffect(() => {
    setDraftValue(value);
  }, [value]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const selectedDate = useMemo(() => parseDate(draftValue), [draftValue]);

  const commitValue = (nextValue: string) => {
    setDraftValue(nextValue);
    onChange(nextValue);
    onBlur?.(nextValue);
  };

  const handleInputBlur = () => {
    const trimmedValue = draftValue.trim();

    if (trimmedValue === "") {
      commitValue("");
      return;
    }

    const parsed = parseDate(trimmedValue);

    if (parsed) {
      commitValue(format(parsed, DATE_FORMAT));
      return;
    }

    setDraftValue(value);
    onBlur?.(value);
  };

  const handleDaySelect = (date?: Date) => {
    if (!date) return;

    commitValue(format(date, DATE_FORMAT));
    setIsOpen(false);
  };

  const handleClear = () => {
    setDraftValue("");
    onClear?.();
    onBlur?.("");
    setIsOpen(false);
  };

  return (
    <div ref={rootRef} className={styles.baseInputGroup}>
      <Input
        type="text"
        className={styles.textInput}
        name={name}
        value={draftValue}
        disabled={disabled}
        required={required}
        placeholder={placeholder}
        onFocus={() => setIsOpen(true)}
        onChange={(event) => setDraftValue(event.target.value)}
        onBlur={handleInputBlur}
      />

      {isOpen && !disabled && (
        <div
          className={styles.daypicker}
          onMouseDown={(event) => event.preventDefault()}
        >
          <DayPicker
            mode="single"
            selected={selectedDate}
            onSelect={handleDaySelect}
          />
        </div>
      )}

      {clearable && draftValue && (
        <FilterClearButton
          onClick={handleClear}
          className={styles.inputAction}
        />
      )}
    </div>
  );
};
