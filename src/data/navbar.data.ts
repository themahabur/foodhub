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

export const IS_LOGGED_IN: boolean = false;

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
