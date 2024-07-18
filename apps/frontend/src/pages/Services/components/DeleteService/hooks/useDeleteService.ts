import { useState } from "react";

import { useDeleteServiceParams } from "../types";

export const useDeleteService = ({ setAction }: useDeleteServiceParams) => {
  const [open, setOpen] = useState(true);

  const handleSubmit = () => {
    setOpen(false);
    setAction(undefined);
  };

  const handleCancel = () => {
    setOpen(false);
    setAction(undefined);
  };

  return {
    open,
    handleSubmit,
    handleCancel,
  };
};
