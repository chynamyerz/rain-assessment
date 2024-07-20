import { useQuery } from "@tanstack/react-query";
import { useDispatch } from "react-redux";

import { setUser } from "@store/user/userSlice";
import { queryFnHelper } from "@utils/queryClientHelpers";
import { User } from "@store/user/types";

export const useApp = () => {
  const { isPending, isError, data, error, isSuccess } = useQuery<{
    user: User;
  }>({
    queryKey: ["User"],
    queryFn: async () => {
      return queryFnHelper<{ user: User }>("/auth");
    },
  });
  const dispatch = useDispatch();

  if (isSuccess) {
    dispatch(setUser(data.user));
  }

  return { user: data?.user, error, isError, isPending };
};
