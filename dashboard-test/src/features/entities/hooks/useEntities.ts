// Purpose
// Generic data fetching hook for any entity.

// Responsibilities

// Fetch paginated data

// Cache results via React Query

// Keep previous data for smooth pagination

// Why important
// Centralized fetching logic for:

// users

// products

// future entities

import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { getEntities } from "../services/entityApi";
import { BaseEntity, EntityListResponse } from "../types";

export const useEntities = <T extends BaseEntity>(
  entity: string,
  limit: number,
  skip: number
) => {
  return useQuery<EntityListResponse<T>>({
    queryKey: [entity, limit, skip],
    queryFn: () => getEntities<T>(entity, limit, skip),
    placeholderData: keepPreviousData,
  });
};
