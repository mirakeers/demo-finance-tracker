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
  onBlur?: () => void;
  onCommit?: (value: string) => void;
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

const getDisplayMonth = (value: string) => parseDate(value) ?? new Date();

export const DateInput = ({
  value,
  onChange,
  onBlur,
  onCommit,
  name,
  placeholder = DATE_FORMAT,
  disabled = false,
  required = false,
  className = "",
  clearable = false,
  onClear,
}: DateInputProps) => {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [draftValue, setDraftValue] = useState(value);
  const [month, setMonth] = useState(getDisplayMonth(value));

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) {
        setIsOpen(false);
        setIsEditing(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const inputValue = isEditing ? draftValue : value;
  const selectedDate = useMemo(() => parseDate(inputValue), [inputValue]);

  const commitValue = (nextValue: string) => {
    setDraftValue(nextValue);
    onChange(nextValue);
    onCommit?.(nextValue);
  };

  const handleFocus = () => {
    setDraftValue(value);
    setMonth(getDisplayMonth(value));
    setIsEditing(true);
    setIsOpen(true);
  };

  const handleInputChange = (nextValue: string) => {
    setDraftValue(nextValue);

    const parsed = parseDate(nextValue);
    if (parsed) {
      setMonth(parsed);
    }
  };

  const handleInputBlur = () => {
    const trimmedValue = draftValue.trim();

    if (trimmedValue === "") {
      commitValue("");
      setIsEditing(false);
      onBlur?.();
      return;
    }

    const parsed = parseDate(trimmedValue);

    if (parsed) {
      const formatted = format(parsed, DATE_FORMAT);
      setMonth(parsed);
      commitValue(formatted);
    } else {
      setDraftValue(value);
      setMonth(getDisplayMonth(value));
    }

    setIsEditing(false);
    onBlur?.();
  };

  const handleDaySelect = (date?: Date) => {
    if (!date) return;

    const formatted = format(date, DATE_FORMAT);
    setMonth(date);
    commitValue(formatted);
    setIsEditing(false);
    setIsOpen(false);
    onBlur?.();
  };

  const handleClear = () => {
    setDraftValue("");
    setMonth(new Date());
    setIsEditing(false);
    setIsOpen(false);
    onChange("");
    onClear?.();
    onCommit?.("");
    onBlur?.();
  };

  return (
    <div ref={rootRef} className={`${styles.baseInputGroup} ${className}`}>
      <Input
        type="text"
        className={styles.textInput}
        name={name}
        value={inputValue}
        disabled={disabled}
        required={required}
        placeholder={placeholder}
        onFocus={handleFocus}
        onChange={(event) => handleInputChange(event.target.value)}
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
            month={month}
            onMonthChange={setMonth}
            onSelect={handleDaySelect}
          />
        </div>
      )}

      {clearable && inputValue && (
        <FilterClearButton
          onClick={handleClear}
          className={styles.inputAction}
        />
      )}
    </div>
  );
};
