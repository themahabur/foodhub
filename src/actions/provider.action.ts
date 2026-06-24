"use server";

import { ProviderSettings } from "@/components/modules/dashboard/provider/restaurant/restaurant-settings-form";
import { providerService } from "@/services/provider.service";

export const getProvider = async () => {
  return await providerService.getProvider();
};

export const createProvider = async (value: ProviderSettings) => {
  return await providerService.createProvider(value);
};
