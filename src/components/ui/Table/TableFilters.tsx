import type { ColumnFilter } from "./Table";
import { ComboboxFilterField } from "./TableFilters/ComboboxFilterField";
import { DateFilterField } from "./TableFilters/DateFilterField";
import { RangeFilterField } from "./TableFilters/RangeFIlterField";
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
    <form className="flex flex-wrap gap-y-4 gap-x-8">
      {filterColumns.map((column) => {
        const id = column.id as keyof TFilters & string;
        const value = filters[id] ?? "";
        const handleChange = (nextValue: string) =>
          onChange(id, nextValue as TFilters[typeof id]);
        const handleClear = () => onChange(id, "" as TFilters[typeof id]);

        return (
          <div key={id} className={`grow-1 ${column.filter.wrapperClass}`}>
            {column.filter.type === "range" ? (
              <RangeFilterField
                id={id}
                filter={column.filter}
                filters={filters}
                onChange={onChange}
              />
            ) : column.filter.type === "date" ? (
              <DateFilterField
                value={value}
                placeholder={column.filter.placeholder}
                slot={column.filter.slot}
                onChange={handleChange}
                onClear={handleClear}
              />
            ) : column.filter.type === "combobox" ? (
              <ComboboxFilterField
                value={value}
                placeholder={column.filter.placeholder}
                options={column.filter.options}
                displayValue={column.filter.displayValue}
                renderOption={column.filter.renderOption}
                slot={column.filter.slot}
                onChange={handleChange}
                onClear={handleClear}
              />
            ) : (
              <TextFilterField
                value={value}
                placeholder={column.filter.placeholder}
                slot={column.filter.slot}
                onChange={handleChange}
                onClear={handleClear}
              />
            )}
          </div>
        );
      })}
    </form>
  );
};
