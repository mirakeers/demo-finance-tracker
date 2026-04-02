import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import { Select } from "@headlessui/react";
import { Button } from "../Button/Button";

type TablePaginationProps = {
  page: number;
  totalItems: number;
  onPrevious: () => void;
  onNext: () => void;
  pageSize: number;
  onPageSizeChange: (size: number) => void;
  className?: string;
};

export const TablePagination = ({
  page,
  totalItems,
  onPrevious,
  onNext,
  pageSize,
  onPageSizeChange,
  className = "",
}: TablePaginationProps) => {
  const pageCount = Math.max(1, Math.ceil(totalItems / pageSize));
  const canPrevious = page > 1;
  const canNext = page < pageCount;

  return (
    <div
      className={`flex items-center justify-between gap-4 font-semibold ${className}`}
    >
      <p className="text-sm text-slate-400">Total entries: {totalItems}</p>

      <div className="flex items-center gap-4">
        <Button onClick={onPrevious} disabled={!canPrevious}>
          <ChevronLeftIcon className="size-4" />
        </Button>

        <p className="text-sm text-slate-400">
          Page {page} of {pageCount}
        </p>

        <Button onClick={onNext} disabled={!canNext}>
          <ChevronRightIcon className="size-4" />
        </Button>
      </div>

      <div className="flex items-center gap-2">
        <p className="text-sm text-slate-400">Show per page:</p>
        <form>
          <Select
            className=""
            value={pageSize}
            onChange={(e) => {
              onPageSizeChange(parseInt(e.target.value));
            }}
          >
            {[10, 20, 50, 100, 200, 500].map((value) => (
              <option key={value} className="bg-b-card" value={value}>
                {value}
              </option>
            ))}
          </Select>
        </form>
      </div>
    </div>
  );
};
