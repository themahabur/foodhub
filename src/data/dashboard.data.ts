import {
  LayoutDashboard,
  ShoppingBag,
  Heart,
  MapPin,
  Wallet,
  Settings,
  UtensilsCrossed,
  PackageCheck,
  Star,
  BarChart3,
  Users,
  Store,
  ShieldCheck,
  Bell,
  Tag,
  Building2,
  User,
  ChefHat,
} from "lucide-react";
import type { DashboardMenuGroup, DashboardRole } from "@/types/dashboard.type";

export const dashboardMenus: Record<DashboardRole, DashboardMenuGroup[]> = {
  CUSTOMER: [
    {
      items: [
        { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
        {
          label: "Orders",
          href: "/dashboard/orders",
          icon: ShoppingBag,
          badge: 2,
        },
        {
          label: "Favorites",
          href: "/dashboard/favorites",
          icon: Heart,
        },
      ],
    },
    {
      label: "Account",
      items: [
        {
          label: "Addresses",
          href: "/dashboard/addresses",
          icon: MapPin,
        },
        {
          label: "Profile",
          href: "/dashboard/profile",
          icon: User,
        },
        {
          label: "Settings",
          href: "/dashboard/settings",
          icon: Settings,
        },
      ],
    },
  ],

PROVIDER: [
  {
    items: [
      {
        label: "Overview",
        href: "/dashboard",
        icon: LayoutDashboard,
      },
      {
        label: "Meals",
        href: "/dashboard/meals",
        icon: UtensilsCrossed,
      },
      {
        label: "Orders",
        href: "/dashboard/orders",
        icon: PackageCheck,
        badge: 5,
      },
    ],
  },
  {
    label: "Management",
    items: [
      {
        label: "Restaurant",
        href: "/dashboard/restaurant",
        icon: ChefHat,
      },
      {
        label: "Reviews",
        href: "/dashboard/reviews",
        icon: Star,
      },
      {
        label: "Profile",
        href: "/dashboard/profile",
        icon: User,
      },
      {
        label: "Settings",
        href: "/dashboard/settings",
        icon: Settings,
      },
    ],
  },
],

  ADMIN: [
    {
      items: [
        {
          label: "Dashboard",
          href: "/dashboard",
          icon: LayoutDashboard,
        },
        {
          label: "Users",
          href: "/dashboard/users",
          icon: Users,
        },
        {
          label: "Providers",
          href: "/dashboard/providers",
          icon: Store,
        },
        {
          label: "Restaurants",
          href: "/dashboard/restaurants",
          icon: Building2,
        },
        {
          label: "Meals",
          href: "/dashboard/meals",
          icon: UtensilsCrossed,
        },
        {
          label: "Orders",
          href: "/dashboard/orders",
          icon: PackageCheck,
        },
      ],
    },
    {
      label: "Platform",
      items: [
        {
          label: "Reports",
          href: "/dashboard/reports",
          icon: BarChart3,
        },
        {
          label: "Settings",
          href: "/dashboard/settings",
          icon: Settings,
        },
      ],
    },
  ],
};
