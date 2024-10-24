import axios from "axios";

const api = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL,
});

api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    const statusCode = error.response.status;

    // Check if access token expired
    if (statusCode && (statusCode === 403 || statusCode === 498)) {
      localStorage.removeItem("user");
      window.location.replace("/admin/login");
      return;
    }

    return Promise.reject(error);
  }
);

export default api;
