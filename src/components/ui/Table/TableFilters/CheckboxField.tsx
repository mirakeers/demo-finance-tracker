import { Checkbox, Field, Label } from "@headlessui/react";
import { CheckIcon } from "@heroicons/react/24/outline";

type CheckBoxFieldProps = {
  checked: boolean;
  label: string;
  onChange: (checked: boolean) => void;
};

export const CheckBoxField = ({
  checked,
  label,
  onChange,
}: CheckBoxFieldProps) => (
  <Field className="shrink-0 flex items-center gap-2">
    <Checkbox
      checked={checked}
      onChange={onChange}
      className="flex size-5 items-center justify-center rounded border border-slate-600 bg-black data-checked:bg-interaction"
    >
      {checked && <CheckIcon className="size-3.5 text-white" />}
    </Checkbox>

    <Label className="text-sm text-t-light">{label}</Label>
  </Field>
);
