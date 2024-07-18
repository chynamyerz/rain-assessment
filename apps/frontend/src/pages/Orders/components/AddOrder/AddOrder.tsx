import { FC } from "react";
import { TextField } from "@mui/material";

import { RModal } from "@components/RModal/RModal";
import { useAddOrder } from "./hooks/useAddOrder";

export const AddOrder: FC = () => {
  const { open, handleSubmit, handleCancel } = useAddOrder();

  return (
    <RModal
      open={open}
      title="Add order"
      primaryAction={handleSubmit}
      primaryActionText="Submit"
      secondaryAction={handleCancel}
      secondaryActionText="Cancel"
    >
      <TextField placeholder="Oders name" />
    </RModal>
  );
};
