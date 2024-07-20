import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useQueryClient, useMutation } from "@tanstack/react-query";

import { setActiontype } from "@store/services/servicesSlice";
import { mutationFnHelper } from "@utils/queryClientHelpers";
import { RootState } from "@store/index";

export const useDeleteService = () => {
  const [open, setOpen] = useState(true);
  const { selectedService } = useSelector((state: RootState) => state.services);
  const dispatch = useDispatch();

  const client = useQueryClient();

  /**
   *
   * Mutations
   *
   */
  const { isPending, mutate } = useMutation({
    mutationFn: () => {
      return mutationFnHelper(`/services/${selectedService?.id}`, "delete");
    },
    onSuccess: async () => {
      await client.invalidateQueries({ queryKey: ["Services"] });
      setOpen(false);
      dispatch(setActiontype(undefined));
    },
  });

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
    handleSubmit,
    handleCancel,
  };
};
