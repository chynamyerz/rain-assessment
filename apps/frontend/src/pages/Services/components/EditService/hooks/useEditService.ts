import { ChangeEvent, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import {
  setActiontype,
  setSelectedService,
} from "@store/services/servicesSlice";
import { ServiceUpdateInput } from "../types";
import { mutationFnHelper } from "@utils/queryClientHelpers";
import { RootState } from "@store/index";
import { SelectChangeEvent } from "@mui/material";

export const useEditService = () => {
  const [open, setOpen] = useState(true);
  const [name, setName] = useState("");
  const [paymentDetails, setPaymentDetails] = useState("");
  const { selectedService } = useSelector((state: RootState) => state.services);

  const dispatch = useDispatch();
  const client = useQueryClient();

  /**
   *
   * Mutations
   *
   */
  const { isPending, mutate } = useMutation({
    mutationFn: (serviceInput: ServiceUpdateInput) => {
      return mutationFnHelper(
        `/services/${selectedService?.id}`,
        "put",
        serviceInput
      );
    },
    onSuccess: async () => {
      await client.invalidateQueries({ queryKey: ["Services"] });
      await client.invalidateQueries({ queryKey: ["Payments"] });
      setOpen(false);
      dispatch(setActiontype(undefined));
      dispatch(setSelectedService(undefined));
      setName("");
    },
  });

  /**
   *
   * Handlers
   *
   */

  const handleNameChange = (event: SelectChangeEvent<string>) => {
    setName(event.target.value);
  };

  const handlePaymentDetailsChange = (event: ChangeEvent<HTMLInputElement>) => {
    setPaymentDetails(event.target.value);
  };

  const handleSubmit = () => {
    if (!name || !paymentDetails) {
      return;
    }

    mutate({
      name,
    });
  };

  const handleCancel = () => {
    setOpen(false);
    dispatch(setActiontype(undefined));
  };

  return {
    open,
    name,
    isPending,
    selectedService: selectedService!,
    paymentDetails,
    handlePaymentDetailsChange,
    handleNameChange,
    handleSubmit,
    handleCancel,
  };
};
