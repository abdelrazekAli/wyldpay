import axios from "axios";

const axiosInterceptor = axios.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Check if access token expired
    if (error.response.status === 401 || error.response.status === 403) {
      localStorage.removeItem("user");
      window.location.replace("/admin/login");
      return;
    }

    return Promise.reject(error);
  }
);

export default axiosInterceptor;
