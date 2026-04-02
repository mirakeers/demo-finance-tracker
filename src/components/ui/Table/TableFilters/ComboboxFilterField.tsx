import { Combobox } from "../../Form/Combobox/Combobox";

type ComboboxFilterFieldProps = {
  value: string;
  placeholder?: string;
  options: readonly string[];
  slot?: React.ReactNode;
  displayValue: (value: string) => string;
  renderOption?: (value: string) => React.ReactNode;
  onChange: (value: string) => void;
  onClear: () => void;
};

export const ComboboxFilterField = ({
  value,
  placeholder,
  options,
  slot,
  displayValue,
  renderOption,
  onChange,
  onClear,
}: ComboboxFilterFieldProps) => {
  const isActive = value.trim() !== "";

  return (
    <Combobox
      value={value}
      onChange={onChange}
      options={options}
      displayValue={displayValue}
      renderOption={renderOption}
      placeholder={placeholder}
      clearable={isActive}
      onClear={onClear}
      slot={slot}
    />
  );
};
