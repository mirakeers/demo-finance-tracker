import { Input } from "@headlessui/react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { isValid, parse } from "date-fns";
import { DATE_FORMAT } from "../../../constants/date";
import { Combobox } from "../Form/Combobox/Combobox";
import { DateInput } from "../Form/DateInput/DateInput";
import styles from "../Form/FormLayout.module.css";
import type { ColumnFilter } from "./Table";
import { FilterClearButton } from "./FilterClearButton";

type TableFiltersProps<Row, TFilters extends Record<string, string>> = {
  columns: {
    id: keyof Row & string;
    header: React.ReactNode;
    filter?: ColumnFilter;
  }[];
  filters: TFilters;
  onChange: <K extends keyof TFilters & string>(
    key: K,
    value: TFilters[K],
  ) => void;
};

type FilterFieldProps<TFilters extends Record<string, string>> = {
  id: keyof TFilters & string;
  filter: ColumnFilter;
  filters: TFilters;
  onChange: <K extends keyof TFilters & string>(
    key: K,
    value: TFilters[K],
  ) => void;
};

type SingleInputProps = {
  filter: Exclude<ColumnFilter, { type: "range" }>;
  value: string;
  onChange: (value: string) => void;
  onClear: () => void;
};

type RangeInputProps = {
  filter: Extract<ColumnFilter, { type: "range" }>;
  value: string;
  placeholder?: string;
  onChange: (value: string) => void;
  onClear: () => void;
  onCommit: (value: string) => void;
};

export const TableFilters = <Row, TFilters extends Record<string, string>>({
  columns,
  filters,
  onChange,
}: TableFiltersProps<Row, TFilters>) => {
  const filterColumns = columns.filter(
    (
      column,
    ): column is {
      id: keyof Row & string;
      header: React.ReactNode;
      filter: ColumnFilter;
    } => Boolean(column.filter),
  );

  return (
    <form className="flex flex-wrap items-end gap-4">
      {filterColumns.map((column) => (
        <FilterField
          key={column.id}
          id={column.id as keyof TFilters & string}
          filter={column.filter}
          filters={filters}
          onChange={onChange}
        />
      ))}
    </form>
  );
};

const FilterField = <TFilters extends Record<string, string>>({
  id,
  filter,
  filters,
  onChange,
}: FilterFieldProps<TFilters>) => {
  if (filter.type === "range") {
    return (
      <RangeFilterField
        id={id}
        filter={filter}
        filters={filters}
        onChange={onChange}
      />
    );
  }

  const value = filters[id] ?? "";

  return (
    <SingleFilterInput
      filter={filter}
      value={value}
      onChange={(nextValue) => onChange(id, nextValue as TFilters[typeof id])}
      onClear={() => onChange(id, "" as TFilters[typeof id])}
    />
  );
};

const RangeFilterField = <TFilters extends Record<string, string>>({
  id,
  filter,
  filters,
  onChange,
}: {
  id: keyof TFilters & string;
  filter: Extract<ColumnFilter, { type: "range" }>;
  filters: TFilters;
  onChange: <K extends keyof TFilters & string>(
    key: K,
    value: TFilters[K],
  ) => void;
}) => {
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

  return (
    <div className="flex items-center gap-2">
      <RangeFilterInput
        filter={filter}
        value={minValue}
        placeholder={filter.minPlaceholder}
        onChange={setMin}
        onClear={() => setMin("")}
        onCommit={(nextValue) => normalizeRange("min", nextValue)}
      />

      <RangeFilterInput
        filter={filter}
        value={maxValue}
        placeholder={filter.maxPlaceholder}
        onChange={setMax}
        onClear={() => setMax("")}
        onCommit={(nextValue) => normalizeRange("max", nextValue)}
      />
    </div>
  );
};

const SingleFilterInput = ({
  filter,
  value,
  onChange,
  onClear,
}: SingleInputProps) => {
  const isActive = value.trim() !== "";

  switch (filter.type) {
    case "date":
      return (
        <DateInput
          value={value}
          onChange={onChange}
          placeholder={DATE_FORMAT}
          clearable={isActive}
          onClear={onClear}
        />
      );

    case "search":
      return (
        <div className={styles.baseInputGroup}>
          <MagnifyingGlassIcon className={styles.icon} />
          <Input
            className={styles.textInput}
            value={value}
            placeholder={filter.placeholder}
            onChange={(event) => onChange(event.target.value)}
          />
          {isActive && <FilterClearButton onClick={onClear} />}
        </div>
      );

    case "text":
    case "number":
      return (
        <div className={styles.baseInputGroup}>
          <Input
            className={styles.textInput}
            value={value}
            placeholder={filter.placeholder}
            onChange={(event) => onChange(event.target.value)}
          />
          {isActive && <FilterClearButton onClick={onClear} />}
        </div>
      );

    case "combobox":
      return (
        <Combobox
          value={value}
          onChange={onChange}
          options={filter.options}
          displayValue={filter.displayValue}
          renderOption={filter.renderOption}
          placeholder={filter.placeholder}
          clearable={isActive}
          onClear={onClear}
        />
      );
  }
};

const RangeFilterInput = ({
  filter,
  value,
  placeholder,
  onChange,
  onClear,
  onCommit,
}: RangeInputProps) => {
  const isActive = value.trim() !== "";

  if (filter.input === "date") {
    return (
      <DateInput
        value={value}
        onChange={onChange}
        onCommit={onCommit}
        placeholder={placeholder}
        clearable={isActive}
        onClear={onClear}
      />
    );
  }

  return (
    <div className={styles.baseInputGroup}>
      <Input
        className={styles.textInput}
        value={value}
        placeholder={placeholder}
        onChange={(event) => onChange(event.target.value)}
        onBlur={() => onCommit(value)}
      />
      {isActive && <FilterClearButton onClick={onClear} />}
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
