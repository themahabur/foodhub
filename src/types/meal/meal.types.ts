import { Category } from "../category/category.type";
import { Provider } from "../provider/provider.type";

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

export type Meal = {
  id: string;
  providerId: string;
  categoryId: string;
  title: string;
  description: string;
  image: string;
  price: string;
  stock: number;
  isAvailable: boolean;
  preparationTime: number;
  rating: number;
  createdAt: string;
  updatedAt: string;
  provider: Provider;
  category: Category;
};

export type CreateMealPayload = {
  categoryId: string;
  title: string;
  description: string;
  image: string;
  price: number;
  stock: number;
  isAvailable: boolean;
  preparationTime: number;
  rating: number;
};

export interface MealFormData {
  name: string;
  category: MealCategory | "";
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

export type SortValue =
  | "relevance"
  | "rating"
  | "price_asc"
  | "price_desc"
  | "delivery";