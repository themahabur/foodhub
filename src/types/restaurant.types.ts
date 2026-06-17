import { Meal } from "./meal.types";

export type ProviderProfile = {
  id: string;
  userId: string;
  businessName: string;
  logo?: string;
  banner?: string;
  description: string;
  cuisines: string[];
  deliveryTime: string;
  address: string;
  minOrder: number;
  rating: number;
  isOpen: boolean;
  category: string;
  tags: string[];
  meals: Meal[];
};

export type RestaurantSortValue =
  | "relevance"
  | "rating"
  | "delivery"
  | "order_asc";
