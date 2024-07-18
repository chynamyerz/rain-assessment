import { FC } from "react";
import { TextField } from "@mui/material";

import { RModal } from "../../../../components";
import { EditServiceProps } from "./types";
import { useEditServices } from "./hooks/useEditServices";

export const EditService: FC<EditServiceProps> = ({ setAction }) => {
  const { open, handleSubmit, handleCancel } = useEditServices({ setAction });
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
