import { Field, Input, Label } from "@headlessui/react";
import { isValid, parseISO } from "date-fns";
import { useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { categories, type Category } from "../../data/categories";
import { Button } from "../ui/Button/Button";
import { DateInput } from "../ui/Form/DateInput/DateInput";
import { Combobox } from "../ui/Form/Combobox/Combobox";
import styles from "../ui/Form/FormLayout.module.css";
import { CategoryBadge } from "../CategoryBadge/CategoryBadge";

export type TransactionFormValues = {
  date: string;
  category: Category | "";
  amount: string;
  description: string;
};

export type TransactionFormSubmitData = {
  date: Date;
  category: Category;
  amount: number;
  description: string;
  source: "manual";
};

type TransactionFormErrors = Partial<
  Record<keyof TransactionFormValues, string>
>;

type TransactionFormProps = {
  mode?: "create" | "edit";
  initialValues?: Partial<TransactionFormValues>;
  onSubmit: (data: TransactionFormSubmitData) => void;
  onCancel: () => void;
};

const EMPTY_VALUES: TransactionFormValues = {
  date: "",
  category: "",
  amount: "",
  description: "",
};

const getInitialValues = (
  initialValues?: Partial<TransactionFormValues>,
): TransactionFormValues => ({
  ...EMPTY_VALUES,
  ...initialValues,
});

export const TransactionForm = ({
  mode = "create",
  initialValues,
  onSubmit,
  onCancel,
}: TransactionFormProps) => {
  const { t } = useTranslation();

  const [values, setValues] = useState(() => getInitialValues(initialValues));
  const [errors, setErrors] = useState<TransactionFormErrors>({});
  const [successMessage, setSuccessMessage] = useState("");

  const dateFieldRef = useRef<HTMLDivElement | null>(null);
  const categoryFieldRef = useRef<HTMLDivElement | null>(null);
  const amountRef = useRef<HTMLInputElement | null>(null);
  const descriptionRef = useRef<HTMLInputElement | null>(null);

  const setValue = <K extends keyof TransactionFormValues>(
    key: K,
    value: TransactionFormValues[K],
  ) => {
    setValues((current) => ({ ...current, [key]: value }));
    setErrors((current) => ({ ...current, [key]: undefined }));
    setSuccessMessage("");
  };

  const validateValues = (): TransactionFormErrors => {
    const nextErrors: TransactionFormErrors = {};

    if (!values.date || !isValid(parseISO(values.date))) {
      nextErrors.date = t(($) => $.transactionForm.date.invalid);
    }

    if (!values.category) {
      nextErrors.category = t(($) => $.transactionForm.category.required);
    }

    if (!values.amount.trim() || Number.isNaN(Number(values.amount))) {
      nextErrors.amount = t(($) => $.transactionForm.amount.invalid);
    }

    if (!values.description.trim()) {
      nextErrors.description = t(($) => $.transactionForm.description.required);
    }

    return nextErrors;
  };

  const focusFirstInvalidField = (nextErrors: TransactionFormErrors) => {
    if (nextErrors.date) {
      dateFieldRef.current?.querySelector("input")?.focus();
      return;
    }

    if (nextErrors.category) {
      categoryFieldRef.current?.querySelector("input")?.focus();
      return;
    }

    if (nextErrors.amount) {
      amountRef.current?.focus();
      return;
    }

    if (nextErrors.description) {
      descriptionRef.current?.focus();
    }
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const nextErrors = validateValues();

    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      setSuccessMessage("");
      focusFirstInvalidField(nextErrors);
      return;
    }

    onSubmit({
      date: parseISO(values.date),
      category: values.category as Category,
      amount: Number(values.amount),
      description: values.description.trim(),
      source: "manual",
    });

    setErrors({});
    setSuccessMessage(t(($) => $.transactionForm.success));
    setValues(EMPTY_VALUES);
  };

  return (
    <section className="w-full flex flex-col gap-8">
      <h2>
        {mode === "edit"
          ? t(($) => $.transactionForm.heading.edit)
          : t(($) => $.transactionForm.heading.create)}
      </h2>

      <form className={styles.form} onSubmit={handleSubmit} noValidate>
        <Field className={styles.field}>
          <Label className={styles.label}>
            {t(($) => $.transaction.date.label)}
          </Label>
          <div ref={dateFieldRef}>
            <DateInput
              value={values.date}
              placeholder={t(($) => $.transactionForm.date.placeholder)}
              clearable={values.date !== ""}
              onClear={() => setValue("date", "")}
              onChange={(nextValue) => setValue("date", nextValue)}
            />
          </div>
          {errors.date && (
            <p className="text-sm text-red-400" role="alert">
              {errors.date}
            </p>
          )}
        </Field>

        <Field className={styles.field}>
          <Label className={styles.label}>
            {t(($) => $.transaction.category.label)}
          </Label>
          <div ref={categoryFieldRef}>
            <Combobox
              value={values.category}
              onChange={(nextValue) => setValue("category", nextValue)}
              options={categories}
              placeholder={t(($) => $.transaction.category.placeholder)}
              displayValue={(value) =>
                value ? t(($) => $.category[value]) : ""
              }
              renderOption={(item) => <CategoryBadge category={item} />}
              clearable={values.category !== ""}
              onClear={() => setValue("category", "")}
            />
          </div>
          {errors.category && (
            <p className="text-sm text-red-400" role="alert">
              {errors.category}
            </p>
          )}
        </Field>

        <Field className={styles.field}>
          <Label className={styles.label}>
            {t(($) => $.transaction.amount.label)}
          </Label>
          <div className={styles.baseInputGroup}>
            €
            <Input
              ref={amountRef}
              className={styles.textInput}
              type="text"
              value={values.amount}
              placeholder={t(($) => $.transactionForm.amount.placeholder)}
              aria-invalid={Boolean(errors.amount)}
              onChange={(event) => setValue("amount", event.target.value)}
            />
          </div>
          {errors.amount && (
            <p className="text-sm text-red-400" role="alert">
              {errors.amount}
            </p>
          )}
        </Field>

        <Field className={styles.field}>
          <Label className={styles.label}>
            {t(($) => $.transaction.description.label)}
          </Label>
          <div className={styles.baseInputGroup}>
            <Input
              ref={descriptionRef}
              className={styles.textInput}
              type="text"
              value={values.description}
              placeholder={t(($) => $.transactionForm.description.placeholder)}
              aria-invalid={Boolean(errors.description)}
              onChange={(event) => setValue("description", event.target.value)}
            />
          </div>
          {errors.description && (
            <p className="text-sm text-red-400" role="alert">
              {errors.description}
            </p>
          )}
        </Field>

        <menu className={styles.formActions}>
          <Button
            className="grow"
            variant="outline"
            type="button"
            onClick={onCancel}
          >
            {t(($) => $.transactionForm.actions.cancel)}
          </Button>
          <Button className="grow" type="submit">
            {mode === "edit"
              ? t(($) => $.transactionForm.actions.save)
              : t(($) => $.transactionForm.actions.create)}
          </Button>
        </menu>
      </form>

      <div
        aria-live="polite"
        role="status"
        className="min-h-6 text-sm text-green-400"
      >
        {successMessage}
      </div>
    </section>
  );
};
