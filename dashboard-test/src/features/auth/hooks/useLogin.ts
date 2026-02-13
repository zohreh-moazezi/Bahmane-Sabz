/**
 * useLogin Hook
 *
 * Responsibilities:
 * - Handle login API mutation using React Query
 * - Manage loading state
 * - Handle success & error scenarios
 *
 * Separation of concerns:
 * - Keeps components free from API logic
 * - Reusable across the app
 */

import { useMutation } from "@tanstack/react-query";
import { login } from "@/services/auth/auth.service";
import { tokenStorage } from "@/lib/storage";
import { useRouter } from "next/router";

export const useLogin = () => {
  const router = useRouter();

  return useMutation({
    mutationFn: login,
    onSuccess: (data) => {
      tokenStorage.setToken(data.accessToken);
      router.push("/dashboard");
      tokenStorage.setRefreshToken(data.refreshToken);
    },
  });
};
