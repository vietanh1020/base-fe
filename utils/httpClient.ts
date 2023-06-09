import axios from "axios";
import { Session } from "next-auth";
import { getSession } from "next-auth/react";

export const httpClient = () => {
  const client = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000/api",
    withCredentials: true,
    headers: {
      Accept: "application/json, text/plain, */*",
      "Content-Type": "application/json",
    },
  });

  client.interceptors.request.use(async (request) => {
    const session = (await getSession()) as Session;

    if (session) {
      request.headers["Authorization"] = `Bearer ${session.user.accessToken}`;
    }
    return request;
  });

  return client;
};
