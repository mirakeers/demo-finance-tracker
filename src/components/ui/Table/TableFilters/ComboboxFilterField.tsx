import { Combobox } from "../../Form/Combobox/Combobox";

type ComboboxFilterFieldProps = {
  value: string;
  placeholder?: string;
  options: readonly string[];
  displayValue: (value: string) => string;
  renderOption?: (value: string) => React.ReactNode;
  onChange: (value: string) => void;
  onClear: () => void;
};

export const ComboboxFilterField = ({
  value,
  placeholder,
  options,
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
    />
  );
};
