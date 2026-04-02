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

type ComboboxProps<T> = {
  value: T;
  onChange: (value: T) => void;
  options: readonly T[];
  displayValue?: (value: T) => string;
  renderOption?: (value: T) => React.ReactNode;
  filter?: (value: T, query: string) => boolean;
  placeholder?: string;
};

export const Combobox = <T extends string>({
  value,
  onChange,
  options,
  displayValue = (value) => value,
  renderOption,
  filter,
  placeholder,
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
      value={value}
      onChange={(val) => val && onChange(val)}
      onClose={() => setQuery("")}
    >
      <div className={styles.combobox}>
        <div className={styles.baseInputGroup}>
          <ComboboxInput
            className={styles.textInput}
            displayValue={displayValue}
            onChange={(event) => setQuery(event.target.value)}
            placeholder={placeholder}
          />

          <ComboboxButton>
            <ChevronDownIcon className={styles.icon} />
          </ComboboxButton>
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
