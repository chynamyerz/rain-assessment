import { FC } from "react";
import { Box, TextField } from "@mui/material";

import { RModal } from "@components/RModal/RModal";
import { useAddService } from "./hooks/useAddService";
import "./styles.modules.css";

export const AddService: FC = () => {
  const {
    open,
    name,
    status,
    details,
    isPending,
    handleNameChange,
    handleDetailsChange,
    handleStatusChange,
    handleSubmit,
    handleCancel,
  } = useAddService();

  return (
    <RModal
      open={open}
      title="Create service"
      primaryAction={handleSubmit}
      primaryActionText={isPending ? "Loading..." : "Create"}
      secondaryAction={handleCancel}
      secondaryActionText="Cancel"
      isBusy={isPending}
    >
      <Box className="create-service-container">
        <TextField
          label="Name"
          variant="outlined"
          onChange={handleNameChange}
          value={name}
        />

        <TextField
          label="Details"
          variant="outlined"
          onChange={handleDetailsChange}
          value={details}
        />

        <TextField
          label="Status"
          variant="outlined"
          onChange={handleStatusChange}
          value={status}
        />
      </Box>
    </RModal>
  );
};
