import axios from "axios";
import { getCookie } from "cookies-next";

export const httpClient = () => {
  const client = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:3003/api",
    withCredentials: true,
    headers: {
      Accept: "application/json, text/plain, */*",
      "Content-Type": "application/json",
      ztoken: getCookie("ztoken"),
    },
  });

  return client;
};
