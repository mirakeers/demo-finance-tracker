import { DateInput } from "../../Form/DateInput/DateInput";

type DateFilterFieldProps = {
  value: string;
  placeholder?: string;
  slot?: React.ReactNode;
  onChange: (value: string) => void;
  onClear: () => void;
  onCommit?: (value: string) => void;
};

export const DateFilterField = ({
  value,
  placeholder,
  slot,
  onChange,
  onClear,
  onCommit,
}: DateFilterFieldProps) => {
  const isActive = value.trim() !== "";

  return (
    <DateInput
      value={value}
      onChange={onChange}
      onCommit={onCommit}
      placeholder={placeholder}
      slot={slot}
      clearable={isActive}
      onClear={onClear}
    />
  );
};
