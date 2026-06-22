import { Category } from "../category/category.type";

export type MealCategory =
  | "biryani-rice"
  | "curry"
  | "kebab-grill"
  | "fast-food"
  | "snacks"
  | "dessert"
  | "beverage"
  | "bakery"
  | "vegetarian"
  | "set-menu";

export interface MealFormData {
  name: string;
  category: Category | "";
  price: string;
  description: string;
  image: File | null;
}

export interface MealFormErrors {
  name?: string;
  category?: string;
  price?: string;
  description?: string;
  image?: string;
}