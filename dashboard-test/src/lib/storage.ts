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
  setToken(accessToken: string) {
    localStorage.setItem("accessToken", accessToken);
  },
  getToken() {
    return localStorage.getItem("accessToken");
  },
  removeToken() {
    localStorage.removeItem("accessToken");
  },
  setRefreshToken(refreshToken:string){
    localStorage.setItem("refreshToken",refreshToken)
  },
  getRefreshToken(){
    return localStorage.getItem("refreshToken")
  }

};
