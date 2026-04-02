type TableSkeletonProps = {
  columns: number;
  rows?: number;
};

export const TableSkeleton = ({ columns, rows = 20 }: TableSkeletonProps) => {
  return (
    <>
      {Array.from({ length: rows }).map((_, rowIndex) => (
        <tr key={rowIndex}>
          {Array.from({ length: columns }).map((_, colIndex) => (
            <td
              key={colIndex}
              className="border-b-4 border-b-page bg-b-card px-4 py-2"
            >
              <div className="h-4 w-full animate-pulse rounded bg-slate-700/60" />
            </td>
          ))}
        </tr>
      ))}
    </>
  );
};
