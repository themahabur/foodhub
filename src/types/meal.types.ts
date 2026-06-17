import { Provider } from "./provider.type";

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
  provider:Provider
};

export type SortValue =
  | "relevance"
  | "rating"
  | "price_asc"
  | "price_desc"
  | "delivery";