import type { ColumnFilter } from "../Table";
import { ComboboxFilterField } from "./ComboboxFilterField";
import { DateFilterField } from "./DateFilterField";
import { RangeFilterField } from "./RangeFIlterField";
import { TextFilterField } from "./TextFilterField";

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
  useCurrentDay?: boolean;
  onUseCurrentDayChange?: (checked: boolean) => void;
};

export const TableFilters = <Row, TFilters extends Record<string, string>>({
  columns,
  filters,
  onChange,
  useCurrentDay,
  onUseCurrentDayChange,
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
    <form className="flex flex-wrap gap-x-8 gap-y-4">
      {filterColumns.map((column) => {
        const id = column.id as keyof TFilters & string;
        const value = filters[id] ?? "";
        const handleChange = (nextValue: string) =>
          onChange(id, nextValue as TFilters[typeof id]);
        const handleClear = () => onChange(id, "" as TFilters[typeof id]);

        return (
          <div key={id} className={`grow ${column.filter.wrapperClass ?? ""}`}>
            {column.filter.type === "range" ? (
              <RangeFilterField
                id={id}
                filter={column.filter}
                filters={filters}
                onChange={onChange}
                useCurrentDay={useCurrentDay}
                onUseCurrentDayChange={onUseCurrentDayChange}
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
