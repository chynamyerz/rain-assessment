import { FC } from "react";
import { Typography } from "@mui/material";

import { RModal } from "@components/RModal/RModal";
import { useDeleteService } from "./hooks/useDeleteService";

export const DeleteService: FC = () => {
  const { open, isPending, handleSubmit, handleCancel } = useDeleteService();
  return (
    <RModal
      open={open}
      title="Delete service"
      primaryAction={handleSubmit}
      primaryActionText={isPending ? "Loading" : "Yes"}
      secondaryAction={handleCancel}
      secondaryActionText="Cancel"
    >
      <Typography variant="subtitle2">
        Are you sure you want to delete this service?
      </Typography>
    </RModal>
  );
};
