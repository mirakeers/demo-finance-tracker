import { Dialog, DialogBackdrop, DialogPanel } from "@headlessui/react";
import {
  TransactionForm,
  type TransactionFormSubmitData,
  type TransactionFormValues,
} from "./TransactionForm";

type TransactionFormDialogProps = {
  open: boolean;
  mode?: "create" | "edit";
  initialValues?: Partial<TransactionFormValues>;
  onClose: () => void;
  onSubmit: (data: TransactionFormSubmitData) => void;
};

export const TransactionFormDialog = ({
  open,
  mode = "create",
  initialValues,
  onClose,
  onSubmit,
}: TransactionFormDialogProps) => (
  <Dialog open={open} onClose={onClose} className="relative z-50">
    <DialogBackdrop className="fixed inset-0 bg-black/70 md:bg-black/60" />

    <div className="fixed inset-0 flex items-stretch justify-center p-0 md:items-center md:p-6">
      <DialogPanel className="flex w-full max-w-2xl flex-1 bg-b-page p-6 md:flex-none md:rounded-2xl md:p-8">
        <TransactionForm
          mode={mode}
          initialValues={initialValues}
          onCancel={onClose}
          onSubmit={onSubmit}
        />
      </DialogPanel>
    </div>
  </Dialog>
);
