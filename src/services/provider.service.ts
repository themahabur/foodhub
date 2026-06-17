import { env } from "@/env";

const getProviders = async () => {
  const response = await fetch(`${env.NEXT_PUBLIC_BACKEND_URL}/api/v1/providers`);
  const providers = await response.json();
  return providers;
};

export const providerService = {
  getProviders,
};
