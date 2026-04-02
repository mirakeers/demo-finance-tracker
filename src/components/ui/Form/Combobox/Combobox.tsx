import {
  Combobox as HeadlessCombobox,
  ComboboxButton,
  ComboboxInput,
  ComboboxOption,
  ComboboxOptions,
} from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import { useMemo, useState } from "react";
import styles from "../FormLayout.module.css";
import { FilterClearButton } from "../../Table/FilterClearButton";

type ComboboxProps<T> = {
  value: T | "";
  onChange: (value: T) => void;
  options: readonly T[];
  displayValue?: (value: T) => string;
  renderOption?: (value: T) => React.ReactNode;
  filter?: (value: T, query: string) => boolean;
  placeholder?: string;
  clearable?: boolean;
  onClear?: () => void;
};

export const Combobox = <T extends string>({
  value,
  onChange,
  options,
  displayValue = (value) => value,
  renderOption,
  filter,
  placeholder,
  clearable,
  onClear,
}: ComboboxProps<T>) => {
  const [query, setQuery] = useState("");

  const filteredOptions = useMemo(() => {
    if (!query) return options;

    if (filter) {
      return options.filter((item) => filter(item, query));
    }

    return options.filter((item) =>
      displayValue(item).toLowerCase().includes(query.toLowerCase()),
    );
  }, [query, options, filter, displayValue]);

  return (
    <HeadlessCombobox
      value={value || null}
      onChange={(val) => val && onChange(val)}
      onClose={() => setQuery("")}
    >
      <div className={styles.combobox}>
        <div className={styles.baseInputGroup}>
          <ComboboxInput
            className={styles.textInput}
            displayValue={(selected: T | null) =>
              selected ? displayValue(selected) : ""
            }
            onChange={(event) => setQuery(event.target.value)}
            placeholder={placeholder}
          />

          <ComboboxButton>
            <ChevronDownIcon className={styles.icon} />
          </ComboboxButton>
          {clearable && value && onClear && (
            <FilterClearButton
              onClick={onClear}
              className={styles.inputAction}
            />
          )}
        </div>

        <ComboboxOptions className={styles.optionGroup}>
          {filteredOptions.map((item, i) => (
            <ComboboxOption
              key={`option-${i}`}
              value={item}
              className={styles.listboxOption}
            >
              <span className="grow inline-flex">
                {renderOption ? renderOption(item) : displayValue(item)}
              </span>
            </ComboboxOption>
          ))}
        </ComboboxOptions>
      </div>
    </HeadlessCombobox>
  );
};
