import { FC } from "react";
import { TextField } from "@mui/material";

import { RModal } from "@components/RModal/RModal";
import { useEditOrder } from "./hooks/useEditOrder";

export const EditOrder: FC = () => {
  const { open, handleSubmit, handleCancel } = useEditOrder();

  return (
    <RModal
      open={open}
      title="Update order"
      primaryAction={handleSubmit}
      primaryActionText="Submit"
      secondaryAction={handleCancel}
      secondaryActionText="Cancel"
    >
      <TextField placeholder="Order name" />
    </RModal>
  );
};
