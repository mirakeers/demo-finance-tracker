import { isValid, parse } from "date-fns";
import { DATE_FORMAT } from "../../../../constants/date";
import type { ColumnFilter } from "../Table";
import { DateFilterField } from "./DateFilterField";
import { TextFilterField } from "./TextFilterField";

type RangeFilterFieldProps<TFilters extends Record<string, string>> = {
  id: keyof TFilters & string;
  filter: Extract<ColumnFilter, { type: "range" }>;
  filters: TFilters;
  onChange: <K extends keyof TFilters & string>(
    key: K,
    value: TFilters[K],
  ) => void;
};

export const RangeFilterField = <TFilters extends Record<string, string>>({
  id,
  filter,
  filters,
  onChange,
}: RangeFilterFieldProps<TFilters>) => {
  const minKey = `${id}Min` as keyof TFilters & string;
  const maxKey = `${id}Max` as keyof TFilters & string;

  const minValue = filters[minKey] ?? "";
  const maxValue = filters[maxKey] ?? "";

  const setMin = (value: string) =>
    onChange(minKey, value as TFilters[typeof minKey]);

  const setMax = (value: string) =>
    onChange(maxKey, value as TFilters[typeof maxKey]);

  const normalizeRange = (changedSide: "min" | "max", nextValue: string) => {
    const nextMinValue = changedSide === "min" ? nextValue : minValue;
    const nextMaxValue = changedSide === "max" ? nextValue : maxValue;

    if (!nextMinValue || !nextMaxValue) return;
    if (!isMinGreaterThanMax(filter.input, nextMinValue, nextMaxValue)) return;

    if (changedSide === "min") {
      setMax(nextMinValue);
      return;
    }

    setMin(nextMaxValue);
  };

  if (filter.input === "date") {
    return (
      <div className="flex items-center gap-2">
        <DateFilterField
          value={minValue}
          placeholder={filter.minPlaceholder}
          onChange={setMin}
          onClear={() => setMin("")}
          onCommit={(nextValue) => normalizeRange("min", nextValue)}
        />
        <span className="text-t-light">-</span>
        <DateFilterField
          value={maxValue}
          placeholder={filter.maxPlaceholder}
          onChange={setMax}
          onClear={() => setMax("")}
          onCommit={(nextValue) => normalizeRange("max", nextValue)}
        />
      </div>
    );
  }

  return (
    <div className="flex items-center gap-2">
      <TextFilterField
        value={minValue}
        placeholder={filter.minPlaceholder}
        onChange={setMin}
        onClear={() => setMin("")}
        onCommit={(nextValue) => normalizeRange("min", nextValue)}
      />
      <span className="text-t-light">-</span>
      <TextFilterField
        value={maxValue}
        placeholder={filter.maxPlaceholder}
        onChange={setMax}
        onClear={() => setMax("")}
        onCommit={(nextValue) => normalizeRange("max", nextValue)}
      />
    </div>
  );
};

const isMinGreaterThanMax = (
  inputType: "date" | "number",
  minValue: string,
  maxValue: string,
) => {
  if (inputType === "number") {
    const min = Number(minValue);
    const max = Number(maxValue);

    if (Number.isNaN(min) || Number.isNaN(max)) return false;
    return min > max;
  }

  const min = parse(minValue, DATE_FORMAT, new Date());
  const max = parse(maxValue, DATE_FORMAT, new Date());

  if (!isValid(min) || !isValid(max)) return false;
  return min > max;
};
