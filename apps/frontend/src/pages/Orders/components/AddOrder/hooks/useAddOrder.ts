import { ChangeEvent, useState } from "react";
import { useDispatch } from "react-redux";
import { SelectChangeEvent } from "@mui/material";

import { setActiontype } from "@store/orders/ordersSlice";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { mutationFnHelper } from "@utils/queryClientHelpers";
import { OrderCreateInput } from "../types";
import { ITEMS } from "@utils/constants";

export const useAddOrder = () => {
  const [open, setOpen] = useState(true);
  const [paymentDetails, setPaymentDetails] = useState("");
  const [items, setItems] = useState<string[]>([]);
  const [errors, setErrors] = useState<{
    items?: string;
    paymentDetails?: string;
  }>();
  const dispatch = useDispatch();
  const client = useQueryClient();

  /**
   *
   * Mutations
   *
   */
  const { isPending, mutate } = useMutation({
    mutationFn: (orderInput: OrderCreateInput) => {
      return mutationFnHelper("/orders", "post", orderInput);
    },
    onSuccess: async () => {
      await client.invalidateQueries({ queryKey: ["Services"] });
      await client.invalidateQueries({ queryKey: ["Orders"] });
      await client.invalidateQueries({ queryKey: ["Payments"] });
      setOpen(false);
      dispatch(setActiontype(undefined));
      setPaymentDetails("");
      setItems([]);
    },
  });

  /**
   *
   * Handlers
   *
   */

  const handleItemsChange = (event: SelectChangeEvent<string>) => {
    const {
      target: { value },
    } = event;

    setItems(typeof value === "string" ? value.split(",") : value);
  };

  const handlePaymentDetailsChange = (event: ChangeEvent<HTMLInputElement>) => {
    setPaymentDetails(event.target.value);
  };

  const handleSubmit = () => {
    let abortSubmit = false;
    if (!paymentDetails) {
      abortSubmit = true;
      setErrors((prevState) => ({
        ...prevState,
        paymentDetails: "Payment details required!",
      }));
    } else {
      setErrors((prevState) => ({ ...prevState, paymentDetails: undefined }));
    }

    if (!items || items.length < 1) {
      abortSubmit = true;
      setErrors((prevState) => ({
        ...prevState,
        items: "At least 1 item required!",
      }));
    } else {
      setErrors((prevState) => ({ ...prevState, items: undefined }));
    }

    if (abortSubmit) {
      return;
    }

    setErrors(undefined);

    mutate({
      items,
    });
  };

  const handleCancel = () => {
    setOpen(false);
    dispatch(setActiontype(undefined));
  };

  const getTotal = () => {
    let total = 0;
    items
      .reduce(
        (_, cur) => (total += ITEMS.find((item) => item.name === cur)!.price),
        0
      )
      .toFixed(2);
    return total;
  };

  return {
    open,
    items,
    paymentDetails,
    isPending,
    errors,
    getTotal,
    handlePaymentDetailsChange,
    handleItemsChange,
    handleSubmit,
    handleCancel,
  };
};
