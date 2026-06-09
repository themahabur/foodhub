import { Role, RoleMenuItem } from "@/types/navbar.types";
import {
  User,
  ShoppingBag,
  Heart,
  Settings,
  LayoutDashboard,
  Package,
  DollarSign,
  ShieldCheck,
  Users,
  Flag,
} from "lucide-react";

export const IS_LOGGED_IN: boolean = true; // ✅ Login state change করে test করো

// ✅ Role change করে test করো
export const CURRENT_ROLE: Role = "customer";

export const roleLabels: Record<Role, string> = {
  customer: "Customer",
  provider: "Provider",
  admin: "Admin",
};

export const roleMenus: Record<Role, RoleMenuItem[]> = {
  customer: [
    { title: "Profile", url: "/profile", icon: User },
    { title: "Orders", url: "/orders", icon: ShoppingBag },
    { title: "Wishlist", url: "/wishlist", icon: Heart },
    { title: "Settings", url: "/settings", icon: Settings },
  ],
  provider: [
    { title: "Dashboard", url: "/provider/dashboard", icon: LayoutDashboard },
    { title: "My Offers / Products", url: "/provider/products", icon: Package },
    { title: "Orders Received", url: "/provider/orders", icon: ShoppingBag },
    { title: "Earnings", url: "/provider/earnings", icon: DollarSign },
    { title: "Settings", url: "/provider/settings", icon: Settings },
  ],
  admin: [
    { title: "Admin Dashboard", url: "/admin/dashboard", icon: ShieldCheck },
    { title: "Users Management", url: "/admin/users", icon: Users },
    { title: "Offers Moderation", url: "/admin/moderation", icon: Flag },
    { title: "Reports", url: "/admin/reports", icon: LayoutDashboard },
    { title: "Settings", url: "/admin/settings", icon: Settings },
  ],
};

export const DEFAULT_MENU: { title: string; url: string }[] = [
  { title: "Home", url: "/" },
  { title: "Explore", url: "/explore" },
  { title: "Restaurants", url: "/restaurants" },
  { title: "Offers", url: "/offers" },
];

export const DEFAULT_CITIES: string[] = [
  "Kolkata",
  "Dhaka",
  "Mumbai",
  "Delhi",
  "Bangalore",
];

export const DEFAULT_LOGO = {
  url: "/",
  src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/logos/shadcnblockscom-icon.svg",
  alt: "logo",
};

export const floatingFoods = [
  {
    id: 1,
    src: "/burger.png",
    alt: "Burger",
    shape: "rounded-2xl",
    size: "w-44 h-44",
    position: "top-0 left-8",
    delay: "0s",
    rotate: "-rotate-6",
    zIndex: "z-10",
  },
  {
    id: 2,
    src: "/bowl.png",
    alt: "Salad Bowl",
    shape: "rounded-full",
    size: "w-40 h-40",
    position: "top-0 right-0",
    delay: "0.4s",
    rotate: "rotate-3",
    zIndex: "z-10",
  },
  {
    id: 3,
    src: "/pizza.png",
    alt: "Pizza",
    shape: "rounded-full",
    size: "w-48 h-48",
    position: "bottom-4 left-0",
    delay: "0.8s",
    rotate: "rotate-6",
    zIndex: "z-10",
  },
  {
    id: 4,
    src: "/drink.png",
    alt: "Drink",
    shape: "rounded-2xl",
    size: "w-36 h-36",
    position: "bottom-4 right-8",
    delay: "1.2s",
    rotate: "-rotate-3",
    zIndex: "z-10",
  },
];

export const categories = [
  {
    id: 1,
    name: "Pizza",
    icon: "🍕",
    bg: "bg-red-50",
    iconBg: "bg-red-100",
    color: "text-red-500",
    href: "/category/pizza",
  },
  {
    id: 2,
    name: "Burger",
    icon: "🍔",
    bg: "bg-amber-50",
    iconBg: "bg-amber-100",
    color: "text-amber-500",
    href: "/category/burger",
  },
  {
    id: 3,
    name: "Bengali",
    icon: "🍛",
    bg: "bg-orange-50",
    iconBg: "bg-orange-100",
    color: "text-orange-500",
    href: "/category/bengali",
  },
  {
    id: 4,
    name: "Healthy",
    icon: "🥗",
    bg: "bg-green-50",
    iconBg: "bg-green-100",
    color: "text-green-500",
    href: "/category/healthy",
  },
  {
    id: 5,
    name: "Asian",
    icon: "🍜",
    bg: "bg-rose-50",
    iconBg: "bg-rose-100",
    color: "text-rose-500",
    href: "/category/asian",
  },
  {
    id: 6,
    name: "Desserts",
    icon: "🎂",
    bg: "bg-pink-50",
    iconBg: "bg-pink-100",
    color: "text-pink-500",
    href: "/category/desserts",
  },
];

export const meals = [
  {
    id: 1,
    name: "Farmhouse Pizza",
    restaurant: "La Pizzeria",
    rating: 4.6,
    price: 349,
    image: "/meal-pizza.jpg",
    href: "/meals/farmhouse-pizza",
  },
  {
    id: 2,
    name: "Classic Chicken Burger",
    restaurant: "Burger House",
    rating: 4.5,
    price: 189,
    image: "/meal-burger.jpg",
    href: "/meals/classic-chicken-burger",
  },
  {
    id: 3,
    name: "Hyderabadi Biryani",
    restaurant: "Biryani Darbar",
    rating: 4.7,
    price: 299,
    image: "/meal-biryani.jpg",
    href: "/meals/hyderabadi-biryani",
  },
  {
    id: 4,
    name: "Thai Basil Noodles",
    restaurant: "Wok Express",
    rating: 4.4,
    price: 249,
    image: "/meal-noodles.jpg",
    href: "/meals/thai-basil-noodles",
  },
];

export const reviews = [
  {
    id: 1,
    rating: 5,
    text: "FoodHub has totally changed my weeknights. The biryani arrives piping hot and the app is so easy to use!",
    name: "Ananya S.",
    avatar: "/images/avatars/ananya.jpg",
  },
  {
    id: 2,
    rating: 5,
    text: "Loved the variety of providers — from Bengali thalis to Thai noodles. Delivery is always on time.",
    name: "Rohit D.",
    avatar: "/images/avatars/rohit.jpg",
  },
  {
    id: 3,
    rating: 4,
    text: "The discounts are real and the food quality is consistently great. My go-to app for ordering in.",
    name: "Megha T.",
    avatar: "/images/avatars/megha.jpg",
  },
];