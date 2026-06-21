import type { BusinessHours, RestaurantSettings } from "@/types/restaurant";

/**
 * Selectable cuisine type suggestions shown as quick-add chips
 * in the Cuisine Types section.
 */
export const CUISINE_OPTIONS = [
  "Bangladeshi",
  "Biryani",
  "Chinese",
  "Fast Food",
  "Thai",
  "Indian",
  "Italian",
  "Desserts",
  "Beverages",
  "Bakery",
  "Seafood",
  "BBQ",
] as const;

/**
 * Default weekly business hours used when a provider hasn't
 * set their own hours yet.
 */
export const DEFAULT_BUSINESS_HOURS: BusinessHours[] = [
  { day: "Saturday", hours: "10:00 AM - 11:00 PM" },
  { day: "Sunday", hours: "10:00 AM - 11:00 PM" },
  { day: "Monday", hours: "10:00 AM - 11:00 PM" },
  { day: "Tuesday", hours: "10:00 AM - 11:00 PM" },
  { day: "Wednesday", hours: "10:00 AM - 11:00 PM" },
  { day: "Thursday", hours: "10:00 AM - 11:00 PM" },
  { day: "Friday", hours: "2:00 PM - 11:00 PM" },
];

/**
 * Empty initial state for the Restaurant settings form.
 * Replace with data fetched from the DB once a backend is wired up
 * (e.g. const data = await getRestaurantSettings(providerId)).
 */
export const INITIAL_RESTAURANT_SETTINGS: RestaurantSettings = {
  name: "",
  description: "",
  coverImage: null,
  logo: null,
  businessHours: DEFAULT_BUSINESS_HOURS,
  deliveryAreas: [],
  deliveryRadius: "",
  cuisineTypes: [],
  phone: "",
  email: "",
  address: "",
  city: "",
};

/**
 * Sample/mock restaurant data — useful for previewing the form
 * pre-filled, or for demo/storybook purposes. Not used by default.
 */
export const MOCK_RESTAURANT_SETTINGS: RestaurantSettings = {
  name: "Rajshahi Biryani House",
  description:
    "Authentic Kacchi Biryani and traditional Bangladeshi dishes, made fresh daily with locally sourced spices.",
  coverImage: null,
  logo: null,
  businessHours: DEFAULT_BUSINESS_HOURS,
  deliveryAreas: ["Shaheb Bazar", "Boalia", "Rajshahi University Area"],
  deliveryRadius: "5",
  cuisineTypes: ["Bangladeshi", "Biryani"],
  phone: "01712345678",
  email: "contact@rajshahibiryanihouse.com",
  address: "House 12, Road 3, Shaheb Bazar",
  city: "Rajshahi",
};