// useUsers hook fetches paginated users.

import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { getUsers } from "../services/userApi";
import { UserResponse } from "../types/user.type";

export const useUsers = (limit: number, skip: number) => {
  return useQuery<UserResponse>({
    queryKey: ["users", limit, skip],
    queryFn: () => getUsers(limit, skip),
    placeholderData: keepPreviousData,
  });
};
