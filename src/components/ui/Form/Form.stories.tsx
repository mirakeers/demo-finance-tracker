import type { Meta, StoryObj } from "@storybook/react-vite";
import { Field, Input, Label } from "@headlessui/react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import { Button } from "../Button/Button";
import styles from "./FormLayout.module.css";
import { DateInput } from "./DateInput/DateInput";
import { t } from "i18next";
import { categories, type Category } from "../../../data/categories";
import { CategoryBadge } from "../../CategoryBadge/CategoryBadge";
import { Combobox } from "./Combobox/Combobox";

const FormStoryContent = () => {
  const [textSimple, setTextSimple] = useState("");
  const [textIcon, setTextIcon] = useState("");
  const [date, setDate] = useState("02/04/2026");
  const [category, setCategory] = useState<Category>(categories[0]);

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
          <Label className={styles.label}>Text field with icon</Label>
          <div className={styles.baseInputGroup}>
            <MagnifyingGlassIcon className={styles.icon} />
            <Input
              className={styles.textInput}
              type="text"
              value={textIcon}
              placeholder="Placeholder"
              onChange={(event) => setTextIcon(event.target.value)}
            />
          </div>
        </Field>

        <Field className={styles.field}>
          <Label className={styles.label}>Text field with icon</Label>
          <div className={styles.baseInputGroup}>
            <MagnifyingGlassIcon className={styles.icon} />
            <Input
              className={styles.textInput}
              type="text"
              value={textIcon}
              placeholder="Placeholder"
              onChange={(event) => setTextIcon(event.target.value)}
            />
          </div>
        </Field>

        <Field className={styles.field}>
          <Label className={styles.label}>Date picker field</Label>
          <DateInput
            className={styles.textInput}
            value={date}
            placeholder="Placeholder"
            onChange={setDate}
          />
        </Field>

        <Field className={styles.field}>
          <Label className={styles.label}>Combobox (dropdown)</Label>
          <Combobox
            value={category}
            onChange={setCategory}
            options={categories}
            placeholder="Select category"
            displayValue={(value) => t(($) => $.category[value])}
            renderOption={(item) => <CategoryBadge category={item} />}
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
  title: "UI/Form",
  render: () => <FormStoryContent />,
} satisfies Meta;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
