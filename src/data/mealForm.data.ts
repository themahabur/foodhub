import { MealCategory } from "@/types/mealForm.type";


export const MEAL_CATEGORIES: { value: MealCategory; label: string }[] = [
  { value: "biryani-rice", label: "Biryani & Rice" },
  { value: "curry", label: "Curry" },
  { value: "kebab-grill", label: "Kebab & Grill" },
  { value: "fast-food", label: "Fast Food" },
  { value: "snacks", label: "Snacks" },
  { value: "dessert", label: "Dessert" },
  { value: "beverage", label: "Beverage" },
  { value: "bakery", label: "Bakery & Bread" },
  { value: "vegetarian", label: "Vegetarian" },
  { value: "set-menu", label: "Set Menu" },
];

export const DESCRIPTION_MAX_LENGTH = 300;

export const MAX_IMAGE_SIZE_MB = 5;

export const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/png", "image/webp"];