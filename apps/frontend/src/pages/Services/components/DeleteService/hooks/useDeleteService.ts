import { useState } from "react";
import { useDispatch } from "react-redux";

import { setActiontype } from "@store/services/servicesSlice";

export const useDeleteService = () => {
  const [open, setOpen] = useState(true);
  const dispatch = useDispatch();

  const handleSubmit = () => {
    setOpen(false);
    dispatch(setActiontype(undefined));
  };

  const handleCancel = () => {
    setOpen(false);
    dispatch(setActiontype(undefined));
  };

  return {
    open,
    handleSubmit,
    handleCancel,
  };
};
