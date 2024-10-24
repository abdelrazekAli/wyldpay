import api from "./API";
import { Method } from "axios";

export const fetchData = async <T>(
  url: string,
  accessToken: string,
  setData: (data: T) => void,
  setError: (error: string | null) => void,
  setIsLoading: (isLoading: boolean) => void,
  method: Method = "GET",
  body?: any
) => {
  setIsLoading(true);
  try {
    const config = {
      method,
      url,
      headers: { "auth-token": accessToken },
      data: body ? body : undefined,
    };
    const res = await api(config);
    setData(res.data);
  } catch (err) {
    console.error(`Error during ${method} request to ${url}:`, err);
    setError(`Something went wrong`);
  } finally {
    setIsLoading(false);
  }
};
