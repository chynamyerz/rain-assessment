import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ChangeEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios, { AxiosError } from "axios";

import { UserInput } from "../types";

export const useHome = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isNewUser, setIsNewUser] = useState(false);
  const [errors, setErrors] = useState<{ email?: string; password?: string }>();
  const client = useQueryClient();
  const navigate = useNavigate();

  /**
   *
   * Mutations
   *
   */
  const { isPending, isError, error, mutate } = useMutation({
    mutationFn: (userInput: UserInput) => {
      const { isNew, ...requestBody } = userInput;
      if (isNew) {
        return axios.post(`${import.meta.env.VITE_API_URL}/users`, requestBody);
      }
      return axios.post(`${import.meta.env.VITE_API_URL}/auth`, requestBody);
    },
    onSuccess: async (response) => {
      localStorage.setItem("token", response.data.data.token);
      await client.invalidateQueries({ queryKey: ["User"] });
      setIsNewUser(false);
      setEmail("");
      setPassword("");
      navigate("/dashboard");
    },
  });

  /**
   *
   * Handlers
   *
   */

  const handleEmailChange = (event: ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event: ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handleNewUser = () => {
    setIsNewUser(!isNewUser);
  };

  const handleSubmit = () => {
    let abortSubmit = false;
    if (!email) {
      abortSubmit = true;
      setErrors((prevState) => ({
        ...prevState,
        email: "Email address is required!",
      }));
    } else {
      setErrors((prevState) => ({
        ...prevState,
        email: undefined,
      }));
    }

    if (!password) {
      abortSubmit = true;
      setErrors((prevState) => ({
        ...prevState,
        password: "Password is required!",
      }));
    } else {
      setErrors((prevState) => ({
        ...prevState,
        password: undefined,
      }));
    }

    if (abortSubmit) {
      return;
    }

    setErrors(undefined);

    mutate({
      email,
      password,
      isNew: isNewUser,
    });
  };

  return {
    email,
    password,
    isNewUser,
    isPending,
    isError,
    errors,
    error: (error as AxiosError<{ message: string }>) || undefined || null,
    handleEmailChange,
    handlePasswordChange,
    handleNewUser,
    handleSubmit,
  };
};
