import { useState } from "react";

import { useEditServiceParams } from "../types";

export const useEditServices = ({ setAction }: useEditServiceParams) => {
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
