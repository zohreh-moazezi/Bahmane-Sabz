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

import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: "https://dummyjson.com",
  headers: {
    "Content-Type": "application/json",
  },
});
