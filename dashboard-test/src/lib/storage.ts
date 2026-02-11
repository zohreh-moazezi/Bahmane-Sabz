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
