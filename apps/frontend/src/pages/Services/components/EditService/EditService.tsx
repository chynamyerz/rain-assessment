import { FC } from "react";
import {
  Box,
  FormControl,
  InputLabel,
  ListItemText,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";

import { RModal } from "@components/RModal/RModal";
import { useEditService } from "./hooks/useEditService";
import { ITEMS } from "@utils/constants";
import "./styles.modules.css";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

export const EditService: FC = () => {
  const {
    open,
    name,
    isPending,
    selectedService,
    paymentDetails,
    handlePaymentDetailsChange,
    handleNameChange,
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
        <FormControl fullWidth>
          <InputLabel id="service-label">Select new service</InputLabel>
          <Select
            labelId="service-label"
            label="Select new service"
            value={name}
            onChange={handleNameChange}
            renderValue={(selected) => selected}
            MenuProps={MenuProps}
          >
            {ITEMS.map(({ name }) => (
              <MenuItem key={name} value={name}>
                <ListItemText primary={name} />
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        {name && (
          <Box className="payment-container">
            <Box className="total-price">
              <Typography>Total: </Typography>
              <Typography>
                R{ITEMS.find((item) => item.name === name)?.price}
              </Typography>
            </Box>

            <Typography variant="caption">Payment</Typography>
            <TextField
              label="Card details"
              placeholder="Enter card details"
              value={paymentDetails}
              onChange={handlePaymentDetailsChange}
            />
          </Box>
        )}

        <Typography variant="body2">Current service</Typography>
        <TextField
          label="Name"
          InputLabelProps={{
            shrink: true,
          }}
          variant="outlined"
          placeholder={selectedService?.name}
          disabled
        />

        <TextField
          label="Details"
          InputLabelProps={{
            shrink: true,
          }}
          variant="outlined"
          placeholder={selectedService?.details}
          disabled
        />

        <TextField
          label="Status"
          InputLabelProps={{
            shrink: true,
          }}
          variant="outlined"
          placeholder={selectedService?.status}
          disabled
        />
      </Box>
    </RModal>
  );
};
