export type Meal = {
  id: number;
  name: string;
  restaurant: string;
  category: string;
  rating: number;
  price: number;
  deliveryTime: string;
  image: string;
  isVeg: boolean;
  tags: string[];
};

export type SortValue =
  | "relevance"
  | "rating"
  | "price_asc"
  | "price_desc"
  | "delivery";