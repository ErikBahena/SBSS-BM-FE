import axios from "axios";
import { BACKEND_URL } from "src/config";

export const axiosWithAuth = () => {
  const token = localStorage.getItem("token");

  return axios.create({
    headers: {
      authorization: token,
    },
    baseURL: BACKEND_URL,
  });
};
