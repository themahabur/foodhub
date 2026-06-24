import { env } from "@/env";
import { CreateMealPayload } from "@/types/meal/meal.types";
import { cookies } from "next/headers";

const getMeals = async () => {
  try {
    const cookieStore = await cookies();
    const response = await fetch(
      `${env.NEXT_PUBLIC_BACKEND_URL}/api/v1/meals`,
      {
        headers: {
          "Content-Type": "application/json",
          Cookie: cookieStore.toString(),
        },
      },
    );
    const meals = await response.json();
    return meals;
  } catch (error) {}
};

const getMeal = async () => {
  const response = await fetch(`${env.NEXT_PUBLIC_BACKEND_URL}/api/v1/meals`);
  const meal = await response.json();
  return meal;
};

const createMeal = async (payload: CreateMealPayload) => {
  try {
    const cookieStore = await cookies();

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
