import { ReactNode } from "react";

export interface RModalProps {
  open: boolean;
  children: ReactNode;
  title?: string;
  isBusy?: boolean;
  primaryActionText: string;
  secondaryActionText?: string;
  primaryAction: () => void;
  secondaryAction?: () => void;
}
