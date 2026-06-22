"use server";

import { mealService } from "@/services/meal.service";
import { CreateMealPayload } from "@/types/meal/meal.types";

export const createMeal = async (payload: CreateMealPayload) => {
  const data = await mealService.createMeal(payload);
  return data;
};
