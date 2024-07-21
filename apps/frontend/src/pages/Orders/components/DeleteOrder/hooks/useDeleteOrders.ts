import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { setActiontype, setSelectedOrder } from "@store/orders/ordersSlice";
import { mutationFnHelper } from "@utils/queryClientHelpers";
import { RootState } from "@store/index";

export const useDeleteOrders = () => {
  const [open, setOpen] = useState(true);
  const { selectedOrder } = useSelector((state: RootState) => state.orders);

  const dispatch = useDispatch();
  const client = useQueryClient();

  /**
   *
   * Mutations
   *
   */
  const { isPending, mutate, isError, error } = useMutation({
    mutationFn: () => {
      return mutationFnHelper(`/orders/${selectedOrder?.id}`, "delete");
    },
    onSuccess: async () => {
      await client.invalidateQueries({ queryKey: ["Orders"] });
      setOpen(false);
      dispatch(setActiontype(undefined));
      dispatch(setSelectedOrder(undefined));
    },
  });

  /**
   *
   * Handlers
   *
   */

  const handleSubmit = () => {
    mutate();
  };

  const handleCancel = () => {
    setOpen(false);
    dispatch(setActiontype(undefined));
  };

  return {
    open,
    isPending,
    isError,
    error,
    handleSubmit,
    handleCancel,
  };
};
