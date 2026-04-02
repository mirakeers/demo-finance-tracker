import { Input } from "@headlessui/react";
import { isValid, parse, parseISO } from "date-fns";
import { useEffect, useMemo, useRef, useState } from "react";
import { DayPicker } from "react-day-picker";
import "react-day-picker/style.css";
import styles from "./../FormLayout.module.css";
import { FilterClearButton } from "../../Table/FilterClearButton";
import { DISPLAY_DATE_FORMAT, formatDate } from "../../../../utils/formatDate";

type DateInputProps = {
  value: string;
  name?: string;
  placeholder?: string;
  disabled?: boolean;
  required?: boolean;
  className?: string;
  clearable?: boolean;
  slot?: React.ReactNode;
  onClear?: () => void;
  onChange: (value: string) => void;
  onBlur?: () => void;
  onCommit?: (value: string) => void;
};

const getDisplayValue = (value: string) =>
  value ? formatDate(parseISO(value)) : "";

const getSelectedDate = (value: string) => {
  if (!value) return undefined;

  const parsed = parse(value, DISPLAY_DATE_FORMAT, new Date());
  return isValid(parsed) ? parsed : undefined;
};

const toMachineValue = (value: string) => {
  const parsed = parse(value, DISPLAY_DATE_FORMAT, new Date());
  return isValid(parsed) ? formatDate(parsed, { machine: true }) : "";
};

export const DateInput = ({
  value,
  name,
  placeholder = DISPLAY_DATE_FORMAT,
  disabled = false,
  required = false,
  className = "",
  clearable = false,
  slot,
  onClear,
  onChange,
  onBlur,
  onCommit,
}: DateInputProps) => {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [draftValue, setDraftValue] = useState(getDisplayValue(value));
  const [month, setMonth] = useState(value ? parseISO(value) : new Date());

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

  const inputValue = isEditing ? draftValue : getDisplayValue(value);
  const selectedDate = useMemo(() => getSelectedDate(inputValue), [inputValue]);

  const commitValue = (nextValue: string) => {
    setDraftValue(getDisplayValue(nextValue));
    onChange(nextValue);
    onCommit?.(nextValue);
  };

  const openPicker = () => {
    setDraftValue(getDisplayValue(value));
    setMonth(value ? parseISO(value) : new Date());
    setIsEditing(true);
    setIsOpen(true);
  };

  const handleInputChange = (nextValue: string) => {
    setDraftValue(nextValue);

    const parsed = getSelectedDate(nextValue);
    if (parsed) {
      setMonth(parsed);
    }
  };

  const handleInputBlur = () => {
    const trimmedValue = draftValue.trim();

    if (!trimmedValue) {
      commitValue("");
      setIsEditing(false);
      onBlur?.();
      return;
    }

    const nextValue = toMachineValue(trimmedValue);

    if (nextValue) {
      setMonth(parseISO(nextValue));
      commitValue(nextValue);
    } else {
      setDraftValue(getDisplayValue(value));
      setMonth(value ? parseISO(value) : new Date());
    }

    setIsEditing(false);
    onBlur?.();
  };

  const handleDaySelect = (date?: Date) => {
    if (!date) return;

    const nextValue = formatDate(date, { machine: true });
    setMonth(date);
    commitValue(nextValue);
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
      {slot}

      <Input
        type="text"
        className={styles.textInput}
        name={name}
        value={inputValue}
        disabled={disabled}
        required={required}
        placeholder={placeholder}
        onFocus={openPicker}
        onClick={openPicker}
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
