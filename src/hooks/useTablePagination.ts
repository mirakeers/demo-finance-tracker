import { useMemo, useState } from "react";

export const useTablePagination = <Row,>(rows: Row[], initialPageSize = 20) => {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(initialPageSize);

  const pageCount = Math.max(1, Math.ceil(rows.length / pageSize));

  const visibleRows = useMemo(() => {
    const start = (page - 1) * pageSize;
    return rows.slice(start, start + pageSize);
  }, [rows, page, pageSize]);

  const handlePreviousPage = () => {
    setPage((current) => Math.max(1, current - 1));
  };

  const handleNextPage = () => {
    setPage((current) => Math.min(pageCount, current + 1));
  };

  const handlePageSizeChange = (size: number) => {
    setPageSize(size);
    setPage(1);
  };

  return {
    page,
    pageSize,
    visibleRows,
    handlePreviousPage,
    handleNextPage,
    handlePageSizeChange,
  };
};