import type { ColumnFilter } from "./Table";
import { ComboboxFilterField } from "./TableFilters/ComboboxFilterField";
import { DateFilterField } from "./TableFilters/DateFilterField";
import { RangeFilterField } from "./TableFilters/RangeFIlterField";
import { SearchFilterField } from "./TableFilters/SearchFilterField";
import { TextFilterField } from "./TableFilters/TextFilterField";

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
      {filterColumns.map((column) => {
        const id = column.id as keyof TFilters & string;

        if (column.filter.type === "range") {
          return (
            <RangeFilterField
              key={id}
              id={id}
              filter={column.filter}
              filters={filters}
              onChange={onChange}
            />
          );
        }

        const value = filters[id] ?? "";
        const handleChange = (nextValue: string) =>
          onChange(id, nextValue as TFilters[typeof id]);
        const handleClear = () => onChange(id, "" as TFilters[typeof id]);

        switch (column.filter.type) {
          case "date":
            return (
              <DateFilterField
                key={id}
                value={value}
                placeholder={column.filter.placeholder}
                onChange={handleChange}
                onClear={handleClear}
              />
            );

          case "search":
            return (
              <SearchFilterField
                key={id}
                value={value}
                placeholder={column.filter.placeholder}
                onChange={handleChange}
                onClear={handleClear}
              />
            );

          case "text":
          case "number":
            return (
              <TextFilterField
                key={id}
                value={value}
                placeholder={column.filter.placeholder}
                onChange={handleChange}
                onClear={handleClear}
              />
            );

          case "combobox":
            return (
              <ComboboxFilterField
                key={id}
                value={value}
                placeholder={column.filter.placeholder}
                options={column.filter.options}
                displayValue={column.filter.displayValue}
                renderOption={column.filter.renderOption}
                onChange={handleChange}
                onClear={handleClear}
              />
            );
        }
      })}
    </form>
  );
};
