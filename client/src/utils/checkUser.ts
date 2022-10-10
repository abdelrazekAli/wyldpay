import axios from "axios";

export const checkUser = async (userId: string) => {
  try {
    console.log("check user render");
    await axios.get(`/api/v1/users/${userId}`);
  } catch (err: any) {
    let statusCode = err.response.status;
    if (statusCode === 400) {
      localStorage.clear();
      window.location.replace("/admin/login");
    }
  }
};
