import { FC } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";

import { RModalProps } from "./types";

export const RModal: FC<RModalProps> = ({
  open,
  children,
  title,
  isBusy,
  primaryActionText,
  secondaryActionText,
  primaryAction,
  secondaryAction,
}) => {
  return (
    <Dialog
      open={open}
      onClose={secondaryAction ? secondaryAction : primaryAction}
    >
      {title && <DialogTitle>{title}</DialogTitle>}
      <DialogContent>{children}</DialogContent>
      <DialogActions>
        <Button onClick={primaryAction} disabled={isBusy}>
          {primaryActionText}
        </Button>
        {secondaryAction && (
          <Button onClick={secondaryAction} disabled={isBusy} color="error">
            {secondaryActionText || "Cancel"}
          </Button>
        )}
      </DialogActions>
    </Dialog>
  );
};
