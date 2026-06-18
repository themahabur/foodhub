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
          label: "Dashboard",
          href: "/provider",
          icon: LayoutDashboard,
        },
        {
          label: "Restaurant",
          href: "/provider/restaurant",
          icon: Store,
        },
        {
          label: "Meals",
          href: "/provider/meals",
          icon: UtensilsCrossed,
        },
        {
          label: "Orders",
          href: "/provider/orders",
          icon: PackageCheck,
          badge: 5,
        },
      ],
    },
    {
      label: "Business",
      items: [
        {
          label: "Reviews",
          href: "/provider/reviews",
          icon: Star,
        },
        {
          label: "Earnings",
          href: "/provider/earnings",
          icon: Wallet,
        },
        {
          label: "Profile",
          href: "/provider/profile",
          icon: User,
        },
        {
          label: "Settings",
          href: "/provider/settings",
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
          href: "/admin",
          icon: LayoutDashboard,
        },
        {
          label: "Users",
          href: "/admin/users",
          icon: Users,
        },
        {
          label: "Providers",
          href: "/admin/providers",
          icon: Store,
        },
        {
          label: "Restaurants",
          href: "/admin/restaurants",
          icon: Building2,
        },
        {
          label: "Meals",
          href: "/admin/meals",
          icon: UtensilsCrossed,
        },
        {
          label: "Orders",
          href: "/admin/orders",
          icon: PackageCheck,
        },
      ],
    },
    {
      label: "Platform",
      items: [
        {
          label: "Reports",
          href: "/admin/reports",
          icon: BarChart3,
        },
        {
          label: "Settings",
          href: "/admin/settings",
          icon: Settings,
        },
      ],
    },
  ],
};
