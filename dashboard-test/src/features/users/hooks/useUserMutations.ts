/**
 * useUserMutations hook handles CRUD mutations for users.
 * Provides add, update, and delete mutation functions.
 */
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addUser, updateUser, deleteUser } from "../services/userApi";
import { useToast } from "@chakra-ui/react";
import { User } from "../types/user.type";

export const useUserMutations = () => {
  const queryClient = useQueryClient();
  const toast = useToast();

  const addMutation = useMutation({
    mutationFn: addUser,
    onMutate: async (newUser: Partial<User>) => {
      await queryClient.cancelQueries({ queryKey: ["users"] });
      const previous = queryClient.getQueriesData({ queryKey: ["users"] });
      queryClient.setQueriesData({ queryKey: ["users"] }, (old: any) => {
        if (!old) return old;
        return {
          ...old,
          users: [{ ...newUser, id: Date.now() }, ...old.users],
        };
      });
      return [previous];
    },
    onError: (_err, _newUser, context: any) => {
      context?.previous?.forEach(([key, data]: any) => {
        queryClient.setQueryData(key, data);
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      toast({
        title: "User added successfully",
        status: "success",
        duration: 2000,
        isClosable: true,
      });
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: number; data: Partial<User> }) =>
      updateUser(id, data),
    onMutate: async ({ id, data }) => {
      await queryClient.cancelQueries({ queryKey: ["users"] });

      const previous = queryClient.getQueriesData({ queryKey: ["users"] });

      queryClient.setQueriesData({ queryKey: ["users"] }, (old: any) => {
        if (!old) return old;

        return {
          ...old,
          users: old.users.map((user: User) =>
            user.id === id ? { ...user, ...data } : user
          ),
        };
      });

      return { previous };
    },
    onError: (_err, _vars, context: any) => {
      context?.previous?.forEach(([key, data]: any) => {
        queryClient.setQueryData(key, data);
      });
    },

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      toast({
        title: "User updated successfully",
        status: "success",
        duration: 2000,
        isClosable: true,
      });
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: deleteUser,

    onMutate: async (id: number) => {
      await queryClient.cancelQueries({ queryKey: ["users"] });

      const previous = queryClient.getQueriesData({ queryKey: ["users"] });

      queryClient.setQueriesData({ queryKey: ["users"] }, (old: any) => {
        if (!old) return old;

        return {
          ...old,
          users: old.users.filter((user: User) => user.id !== id),
        };
      });

      return { previous };
    },

    onError: (_err, _id, context: any) => {
      context?.previous?.forEach(([key, data]: any) => {
        queryClient.setQueryData(key, data);
      });
    },

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      toast({
        title: "User deleted successfully",
        status: "success",
        duration: 2000,
        isClosable: true,
      });
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });

  return {
    addMutation,
    updateMutation,
    deleteMutation,
  };
};
