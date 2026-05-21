import { authClient } from "@/lib/auth-client";

export const fetchProtected = async (url, options = {}) => {
  // token fetch from betterauth
  const { data: session } = await authClient.useSession();
  const token = session?.token; 

  const headers = {
    "Content-Type": "application/json",
    ...options.headers,
  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  return fetch(url, { ...options, headers });
};