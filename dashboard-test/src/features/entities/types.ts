// Purpose
// Shared type contracts.

// Core idea
// All entities extend:

// BaseEntity {
//   id: number
// }

// Then:

// User extends BaseEntity
// Product extends BaseEntity

// Benefit
// Generic components can work with any entity safely.

export interface BaseEntity {
  id: number;
}

export interface EntityListResponse<T extends BaseEntity> {
  items: T[];
  total: number;
  skip: number;
  limit: number;
}

export interface User extends BaseEntity {
  firstName: string;
  lastName: string;
  email: string;
  gender: string;
  username: string;
  image: string;
}

export interface Product extends BaseEntity {
  title: string;
  price: number;
  category: string;
  brand: string;
  image: string;
}
