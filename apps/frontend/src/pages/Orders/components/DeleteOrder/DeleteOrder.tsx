import { FC } from "react";
import { TextField } from "@mui/material";

import { RModal } from "@components/RModal/RModal";
import { useDeleteOrders } from "./hooks/useDeleteOrders";

export const DeleteOrder: FC = () => {
  const { open, handleSubmit, handleCancel } = useDeleteOrders();
  return (
    <RModal
      open={open}
      title="Delete order"
      primaryAction={handleSubmit}
      primaryActionText="Submit"
      secondaryAction={handleCancel}
      secondaryActionText="Cancel"
    >
      <TextField placeholder="Order name" />
    </RModal>
  );
};
