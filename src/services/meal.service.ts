import { env } from "@/env";
import { CreateMealPayload } from "@/types/meal/meal.types";
import { cookies } from "next/headers";

const getMeals = async () => {
  const response = await fetch(`${env.NEXT_PUBLIC_BACKEND_URL}/api/v1/meals`);
  const meals = await response.json();
  return meals;
};

const createMeal = async (payload: CreateMealPayload) => {
  try {
    const cookieStore = await cookies();

    console.log(cookieStore);

    const res = await fetch(`${env.NEXT_PUBLIC_API_URL}/meals`, {
      headers: {
        "Content-Type": "application/json",
        Cookie: cookieStore.toString(),
      },
      method: "POST",
      body: JSON.stringify(payload),
    });

    const mealData = await res.json();

    if (!mealData.success) {
      return { success: false, data: null, error: mealData.message };
    }

    return { success: true, data: mealData, error: null };
  } catch (error) {
    return { success: false, data: null, error: error };
  }
};

export const mealService = {
  getMeals,
  createMeal,
};
