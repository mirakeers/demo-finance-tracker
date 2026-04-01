import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import { Combobox } from "./Combobox";
import { useTranslation } from "react-i18next";
import { categories, type Category } from "../../../../data/categories";
import { CategoryBadge } from "../../../CategoryBadge/CategoryBadge";

const ComboboxStory = () => {
  const { t } = useTranslation();
  const [value, setValue] = useState<Category>(categories[0]);

  return (
    <div style={{ maxWidth: 300 }}>
      <Combobox
        value={value}
        onChange={setValue}
        options={categories}
        placeholder="Select category"
        displayValue={(val) => t(($) => $.category[val])}
        renderOption={(item) => <CategoryBadge category={item} />}
      />
    </div>
  );
};

const meta = {
  title: "UI/Forms/Fields/Combobox",
  render: () => <ComboboxStory />,
} satisfies Meta;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
