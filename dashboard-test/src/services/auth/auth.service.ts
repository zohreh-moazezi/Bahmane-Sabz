import { axiosInstance } from "@/services/api/axiosInstance";
import { LoginRequest, LoginResponse } from "@/features/auth/auth.type";

export const login = async (data: LoginRequest): Promise<LoginResponse> => {
  try {
    const res = axiosInstance.post("/auth/login", data);
    return (await res).data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "Login Failed");
  }
};
