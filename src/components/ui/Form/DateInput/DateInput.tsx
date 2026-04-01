import { Input } from "@headlessui/react";
import { format, isValid, parse } from "date-fns";
import { useEffect, useMemo, useRef, useState } from "react";
import { DayPicker } from "react-day-picker";
import "react-day-picker/style.css";
import styles from "./../FormLayout.module.css";

type DateInputProps = {
  value: string;
  onChange: (value: string) => void;
  name?: string;
  placeholder?: string;
  disabled?: boolean;
  required?: boolean;
  className?: string;
};

const DATE_FORMAT = "dd/MM/yyyy";

const parseDate = (value: string) => {
  const parsed = parse(value, DATE_FORMAT, new Date());
  return isValid(parsed) ? parsed : undefined;
};

export const DateInput = ({
  value,
  onChange,
  name,
  placeholder = DATE_FORMAT,
  disabled = false,
  required = false,
}: DateInputProps) => {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState(value);

  useEffect(() => {
    setInputValue(value);
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

  const selectedDate = useMemo(() => parseDate(inputValue), [inputValue]);

  const handleInputBlur = () => {
    const parsed = parseDate(inputValue);

    if (parsed) {
      const formatted = format(parsed, DATE_FORMAT);
      setInputValue(formatted);
      onChange(formatted);
      return;
    }

    if (inputValue.trim() === "") {
      onChange("");
    }
  };

  const handleDaySelect = (date?: Date) => {
    if (!date) return;

    const formatted = format(date, DATE_FORMAT);
    setInputValue(formatted);
    onChange(formatted);
    setIsOpen(false);
  };
  return (
    <div ref={rootRef} className={styles.baseInputGroup}>
      <Input
        type="text"
        className={styles.textInput}
        name={name}
        value={inputValue}
        disabled={disabled}
        required={required}
        placeholder={placeholder}
        onFocus={() => setIsOpen(true)}
        onChange={(event) => setInputValue(event.target.value)}
        onBlur={handleInputBlur}
      />

      {isOpen && !disabled && (
        <div className={styles.daypicker}>
          <DayPicker
            mode="single"
            selected={selectedDate}
            onSelect={handleDaySelect}
          />
        </div>
      )}
    </div>
  );
};
