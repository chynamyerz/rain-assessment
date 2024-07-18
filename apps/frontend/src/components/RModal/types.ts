import { ReactNode } from "react";

export interface RModalProps {
  open: boolean;
  children: ReactNode;
  title?: string;
  primaryActionText: string;
  secondaryActionText?: string;
  primaryAction: () => void;
  secondaryAction?: () => void;
}
