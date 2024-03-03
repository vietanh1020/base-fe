import axios from "axios";

export const httpClient = () => {
  const client = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:3003/api",
    withCredentials: true,
    headers: {
      Accept: "application/json, text/plain, */*",
      "Content-Type": "application/json",
    },
  });

  return client;
};
