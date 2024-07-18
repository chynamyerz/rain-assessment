import { FC } from "react";
import { TextField } from "@mui/material";

import { RModal } from "@components/RModal/RModal";
import { useEditService } from "./hooks/useEditService";

export const EditService: FC = () => {
  const { open, handleSubmit, handleCancel } = useEditService();

  return (
    <RModal
      open={open}
      title="Update service"
      primaryAction={handleSubmit}
      primaryActionText="Submit"
      secondaryAction={handleCancel}
      secondaryActionText="Cancel"
    >
      <TextField placeholder="Service name" />
    </RModal>
  );
};
