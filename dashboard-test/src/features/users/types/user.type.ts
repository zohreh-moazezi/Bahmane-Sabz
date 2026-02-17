/**
 * User type represents a single user in the system.
 */
export interface User {
  id: number;
  firstName: string;
  lastName: string;
  gender: string;
  email: string;
  image: string;
  username: string;
}
/**
 * UserResponse type represents paginated API response.
 */
export interface UserResponse {
  users: User[];
  total: number;
  skip: number;
  limit: number;
}
