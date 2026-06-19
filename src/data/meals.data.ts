import { Meal } from "@/types/meal.types";
import { Provider } from "@/types/provider.type";



// Mock data — swap for a real fetch (DB/API) once the backend is wired up.
const PROVIDER: Provider = {
  id: "provider-1",
  businessName: "Rajshahi Bites",
  logo: "/images/providers/rajshahi-bites.jpg",
  rating: 4.7,
};

export const MEALS: Meal[] = [
  {
    id: "meal-1",
    providerId: PROVIDER.id,
    categoryId: "biryani-rice",
    title: "Kacchi Biryani",
    description:
      "Slow-cooked basmati rice layered with tender mutton and aromatic spices.",
    image: "/meal-biryani.jpg",
    price: "380.00",
    stock: 25,
    isAvailable: true,
    preparationTime: 40,
    rating: 4.8,
    createdAt: "2026-05-02T10:00:00.000Z",
    updatedAt: "2026-06-12T09:15:00.000Z",
    provider: PROVIDER,
  },
  {
    id: "meal-2",
    providerId: PROVIDER.id,
    categoryId: "kebab-grill",
    title: "Chicken Tikka Kebab",
    description:
      "Char-grilled chicken skewers marinated overnight in yogurt and tikka spices.",
    image: "/meal-biryani.jpg",
    price: "250.00",
    stock: 40,
    isAvailable: true,
    preparationTime: 25,
    rating: 4.6,
    createdAt: "2026-05-04T11:30:00.000Z",
    updatedAt: "2026-06-08T13:00:00.000Z",
    provider: PROVIDER,
  },
  {
    id: "meal-3",
    providerId: PROVIDER.id,
    categoryId: "curry",
    title: "Beef Bhuna",
    description:
      "Rich, slow-simmered beef curry cooked down to a thick, spiced gravy.",
    image: "/meal-biryani.jpg",
    price: "320.00",
    stock: 18,
    isAvailable: true,
    preparationTime: 45,
    rating: 4.7,
    createdAt: "2026-05-10T08:00:00.000Z",
    updatedAt: "2026-06-15T07:45:00.000Z",
    provider: PROVIDER,
  },
  {
    id: "meal-4",
    providerId: PROVIDER.id,
    categoryId: "snacks",
    title: "Singara (6 pcs)",
    description:
      "Crispy pastry filled with spiced potato and peanuts, fried golden.",
    image: "/meal-biryani.jpg",
    price: "60.00",
    stock: 0,
    isAvailable: false,
    preparationTime: 15,
    rating: 4.4,
    createdAt: "2026-05-12T06:00:00.000Z",
    updatedAt: "2026-06-17T05:30:00.000Z",
    provider: PROVIDER,
  },
  {
    id: "meal-5",
    providerId: PROVIDER.id,
    categoryId: "dessert",
    title: "Mishti Doi",
    description:
      "Traditional sweetened yogurt, set in clay pots for that classic taste.",
    image: "/meal-biryani.jpg",
    price: "80.00",
    stock: 30,
    isAvailable: true,
    preparationTime: 10,
    rating: 4.9,
    createdAt: "2026-05-15T09:00:00.000Z",
    updatedAt: "2026-06-11T10:20:00.000Z",
    provider: PROVIDER,
  },
  {
    id: "meal-6",
    providerId: PROVIDER.id,
    categoryId: "beverage",
    title: "Borhani",
    description:
      "A tangy, spiced yogurt drink served chilled — the perfect biryani companion.",
    image: "/meal-biryani.jpg",
    price: "50.00",
    stock: 50,
    isAvailable: true,
    preparationTime: 5,
    rating: 4.5,
    createdAt: "2026-05-18T12:00:00.000Z",
    updatedAt: "2026-06-09T14:10:00.000Z",
    provider: PROVIDER,
  },
];