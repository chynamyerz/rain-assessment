import { useSelector } from "react-redux";
import { useQuery } from "@tanstack/react-query";

import { RootState } from "@store/index";
import { Account } from "@store/types";
import { queryFnHelper } from "@utils/queryClientHelpers";

export const useDashBoard = () => {
  const { user } = useSelector((state: RootState) => state.user);

  /**
   *
   * Queries
   *
   */
  const { isPending, isError, data, error } = useQuery<{ account: Account }>({
    queryKey: ["Account"],
    queryFn: async () => {
      return queryFnHelper<{ account: Account }>("/account");
    },
  });

  /**
   *
   * Handlers
   *
   */

  const getBalance = (balance?: number) => {
    return `R${(balance || 0).toFixed(2)}`;
  };

  const getDueDate = (dueDate?: string) => {
    return dueDate ? new Date(dueDate).toDateString() : "NA";
  };

  return {
    account: data?.account,
    user,
    error,
    isError,
    isPending,
    getBalance,
    getDueDate,
  };
};
