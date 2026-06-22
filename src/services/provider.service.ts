import { env } from "@/env";
import { cookies } from "next/headers";

const getProviders = async () => {
  const response = await fetch(`${env.NEXT_PUBLIC_BACKEND_URL}/api/v1/providers`);
  const providers = await response.json();
  return providers;
};


const getProvider = async () => {
 try {
  
  const cookieStore = await cookies();
  const res = await fetch(`${env.NEXT_PUBLIC_BACKEND_URL}/api/v1/providers`, {
    headers: {
      "Content-Type": "application/json",
      Cookie: cookieStore.toString(),
    },
  });
  const provider = await res.json();

  return provider;

 } catch (error) {

  return error;
  
 }
};


export const providerService = {
  getProviders,
  getProvider
};
