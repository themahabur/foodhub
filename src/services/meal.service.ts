import { env } from "@/env";

const getMeals = async () => {
  const response = await fetch(`${env.NEXT_PUBLIC_BACKEND_URL}/api/v1/meals`);
  const meals = await response.json();
  return meals;
};

export const mealService = {
  getMeals,
};
