import axios from "axios";

export const checkUser = async (userId: string) => {
  try {
    await axios.get(`${process.env.REACT_APP_API_VERSION!}/users/${userId}`);
  } catch (err: any) {
    let statusCode = err.response.status;
    if (statusCode === 404) {
      localStorage.clear();
      window.location.replace("/admin/login");
    }
  }
};
