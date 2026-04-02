import { Input } from "@headlessui/react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { Combobox } from "../Form/Combobox/Combobox";
import { DateInput } from "../Form/DateInput/DateInput";
import styles from "../Form/FormLayout.module.css";
import type { ColumnFilter } from "./Table";

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

export const TableFilters = <Row, TFilters extends Record<string, string>>({
  columns,
  filters,
  onChange,
}: TableFiltersProps<Row, TFilters>) => {
  return (
    <form className="flex flex-wrap items-end gap-4">
      {columns.map((column) => {
        if (!column.filter) return null;

        return (
          <FilterField
            key={column.id}
            id={column.id as keyof TFilters & string}
            filter={column.filter}
            value={filters[column.id as keyof TFilters & string] ?? ""}
            onChange={onChange}
          />
        );
      })}
    </form>
  );
};

type FilterFieldProps<TFilters extends Record<string, string>> = {
  id: keyof TFilters & string;
  filter: ColumnFilter;
  value: string;
  onChange: <K extends keyof TFilters & string>(
    key: K,
    value: TFilters[K],
  ) => void;
};

const FilterField = <TFilters extends Record<string, string>>({
  id,
  filter,
  value,
  onChange,
}: FilterFieldProps<TFilters>) => {
  return (
    <>
      {renderInput(filter, value, (nextValue) =>
        onChange(id, nextValue as TFilters[typeof id]),
      )}
    </>
  );
};

const renderInput = (
  filter: ColumnFilter,
  value: string,
  onChange: (value: string) => void,
) => {
  switch (filter.type) {
    case "date":
      return (
        <DateInput
          value={value}
          onChange={onChange}
          placeholder={filter.placeholder}
        />
      );

    case "search":
      return (
        <div className={styles.baseInputGroup}>
          <MagnifyingGlassIcon className={styles.icon} />
          <Input
            className={styles.textInput}
            value={value}
            onChange={(event) => onChange(event.target.value)}
          />
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
        />
      );
  }
};
