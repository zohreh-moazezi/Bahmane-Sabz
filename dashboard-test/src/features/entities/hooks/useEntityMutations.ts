// Purpose
// Handles Add / Update / Delete operations for all entities.

// Key Features

// Optimistic updates

// Cache manipulation

// Toast notifications

// Error rollback

// Architecture Advantage
// One mutation system powers:

// Users CRUD

// Products CRUD

// Future entities

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addEntity, updateEntity, deleteEntity } from "../services/entityApi";
import { useToast } from "@chakra-ui/react";
import { BaseEntity } from "../types";

export const useEntityMutations = <T extends BaseEntity>(entity: string) => {
  const queryClient = useQueryClient();
  const toast = useToast();

  const addMuation = useMutation({
    mutationFn: (data: Partial<T>) => addEntity<T>(entity, data),
    onMutate: async (newItem: Partial<T>) => {
      await queryClient.cancelQueries({ queryKey: ["items"] });
      const previous = queryClient.getQueriesData({ queryKey: ["items"] });
      queryClient.setQueriesData({ queryKey: ["items"] }, (old: any) => {
        if (!old) return old;
        console.log(old);
        return {
          ...old,
          items: [{ ...newItem, id: Date.now() }, ...old.items],
        };
      });
      return [previous];
    },
    onError: (_err, _newErr, context: any) => {
      context?.previous?.forEach(([key, data]: any) => {
        queryClient.setQueryData(key, data);
      });
    },
    onSuccess: () => {
      console.log("Mutation success");
      queryClient.invalidateQueries({ queryKey: ["items"] });
      toast({
        title: "Item Added successfully",
        status: "success",
        duration: 2000,
        isClosable: true,
      });
    },
  });
  const updateMuation = useMutation({
    mutationFn: ({ id, data }: { id: number; data: Partial<T> }) =>
      updateEntity<T>(entity, id, data),
    onMutate: async ({ id, data }) => {
      await queryClient.cancelQueries({ queryKey: ["items"] });
      const previous = queryClient.getQueriesData({ queryKey: ["items"] });
      queryClient.setQueriesData({ queryKey: ["items"] }, (old: any) => {
        if (!old) return old;
        console.log(old);
        return {
          ...old,
          items: old.items.map((item: BaseEntity) =>
            item.id === id ? { ...item, ...data } : item
          ),
        };
      });
      return [previous];
    },
    onError: (_err, _newErr, context: any) => {
      context?.previous?.forEach(([key, data]: any) => {
        queryClient.setQueryData(key, data);
      });
    },
    onSuccess: () => {
      console.log("Mutation success");
      queryClient.invalidateQueries({ queryKey: ["items"] });
      toast({
        title: "Item updated successfully",
        status: "success",
        duration: 2000,
        isClosable: true,
      });
    },
  });
  const deleteMutation = useMutation({
    mutationFn: (id: number) => deleteEntity(id, entity),
    onMutate: async (id: number) => {
      await queryClient.cancelQueries({ queryKey: ["items"] });
      const previous = queryClient.getQueriesData({ queryKey: ["items"] });
      queryClient.setQueriesData({ queryKey: ["items"] }, (old: any) => {
        if (!old) return old;
        console.log(old);
        return {
          ...old,
          items: old.items.filter((item: BaseEntity) => item.id !== id),
        };
      });
      return [previous];
    },
    onError: (_err, _newErr, context: any) => {
      context?.previous?.forEach(([key, data]: any) => {
        queryClient.setQueryData(key, data);
      });
    },
    onSuccess: () => {
      console.log("Mutation success");
      queryClient.invalidateQueries({ queryKey: ["items"] });
      toast({
        title: "Item deleted successfully",
        status: "info",
        duration: 2000,
        isClosable: true,
      });
    },
  });

  return { addMuation, updateMuation, deleteMutation };
};
