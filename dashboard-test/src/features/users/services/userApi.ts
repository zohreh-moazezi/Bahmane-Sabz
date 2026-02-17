import axiosInstance from "@/services/api/axiosInstance";
import { UserResponse, User } from "../types/user.type";

export const getUsers = async (
  limit: number,
  skip: number
): Promise<UserResponse> => {
  const res = await axiosInstance.get(`/users?limit=${limit}&skip=${skip}`);
  return res.data;
};
/**
 * Add a new user (simulated on backend)
 */
export const addUser = async (user: Partial<User>) => {
  const res = await axiosInstance.post("/users/add", user);

  return res.data;
};
/**
 * Update an existing user (simulated on backend)
 */
export const updateUser = async (id: number, user: Partial<User>) => {
  const res = await axiosInstance.put(`/users/${id}`, user);
  return res.data;
};
/**
 * Delete a user (simulated on backend)
 */
export const deleteUser = async (id: number) => {
  const res = await axiosInstance.delete(`/users/${id}`);
  return res.data;
};
