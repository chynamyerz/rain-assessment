import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ChangeEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import { AuthUser } from "@store/types";
import queryClient from "queryClient";

export const useHome = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isNewUser, setIsNewUser] = useState(false);
  const client = useQueryClient(queryClient);
  const navigate = useNavigate();

  const { isPending, isError, mutate } = useMutation({
    mutationFn: (userInput: AuthUser) => {
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

  useEffect(() => {
    if (localStorage.getItem("token")) {
      navigate("/dash");
    }
  }, []);

  const handleEmailChange = (event: ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event: ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handleNewUser = () => {
    setIsNewUser(!isNewUser);
  };

  const handleSubmit = (enteredEmail?: string, enteredPassword?: string) => {
    if (!enteredEmail || !enteredPassword) {
      return;
    }
    mutate({
      email: enteredEmail,
      password: enteredPassword,
      isNew: isNewUser,
    });
  };

  return {
    email,
    password,
    isNewUser,
    isPending,
    isError,
    handleEmailChange,
    handlePasswordChange,
    handleNewUser,
    handleSubmit,
  };
};
