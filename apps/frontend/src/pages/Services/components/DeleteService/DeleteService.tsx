import { FC } from "react";
import { TextField } from "@mui/material";

import { RModal } from "../../../../components";
import { DeleteServiceProps } from "./types";
import { useDeleteService } from "./hooks/useDeleteService";

export const DeleteService: FC<DeleteServiceProps> = ({ setAction }) => {
  const { open, handleSubmit, handleCancel } = useDeleteService({ setAction });
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
