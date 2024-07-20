import axios from "axios";

export const queryFnWrapper = async <T>(endpoint: string): Promise<T> => {
  const token = localStorage.getItem("token");
  const response = await axios(`${import.meta.env.VITE_API_URL}${endpoint}`, {
    headers: { Authorization: `Bearer ${token || ""}` },
  });

  return await response.data.data;
};
