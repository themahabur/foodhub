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
} from "lucide-react";
import type { DashboardMenuGroup, DashboardRole } from "@/types/dashboard.type";

export const dashboardMenus: Record<DashboardRole, DashboardMenuGroup[]> = {
  CUSTOMER: [
    {
      items: [
        { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
        { label: "My Orders", href: "/dashboard/orders", icon: ShoppingBag, badge: 2 },
        { label: "Favorites", href: "/dashboard/favorites", icon: Heart },
      ],
    },
    {
      label: "Account",
      items: [
        { label: "Delivery Addresses", href: "/dashboard/addresses", icon: MapPin },
        { label: "Payment & Wallet", href: "/dashboard/wallet", icon: Wallet },
        { label: "Notifications", href: "/dashboard/notifications", icon: Bell },
        { label: "Settings", href: "/dashboard/settings", icon: Settings },
      ],
    },
  ],
  PROVIDER: [
    {
      items: [
        { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
        { label: "Manage Menu", href: "/dashboard/menu", icon: UtensilsCrossed },
        { label: "Orders", href: "/dashboard/orders", icon: PackageCheck, badge: 5 },
        { label: "Offers & Promotions", href: "/dashboard/promotions", icon: Tag },
      ],
    },
    {
      label: "Business",
      items: [
        { label: "Analytics", href: "/dashboard/analytics", icon: BarChart3 },
        { label: "Reviews", href: "/dashboard/reviews", icon: Star },
        { label: "Payments", href: "/dashboard/wallet", icon: Wallet },
        { label: "Settings", href: "/dashboard/settings", icon: Settings },
      ],
    },
  ],
  ADMIN: [
    {
      items: [
        { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
        { label: "Manage Users", href: "/dashboard/users", icon: Users },
        { label: "Manage Providers", href: "/dashboard/providers", icon: Store },
        { label: "Order Oversight", href: "/dashboard/orders", icon: PackageCheck },
      ],
    },
    {
      label: "Platform",
      items: [
        { label: "Analytics", href: "/dashboard/analytics", icon: BarChart3 },
        { label: "Moderation", href: "/dashboard/moderation", icon: ShieldCheck },
        { label: "Settings", href: "/dashboard/settings", icon: Settings },
      ],
    },
  ],
};