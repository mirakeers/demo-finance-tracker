import type { Meta, StoryObj } from "@storybook/react-vite";
import { Field, Input, Label } from "@headlessui/react";
import {
  CalendarDaysIcon,
  CurrencyEuroIcon,
  MagnifyingGlassIcon,
  TagIcon,
} from "@heroicons/react/24/outline";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Button } from "../Button/Button";
import styles from "./FormLayout.module.css";
import { DateInput } from "./DateInput/DateInput";
import { Combobox } from "./Combobox/Combobox";
import { categories, type Category } from "../../../data/categories";
import { CategoryBadge } from "../../CategoryBadge/CategoryBadge";

const FormStoryContent = () => {
  const { t } = useTranslation();

  const [textSimple, setTextSimple] = useState("");
  const [textSearch, setTextSearch] = useState("");
  const [amountMin, setAmountMin] = useState("");
  const [amountMax, setAmountMax] = useState("");
  const [dateMin, setDateMin] = useState("02/04/2026");
  const [dateMax, setDateMax] = useState("12/04/2026");
  const [category, setCategory] = useState<Category | "">("");

  return (
    <section className="flex flex-col gap-12">
      <h2>Form fields</h2>

      <form className={styles.form}>
        <Field className={styles.field}>
          <Label className={styles.label}>Text field</Label>
          <div className={styles.baseInputGroup}>
            <Input
              className={styles.textInput}
              type="text"
              value={textSimple}
              placeholder="Placeholder"
              onChange={(event) => setTextSimple(event.target.value)}
            />
          </div>
        </Field>

        <Field className={styles.field}>
          <Label className={styles.label}>Search field</Label>
          <div className={styles.baseInputGroup}>
            <MagnifyingGlassIcon className={styles.icon} />
            <Input
              className={styles.textInput}
              type="text"
              value={textSearch}
              placeholder={t(($) => $.transaction.description.placeholder)}
              onChange={(event) => setTextSearch(event.target.value)}
            />
          </div>
        </Field>

        <Field className={styles.field}>
          <Label className={styles.label}>Date range</Label>
          <div className="flex items-center gap-2">
            <DateInput
              value={dateMin}
              placeholder={t(($) => $.transaction.date.placeholder.min)}
              onChange={setDateMin}
              slot={<CalendarDaysIcon className={styles.icon} />}
              clearable={dateMin.trim() !== ""}
              onClear={() => setDateMin("")}
            />
            <DateInput
              value={dateMax}
              placeholder={t(($) => $.transaction.date.placeholder.max)}
              onChange={setDateMax}
              slot={<CalendarDaysIcon className={styles.icon} />}
              clearable={dateMax.trim() !== ""}
              onClear={() => setDateMax("")}
            />
          </div>
        </Field>

        <Field className={styles.field}>
          <Label className={styles.label}>Amount range</Label>
          <div className="flex items-center gap-2">
            <div className={styles.baseInputGroup}>
              <CurrencyEuroIcon className={styles.icon} />
              <Input
                className={styles.textInput}
                type="text"
                value={amountMin}
                placeholder={t(($) => $.transaction.amount.placeholder.min)}
                onChange={(event) => setAmountMin(event.target.value)}
              />
            </div>

            <div className={styles.baseInputGroup}>
              <CurrencyEuroIcon className={styles.icon} />
              <Input
                className={styles.textInput}
                type="text"
                value={amountMax}
                placeholder={t(($) => $.transaction.amount.placeholder.max)}
                onChange={(event) => setAmountMax(event.target.value)}
              />
            </div>
          </div>
        </Field>

        <Field className={styles.field}>
          <Label className={styles.label}>Combobox</Label>
          <Combobox
            value={category}
            onChange={setCategory}
            options={categories}
            placeholder={t(($) => $.transaction.category.placeholder)}
            displayValue={(value) => t(($) => $.category[value])}
            renderOption={(item) => <CategoryBadge category={item} />}
            slot={<TagIcon className={styles.icon} />}
            clearable={category !== ""}
            onClear={() => setCategory("")}
          />
        </Field>

        <menu className={styles.formActions}>
          <Button className="grow" variant="outline">
            Close
          </Button>
          <Button className="grow">Confirm</Button>
        </menu>
      </form>
    </section>
  );
};

const meta = {
  title: "UI/Forms/Form",
  render: () => <FormStoryContent />,
} satisfies Meta;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
