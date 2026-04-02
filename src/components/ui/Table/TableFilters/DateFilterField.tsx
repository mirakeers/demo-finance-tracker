import { DateInput } from "../../Form/DateInput/DateInput";
import { DATE_FORMAT } from "../../../../constants/date";

type DateFilterFieldProps = {
  value: string;
  placeholder?: string;
  onChange: (value: string) => void;
  onClear: () => void;
  onCommit?: (value: string) => void;
};

export const DateFilterField = ({
  value,
  placeholder = DATE_FORMAT,
  onChange,
  onClear,
  onCommit,
}: DateFilterFieldProps) => {
  const isActive = value.trim() !== "";

  return (
    <DateInput
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      clearable={isActive}
      onClear={onClear}
      onCommit={onCommit}
    />
  );
};
