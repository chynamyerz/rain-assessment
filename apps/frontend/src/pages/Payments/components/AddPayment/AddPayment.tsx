import { FC } from "react";
import { TextField } from "@mui/material";

import { RModal } from "@components/RModal/RModal";
import { useAddPayment } from "./hooks/useAddPayment";

export const AddPayment: FC = () => {
  const { open, handleSubmit, handleCancel } = useAddPayment();

  return (
    <RModal
      open={open}
      title="Add payment"
      primaryAction={handleSubmit}
      primaryActionText="Submit"
      secondaryAction={handleCancel}
      secondaryActionText="Cancel"
    >
      <TextField placeholder="Payment name" />
    </RModal>
  );
};
