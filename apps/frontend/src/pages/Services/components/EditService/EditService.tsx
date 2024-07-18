import { FC } from "react";
import { TextField } from "@mui/material";

import { RModal } from "@components/RModal/RModal";
import { useEditServices } from "./hooks/useEditServices";

export const EditService: FC = () => {
  const { open, handleSubmit, handleCancel } = useEditServices();

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
