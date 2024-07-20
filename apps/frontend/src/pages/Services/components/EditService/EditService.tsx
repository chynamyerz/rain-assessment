import { FC } from "react";
import { Box, TextField } from "@mui/material";

import { RModal } from "@components/RModal/RModal";
import { useEditService } from "./hooks/useEditService";
import "./styles.modules.css";

export const EditService: FC = () => {
  const {
    open,
    name,
    status,
    details,
    isPending,
    selectedService,
    handleNameChange,
    handleDetailsChange,
    handleStatusChange,
    handleSubmit,
    handleCancel,
  } = useEditService();

  return (
    <RModal
      open={open}
      title="Update service"
      primaryAction={handleSubmit}
      primaryActionText={isPending ? "Loading..." : "Update"}
      secondaryAction={handleCancel}
      secondaryActionText="Cancel"
      isBusy={isPending}
    >
      <Box className="edit-service-container">
        <TextField
          label="Name"
          InputLabelProps={{
            shrink: true,
          }}
          variant="outlined"
          onChange={handleNameChange}
          value={name}
          placeholder={selectedService?.name}
        />

        <TextField
          label="Details"
          InputLabelProps={{
            shrink: true,
          }}
          variant="outlined"
          onChange={handleDetailsChange}
          value={details}
          placeholder={selectedService?.details}
        />

        <TextField
          label="Status"
          InputLabelProps={{
            shrink: true,
          }}
          variant="outlined"
          onChange={handleStatusChange}
          value={status}
          placeholder={selectedService?.status}
        />
      </Box>
    </RModal>
  );
};
