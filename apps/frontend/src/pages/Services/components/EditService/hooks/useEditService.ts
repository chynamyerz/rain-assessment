import { ChangeEvent, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { setActiontype } from "@store/services/servicesSlice";
import { ServiceUpdateInput } from "../types";
import { mutationFnHelper } from "@utils/queryClientHelpers";
import { RootState } from "@store/index";

export const useEditService = () => {
  const [open, setOpen] = useState(true);
  const [name, setName] = useState("");
  const [status, setStatus] = useState("");
  const [details, setDetails] = useState("");
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
      setOpen(false);
      dispatch(setActiontype(undefined));
      setName("");
      setDetails("");
      setStatus("");
    },
  });

  const handleNameChange = (event: ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  const handleDetailsChange = (event: ChangeEvent<HTMLInputElement>) => {
    setDetails(event.target.value);
  };

  const handleStatusChange = (event: ChangeEvent<HTMLInputElement>) => {
    setStatus(event.target.value);
  };

  const handleSubmit = () => {
    mutate({
      name,
      details,
      status,
    });
  };

  const handleCancel = () => {
    setOpen(false);
    dispatch(setActiontype(undefined));
  };

  return {
    open,
    name,
    status,
    details,
    isPending,
    selectedService,
    handleNameChange,
    handleDetailsChange,
    handleStatusChange,
    handleSubmit,
    handleCancel,
  };
};
