import { useQuery } from "@tanstack/react-query";
import axiosInstance from "@/services/api/axiosInstance";
import { User } from "../type/auth.type";

/**
 * useAuthUser hook
 * ----------------
 * A custom React hook to fetch the authenticated user's info.
 * - Returns `data` (User object), `isLoading`, and `error`.
 * - Uses react-query for caching and automatic refetching.
 * - Should only be used in client-side components.
 */

export const useAuthUser = () => {
 return useQuery<User>({
    queryKey: ["user"],
    queryFn: async () => {
      const res = await axiosInstance.get("/auth/me");
      return res.data;
    },
  });
};
