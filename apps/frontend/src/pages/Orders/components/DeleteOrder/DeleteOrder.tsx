import { FC } from "react";
import { Chip, Typography } from "@mui/material";

import { RModal } from "@components/RModal/RModal";
import { useDeleteOrders } from "./hooks/useDeleteOrders";

export const DeleteOrder: FC = () => {
  const { open, isPending, isError, error, handleSubmit, handleCancel } =
    useDeleteOrders();
  return (
    <RModal
      open={open}
      title="Delete order"
      primaryAction={handleSubmit}
      primaryActionText={isPending ? "Loading" : "Yes"}
      secondaryAction={handleCancel}
      secondaryActionText="Cancel"
    >
      {isError && (
        <Chip
          label={error?.message || ""}
          variant="filled"
          color="error"
          size="small"
        ></Chip>
      )}
      <Typography variant="subtitle2">
        Are you sure you want to delete this order?
      </Typography>
    </RModal>
  );
};
