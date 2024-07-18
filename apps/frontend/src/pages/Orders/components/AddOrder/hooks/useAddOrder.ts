import { useState } from "react";
import { useDispatch } from "react-redux";

import { setActiontype } from "@store/orders/ordersSlice";

export const useAddOrder = () => {
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
