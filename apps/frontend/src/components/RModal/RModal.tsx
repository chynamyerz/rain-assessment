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
        <Button onClick={primaryAction}>{primaryActionText}</Button>
        {secondaryAction && (
          <Button onClick={secondaryAction}>
            {secondaryActionText || "Cancel"}
          </Button>
        )}
      </DialogActions>
    </Dialog>
  );
};
