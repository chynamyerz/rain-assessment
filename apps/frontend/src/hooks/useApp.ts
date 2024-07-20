import { useQuery } from "@tanstack/react-query";
import { useDispatch } from "react-redux";

import { User } from "@store/types";
import { setUser } from "@store/user/userSlice";
import { queryFnWrapper } from "@utils/queryHelper";

export const useApp = () => {
  const { isPending, isError, data, error, isSuccess } = useQuery<{
    user: User;
  }>({
    queryKey: ["User"],
    queryFn: async () => {
      return queryFnWrapper<{ user: User }>("/auth");
    },
  });
  const dispatch = useDispatch();

  if (isSuccess) {
    dispatch(setUser(data.user));
  }

  return { user: data?.user, error, isError, isPending };
};
