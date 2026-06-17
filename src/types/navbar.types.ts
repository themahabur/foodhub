import { LucideIcon } from "lucide-react";

export type Role = "CUSTOMER" | "PROVIDER" | "ADMIN";

export interface MenuItem {
  title: string;
  url: string;
}

export interface RoleMenuItem {
  title: string;
  url: string;
  icon: LucideIcon;
}

export interface NavbarProps {
  className?: string;
  logo?: {
    url: string;
    src: string;
    alt: string;
  };
  menu?: MenuItem[];
  cities?: string[];
  defaultCity?: string;
}