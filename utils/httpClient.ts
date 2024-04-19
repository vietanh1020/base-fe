import axios from "axios";
import { getCookie } from "cookies-next";
import { signOut } from "next-auth/react";

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

  client.interceptors.response.use(async (response) => {
    if (response.status === 401)
      await signOut({ callbackUrl: "/auth/sign-in" });
    return response;
  });

  return client;
};
