import { useMutation } from "@tanstack/react-query";
import { login } from "@/services/auth/auth.service";
import { tokenStorage } from "@/lib/storage";
import { useRouter } from "next/router";

export const useLogin = () => {
  const router = useRouter();

  return useMutation({
    mutationFn: login,
    onSuccess: (data) => {
      tokenStorage.set(data.token);
      router.push("/dashboard");
    },
  });
};
