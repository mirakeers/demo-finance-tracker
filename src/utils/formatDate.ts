import { format } from "date-fns";

export const DISPLAY_DATE_FORMAT = "dd/MM/yyyy";
export const MACHINE_DATE_FORMAT = "yyyy-MM-dd";

type FormatDateOptions = {
  machine?: boolean;
};

export const formatDate = (
  date: Date,
  options?: FormatDateOptions,
): string => {
  return format(
    date,
    options?.machine ? MACHINE_DATE_FORMAT : DISPLAY_DATE_FORMAT,
  );
};