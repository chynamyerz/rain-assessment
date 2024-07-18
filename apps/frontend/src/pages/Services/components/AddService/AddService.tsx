import { FC } from "react";
import { TextField } from "@mui/material";

import { RModal } from "../../../../components";
import { useAddService } from "./hooks/useAddService";

export const AddService: FC = () => {
  const { open, handleSubmit, handleCancel } = useAddService();

  return (
    <RModal
      open={open}
      title="Add service"
      primaryAction={handleSubmit}
      primaryActionText="Submit"
      secondaryAction={handleCancel}
      secondaryActionText="Cancel"
    >
      <TextField placeholder="Service name" />
    </RModal>
  );
};
