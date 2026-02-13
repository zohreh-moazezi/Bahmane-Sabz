import { useQuery } from "@tanstack/react-query";
import axiosInstance from "@/services/api/axiosInstance";

/**
 * useDashboardStates hook
 * -----------------------
 * Fetches multiple dashboard stats in one hook.
 * Returns queries for:
 *  - usersQuery
 *  - productsQuery
 * You can extend this later for posts, carts, etc.
 * Encapsulates react-query calls to keep Dashboard page clean.
 */

export const useDashboardStates = () => {
  const usersQuery = useQuery({
    queryKey: ["users", "dashboard"],
    queryFn: async () => {
      const res = await axiosInstance.get("/users?limit=5");
      return res.data;
    },
  });

  const productsQuery = useQuery({
    queryKey: ["products", "dashboard"],
    queryFn: async () => {
      const res = await axiosInstance.get("/products?limit=5");
      return res.data;
    },
  });

  return { usersQuery, productsQuery };
};
