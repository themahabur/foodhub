export type Restaurant = {
  id: number;
  name: string;
  cuisines: string[];
  category: string;
  rating: number;
  deliveryTime: string;
  minOrder: number;
  image: string;
  logo: string;
  initial: string;
  color: string;
  tags: string[];
  isOpen: boolean;
  location: string;
};

export type RestaurantSortValue =
  | "relevance"
  | "rating"
  | "delivery"
  | "order_asc";