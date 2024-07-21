import { ChangeEvent, useState } from "react";
import { useDispatch } from "react-redux";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { setActiontype } from "@store/services/servicesSlice";
import { ServiceCreateInput } from "../types";
import { mutationFnHelper } from "@utils/queryClientHelpers";

export const useAddService = () => {
  const [open, setOpen] = useState(true);
  const [name, setName] = useState("");
  const [status, setStatus] = useState("");
  const [details, setDetails] = useState("");

  const dispatch = useDispatch();
  const client = useQueryClient();

  /**
   *
   * Mutations
   *
   */
  const { isPending, mutate } = useMutation({
    mutationFn: (serviceInput: ServiceCreateInput) => {
      return mutationFnHelper("/services", "post", serviceInput);
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

  /**
   *
   * Handlers
   *
   */

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
    if (!name || !details || !status) {
      return;
    }

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
    handleNameChange,
    handleDetailsChange,
    handleStatusChange,
    handleSubmit,
    handleCancel,
  };
};
