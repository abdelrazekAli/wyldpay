import api from "./API";

export const checkUser = async (userId: string) => {
  try {
    await api.get(`/users/${userId}`);
  } catch (err: any) {
    let statusCode = err.response.status;
    if (statusCode === 404) {
      localStorage.clear();
      window.location.replace("/admin/login");
    }
  }
};
