import { authClient } from "@/lib/auth-client";
import { headers } from "next/headers";

export const fetchProtected = async (url, options = {}) => {
  const token = await authClient.getToken({
    headers: await headers(),
  });

  const headersObj = {
    "Content-Type": "application/json",
    ...options.headers,
  };

  if (token) {
    headersObj["Authorization"] = `Bearer ${token}`;
  }

  return fetch(url, {
    ...options,
    headers: headersObj,
  });
};