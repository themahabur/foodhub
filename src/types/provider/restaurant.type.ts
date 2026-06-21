export interface BusinessHours {
  day: string;
  hours: string; // e.g. "9:00 AM - 11:00 PM" or "Closed"
}

export interface RestaurantSettings {
  // Restaurant Information
  name: string;
  description: string;

  // Images
  coverImage: string | null; // preview URL (object URL)
  logo: string | null; // preview URL (object URL)

  // Business Hours
  businessHours: BusinessHours[];

  // Delivery Area
  deliveryAreas: string[];
  deliveryRadius: string;

  // Cuisine Types
  cuisineTypes: string[];

  // Contact Information
  phone: string;
  email: string;
  address: string;
  city: string;
}

export type Review = {
  id: string;
  customerName: string;
  rating: number; // 1-5
  comment: string;
  mealName: string;
  createdAt: string; // ISO date
};