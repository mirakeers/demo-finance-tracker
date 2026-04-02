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
  <section className="flex flex-col gap-6 bg-b-card p-4">
    <header className="flex items-center gap-4">
      <p className="text-3xl font-semibold text-t-base">
        <span>{sign}</span>
        <span>{formatCurrency(Math.abs(total))}</span>
      </p>
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
              <span>{formatCurrency(group.total)}</span>
              <span className="text-t-light">({group.count})</span>
            </div>
          </li>
        ))}
      </ul>
    )}
  </section>
);
