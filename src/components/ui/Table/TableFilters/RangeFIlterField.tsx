import type { ColumnFilter } from "../Table";
import { DateFilterField } from "./DateFilterField";
import { TextFilterField } from "./TextFilterField";
import { CheckBoxField } from "./CheckboxField";
import { useTranslation } from "react-i18next";

type RangeFilterFieldProps<TFilters extends Record<string, string>> = {
  id: keyof TFilters & string;
  filter: Extract<ColumnFilter, { type: "range" }>;
  filters: TFilters;
  onChange: <K extends keyof TFilters & string>(
    key: K,
    value: TFilters[K],
  ) => void;
  useCurrentDay?: boolean;
  onUseCurrentDayChange?: (checked: boolean) => void;
};

export const RangeFilterField = <TFilters extends Record<string, string>>({
  id,
  filter,
  filters,
  onChange,
  useCurrentDay = false,
  onUseCurrentDayChange,
}: RangeFilterFieldProps<TFilters>) => {
  const { t } = useTranslation();

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

    if (!isMinGreaterThanMax(filter.input, nextMinValue, nextMaxValue)) {
      return;
    }

    if (changedSide === "min") {
      setMax(nextMinValue);
      return;
    }

    setMin(nextMaxValue);
  };

  if (filter.input === "date") {
    return (
      <div className="flex items-center gap-2">
        <CheckBoxField
          checked={useCurrentDay}
          label={t(($) => $.transaction.date.useCurrentDay)}
          onChange={(checked) => onUseCurrentDayChange?.(checked)}
        />

        <DateFilterField
          value={minValue}
          placeholder={filter.minPlaceholder}
          slot={filter.slot}
          onChange={setMin}
          onClear={() => setMin("")}
          onCommit={(nextValue) => normalizeRange("min", nextValue)}
        />

        <span className="text-t-light">-</span>

        <DateFilterField
          value={maxValue}
          placeholder={filter.maxPlaceholder}
          slot={filter.slot}
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
        slot={filter.slot}
        onChange={setMin}
        onClear={() => setMin("")}
        onCommit={(nextValue) => normalizeRange("min", nextValue)}
      />

      <span className="text-t-light">-</span>

      <TextFilterField
        value={maxValue}
        placeholder={filter.maxPlaceholder}
        slot={filter.slot}
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
  if (!minValue || !maxValue) return false;

  if (inputType === "number") {
    const min = Number(minValue);
    const max = Number(maxValue);

    if (Number.isNaN(min) || Number.isNaN(max)) return false;
    return min > max;
  }

  return minValue > maxValue;
};
