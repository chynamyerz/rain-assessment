import { MutationFunction } from "@tanstack/react-query";
import axios, { AxiosResponse } from "axios";

export const queryFnHelper = async <T>(endpoint: string): Promise<T> => {
  const token = localStorage.getItem("token");
  const response = await axios.get(
    `${import.meta.env.VITE_API_URL}${endpoint}`,
    {
      headers: { Authorization: `Bearer ${token || ""}` },
    }
  );

  return await response.data.data;
};

export const mutationFnHelper = async <T>(
  endpoint: string,
  method: "post" | "put" | "delete",
  serviceInput?: T
): Promise<MutationFunction<AxiosResponse<any, any>, T> | undefined> => {
  const token = localStorage.getItem("token");

  return axios(`${import.meta.env.VITE_API_URL}${endpoint}`, {
    method,
    headers: { Authorization: `Bearer ${token || ""}` },
    data: serviceInput,
  });
};
