import { useState } from "react";

import { useAddServiceParams } from "../types";

export const useAddService = ({ setAction }: useAddServiceParams) => {
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
