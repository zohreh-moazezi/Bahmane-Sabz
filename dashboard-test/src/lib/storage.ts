/**
 * Storage Utility
 *
 * Responsibilities:
 * - Save authentication token
 * - Retrieve token
 * - Remove token on logout
 *
 * Centralizing storage logic:
 * - Avoids duplication
 * - Makes future changes easier
 */

export const tokenStorage = {
  set(accessToken: string) {
    localStorage.setItem("accessToken", accessToken);
  },
  get() {
    return localStorage.getItem("accessToken");
  },
  remove() {
    localStorage.removeItem("accessToken");
  },
};
