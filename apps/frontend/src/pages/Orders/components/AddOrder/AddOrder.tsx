import { FC } from "react";
import {
  Box,
  Checkbox,
  FormControl,
  InputLabel,
  ListItemText,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";

import { RModal } from "@components/RModal/RModal";
import { ITEMS } from "@utils/constants";
import { useAddOrder } from "./hooks/useAddOrder";
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

export const AddOrder: FC = () => {
  const {
    open,
    paymentDetails,
    items,
    isPending,
    errors,
    getTotal,
    handleItemsChange,
    handlePaymentDetailsChange,
    handleSubmit,
    handleCancel,
  } = useAddOrder();

  return (
    <RModal
      open={open}
      title="New order"
      primaryAction={handleSubmit}
      primaryActionText={isPending ? "Loading..." : "Order"}
      secondaryAction={handleCancel}
      secondaryActionText="Cancel"
      isBusy={isPending}
    >
      <Box className="create-order-container">
        <FormControl fullWidth>
          <InputLabel id="service-label">Select service</InputLabel>
          <Select
            labelId="service-label"
            label="Select service"
            multiple
            value={items}
            onChange={handleItemsChange}
            renderValue={(selected) => selected.join(", ")}
            MenuProps={MenuProps}
            error={!!errors?.items}
          >
            {ITEMS.map(({ name }) => (
              <MenuItem key={name} value={name}>
                <Checkbox checked={items.indexOf(name) > -1} />
                <ListItemText primary={name} />
              </MenuItem>
            ))}
          </Select>
          {errors?.items && (
            <Typography variant="body2" color="error" p={1}>
              {errors?.items}
            </Typography>
          )}
        </FormControl>

        {items.length > 0 ? (
          <Box className="payment-container">
            <Box className="total-price">
              <Typography>Total: </Typography>
              <Typography>R{getTotal()}</Typography>
            </Box>

            <Typography variant="caption">Payment</Typography>
            <TextField
              label="Card details"
              placeholder="Enter card details"
              value={paymentDetails}
              onChange={handlePaymentDetailsChange}
              error={!!errors?.paymentDetails}
              helperText={errors?.paymentDetails}
            />
          </Box>
        ) : (
          <Typography>No service selected</Typography>
        )}
      </Box>
    </RModal>
  );
};
