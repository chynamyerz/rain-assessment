import { FC } from "react";
import { TextField } from "@mui/material";

import { RModal } from "@components/RModal/RModal";
import { useDeleteService } from "./hooks/useDeleteService";

export const DeleteService: FC = () => {
  const { open, handleSubmit, handleCancel } = useDeleteService();
  return (
    <RModal
      open={open}
      title="Delete service"
      primaryAction={handleSubmit}
      primaryActionText="Submit"
      secondaryAction={handleCancel}
      secondaryActionText="Cancel"
    >
      <TextField placeholder="Service name" />
    </RModal>
  );
};
