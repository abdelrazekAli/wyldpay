//this function will be called beforee render app to check that user account is still activated or not

import axios from "axios";

export const checkUser = async (userId: string) => {
  try {
    await axios.get(`/api/v1/users/${userId}`);
  } catch (err: any) {
    let statusCode = err.response.status;
    if (statusCode === 400) {
      localStorage.clear();
    }
  }
};
