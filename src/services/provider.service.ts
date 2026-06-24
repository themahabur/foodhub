import { ProviderSettings } from "@/components/modules/dashboard/provider/restaurant/restaurant-settings-form";
import { env } from "@/env";
import { Provider } from "@/types/provider/provider.type";
import { cookies } from "next/headers";

const getProviders = async () => {
  const response = await fetch(`${env.NEXT_PUBLIC_BACKEND_URL}/api/v1/providers/all`);
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

const createProvider = async (payload: ProviderSettings) => {
  try {
    const cookieStore = await cookies();
    const res = await fetch(`${env.NEXT_PUBLIC_BACKEND_URL}/api/v1/providers`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Cookie: cookieStore.toString(),
      },
      body: JSON.stringify(payload),
    });
    const provider = await res.json();
    return provider;
  } catch (error) {
    return error;
  }
};


export const providerService = {
  getProviders,
  getProvider,
  createProvider
};
