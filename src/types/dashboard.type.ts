import type { LucideIcon } from "lucide-react";

export type DashboardRole = "CUSTOMER" | "PROVIDER" | "ADMIN";

export interface DashboardMenuItem {
  label: string;
  href: string;
  icon: LucideIcon;
  badge?: string | number;
}

export interface DashboardMenuGroup {
  label?: string;
  items: DashboardMenuItem[];
}