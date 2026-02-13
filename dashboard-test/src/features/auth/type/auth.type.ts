/**
 * Authentication related TypeScript types
 *
 * Purpose:
 * - Define shared types for login data
 * - Ensure type safety across:
 *   - Forms
 *   - API services
 *   - Hooks
 */

export interface LoginRequest {
  username: string;
  password: string;
}

export interface LoginResponse {
  id: number;
  username: string;
  accessToken: string;
  refreshToken: string;
}

export interface User {
  id: number;
  username: string;
  email: string;
  firstName: string;
  lasName: string;
  gender: string;
  image: string;
}
