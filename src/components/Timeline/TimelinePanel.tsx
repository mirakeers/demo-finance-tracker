import type { Transaction } from "../../types";
import { formatCurrency } from "../../utils/formatCurrency";
import { CategoryBadge } from "../CategoryBadge/CategoryBadge";

export type TimelineCategoryGroup = {
  category: Transaction["category"];
  total: number;
  count: number;
};

type TimelinePanelProps = {
  sign: "+" | "-";
  total: number;
  groups: TimelineCategoryGroup[];
  emptyText: string;
};

export const TimelinePanel = ({
  sign,
  total,
  groups,
  emptyText,
}: TimelinePanelProps) => (
  <section className="flex min-h-56 flex-col gap-6 bg-b-card p-6">
    <header className="flex items-center gap-4">
      <span className="text-3xl font-semibold text-t-base">{sign}</span>
      <span className="text-5xl font-semibold tracking-tight text-t-base">
        {formatCurrency(Math.abs(total))}
      </span>
    </header>

    {groups.length === 0 ? (
      <p className="my-auto text-center text-lg text-t-muted">{emptyText}</p>
    ) : (
      <ul className="flex flex-col gap-3">
        {groups.map((group) => (
          <li
            key={group.category}
            className="flex items-center justify-between gap-4"
          >
            <CategoryBadge category={group.category} />

            <div className="flex items-center gap-3 text-lg text-t-base">
              <span>{formatCurrency(Math.abs(group.total))}</span>
              <span className="text-t-muted">({group.count})</span>
            </div>
          </li>
        ))}
      </ul>
    )}
  </section>
);
