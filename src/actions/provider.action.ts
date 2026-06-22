"use server";

import { providerService } from "@/services/provider.service";

export const getProvider = async () => {
  return await providerService.getProvider();
};
