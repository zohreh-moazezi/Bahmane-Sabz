// Purpose
// Central API abstraction layer.

// Responsibilities

// Fetch entity list

// Add entity

// Update entity

// Delete entity

// Why important

// Keeps axios logic outside UI

// Makes API swappable

// Supports clean architecture

import axiosInstance from "@/services/api/axiosInstance";
import { BaseEntity, EntityListResponse } from "../types";

export const getEntities = async <T extends BaseEntity>(
  entity: string,
  limit: number,
  skip: number
): Promise<EntityListResponse<T>> => {
  const res = await axiosInstance.get(`/${entity}?limit=${limit}&skip=${skip}`);
  return {
    items: res.data.users || res.data.products,
    total: res.data.total,
    skip: res.data.skip,
    limit: res.data.limit,
  };
};

export const addEntity = async <T extends BaseEntity>(
  entity: string,
  data: Partial<T>
) => {
  const res = await axiosInstance.post(`/${entity}/add`, data);
  return res.data;
};

export const updateEntity = async <T extends BaseEntity>(
  entity: string,
  id: number,
  data: Partial<T>
) => {
  const res = await axiosInstance.put(`/${entity}/${id}`, data);
  return res.data;
};

export const deleteEntity = async (id: number, entity: string) => {
  const res = await axiosInstance.delete(`/${entity}/${id}`);
  return res.data;
};
