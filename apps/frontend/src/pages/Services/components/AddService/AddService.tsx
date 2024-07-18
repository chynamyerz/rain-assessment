import { FC } from "react";
import { TextField } from "@mui/material";

import { RModal } from "../../../../components";
import { AddServiceProps } from "./types";
import { useAddService } from "./hooks/useAddService";

export const AddService: FC<AddServiceProps> = ({ setAction }) => {
  const { open, handleSubmit, handleCancel } = useAddService({ setAction });
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
