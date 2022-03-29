import axios from "axios";

import jwt_decode from "jwt-decode";

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

export const decodeJWT = (jwt) => {
  return jwt_decode(jwt);
};

export const storage = {
  getToken: () => {
    if (typeof window !== "undefined") return localStorage.getItem("token");
  },
  setToken: (token) => {
    if (typeof window !== "undefined") localStorage.setItem("token", token);
  },
  clearToken: () => {
    if (typeof window !== "undefined") localStorage.removeItem("token");
  },
};

export const getInitials = (name = "") =>
  name
    .replace(/\s+/, " ")
    .split(" ")
    .slice(0, 2)
    .map((v) => v && v[0].toUpperCase())
    .join("");

export const capitalizeName = (name = "") =>
  name
    .split(" ")
    .map((v) => v.toLowerCase())
    .map((v) => v[0].toUpperCase() + v.slice(1))
    .join(" ");
