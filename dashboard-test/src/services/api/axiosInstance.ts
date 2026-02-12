/**
 * Axios Instance Configuration
 *
 * Responsibilities:
 * - Set base URL
 * - Attach authentication token to requests
 * - Centralize HTTP config
 *
 * Benefits:
 * - Reusable across all API services
 * - Easy to add interceptors
 */
/**
 * Axios Instance Configuration
 *
 * Purpose:
 * - Centralized HTTP client
 * - Automatically attaches access token to requests
 * - Automatically refreshes token on 401 Unauthorized
 *
 * Why Interceptors?
 * - Avoid repeating Authorization headers everywhere
 * - Handle expired tokens globally
 * - Keep components clean from authentication logic
 *
 * Flow:
 * 1. Request interceptor → attaches accessToken
 * 2. Response interceptor → listens for 401 errors
 * 3. If 401 occurs → sends refresh request
 * 4. Saves new accessToken
 * 5. Retries original failed request
 */

import axios from "axios";
import { tokenStorage } from "@/lib/storage";

export const axiosInstance = axios.create({
  baseURL: "https://dummyjson.com",
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use((config) => {
  const token = tokenStorage.getToken();
  if (token) config.headers["Authorization"] = `Bearer ${token}`;
  return config;
});

axiosInstance.interceptors.response.use(
  (res) => res,
  async (error) => {
    const originalRequest = error.config;
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      const refreshToken = tokenStorage.getRefreshToken();

      if (refreshToken) {
        const response = await axiosInstance.post("/auth/refresh", {
          refreshToken:tokenStorage.getRefreshToken(),
        });
        tokenStorage.setToken(response.data.accessToken);

        originalRequest.headers[
          "Authorization"
        ] = `Bearer ${response.data.accessToken}`;
        return axiosInstance(originalRequest);
      }
    }
    return Promise.reject(error);
  }
);
export default axiosInstance;
