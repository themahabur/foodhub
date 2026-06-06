"use client";

import {
  Menu,
  MapPin,
  ChevronDown,
  User,
  LayoutDashboard,
  ShoppingBag,
  Heart,
  Settings,
  LogOut,
  Package,
  DollarSign,
  ShieldCheck,
  Users,
  Flag,
  ChevronRight,
} from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import Link from "next/link";

const IS_LOGGED_IN: boolean = true;
const CURRENT_ROLE: "customer" | "provider" | "admin" = "provider";

const roleMenus = {
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

const roleLabels = {
  customer: "Customer",
  provider: "Provider",
  admin: "Admin",
};

interface MenuItem {
  title: string;
  url: string;
}

interface NavbarProps {
  className?: string;
  logo?: { url: string; src: string; alt: string };
  menu?: MenuItem[];
  cities?: string[];
  defaultCity?: string;
}

const Navbar = ({
  logo = {
    url: "/",
    src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/logos/shadcnblockscom-icon.svg",
    alt: "logo",
  },
  menu = [
    { title: "Home", url: "/" },
    { title: "Explore", url: "/explore" },
    { title: "Restaurants", url: "/restaurants" },
    { title: "Offers", url: "/offers" },
  ],
  cities = ["Kolkata", "Dhaka", "Mumbai", "Delhi", "Bangalore"],
  defaultCity = "Kolkata",
  className,
}: NavbarProps) => {
  const [activeItem, setActiveItem] = useState("Home");
  const [selectedCity, setSelectedCity] = useState(defaultCity);

  const profileMenuItems = roleMenus[CURRENT_ROLE];

  /* ── Profile Sidebar ── */
  const ProfileSidebar = (
    <Sheet>
      <SheetTrigger asChild>
        <button className="relative flex items-center justify-center size-9 rounded-full bg-foodhub-maroon/8 border border-foodhub-maroon/20 hover:border-foodhub-maroon/50 hover:bg-foodhub-maroon/12 transition-all duration-200 group">
          <User className="size-4 text-foodhub-maroon" />
          {/* Online dot */}
          <span className="absolute top-0.5 right-0.5 size-2 rounded-full bg-green-400 border border-white" />
        </button>
      </SheetTrigger>
      <SheetContent side="right" className="w-80 p-0 flex flex-col bg-white">
        {/* Header */}
        <div className="relative px-6 pt-10 pb-8 overflow-hidden bg-gradient-to-br from-foodhub-maroon via-foodhub-maroon to-foodhub-maroon/80">
          <div className="absolute -top-6 -right-6 size-32 rounded-full bg-white/5" />
          <div className="absolute -bottom-8 -left-4 size-24 rounded-full bg-white/5" />
          <div className="absolute top-4 right-16 size-10 rounded-full bg-white/5" />
          <div className="relative flex items-center gap-4">
            <div className="size-16 rounded-2xl bg-white/15 border border-white/25 flex items-center justify-center shadow-inner">
              <User className="size-7 text-white" />
            </div>
            <div className="flex flex-col gap-1.5">
              <p className="text-white font-bold text-lg leading-none tracking-tight">
                Hello, User!
              </p>
              <p className="text-white/60 text-xs leading-none">
                user@email.com
              </p>
              <span className="self-start mt-1 text-xs font-semibold px-2.5 py-1 rounded-full bg-white text-foodhub-maroon leading-none">
                {roleLabels[CURRENT_ROLE]}
              </span>
            </div>
          </div>
        </div>
        {/* Menu Items */}
        <div className="flex-1 py-2 overflow-y-auto">
          <p className="px-5 pt-4 pb-2 text-[11px] font-semibold text-gray-400 uppercase tracking-widest">
            Menu
          </p>
          {profileMenuItems.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.title}
                href={item.url}
                className="group flex items-center justify-between mx-3 px-3 py-3 rounded-xl text-sm font-medium text-gray-600 hover:bg-foodhub-maroon/5 hover:text-foodhub-maroon transition-all duration-150"
              >
                <div className="flex items-center gap-3">
                  <div className="size-8 rounded-lg bg-gray-100 group-hover:bg-foodhub-maroon/10 flex items-center justify-center transition-colors">
                    <Icon className="size-4 text-gray-500 group-hover:text-foodhub-maroon transition-colors" />
                  </div>
                  {item.title}
                </div>
                <ChevronRight className="size-3.5 text-gray-300 group-hover:text-foodhub-maroon group-hover:translate-x-0.5 transition-all" />
              </Link>
            );
          })}
        </div>
        {/* Logout */}
        <div className="p-4 border-t border-gray-100">
          <button className="w-full group flex items-center gap-3 px-3 py-3 rounded-xl text-sm font-semibold text-gray-500 hover:bg-red-50 hover:text-red-500 transition-all duration-150">
            <div className="size-8 rounded-lg bg-gray-100 group-hover:bg-red-100 flex items-center justify-center transition-colors">
              <LogOut className="size-4 text-gray-400 group-hover:text-red-500 transition-colors" />
            </div>
            Logout
          </button>
        </div>
      </SheetContent>
    </Sheet>
  );

  return (
    <section className={cn("relative", className)}>
      {/* Subtle top accent line */}
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-foodhub-maroon/30 to-transparent" />

      <div className="border-b border-gray-100/80 bg-white/95 backdrop-blur-sm ">
        <div className="container mx-auto px-4 py-3.5">
          {/* Desktop Menu */}
          <nav className="hidden items-center justify-between lg:flex">
            {/* Logo */}
            <Link href={logo.url} className="flex items-center gap-2.5 group">
              <div className="size-8 rounded-lg bg-foodhub-maroon/8 border border-foodhub-maroon/15 flex items-center justify-center group-hover:bg-foodhub-maroon/12 transition-colors">
                <img src={logo.src} className="max-h-5" alt={logo.alt} />
              </div>
              <h1 className="text-xl font-bold tracking-tight">
                Food<span className="text-foodhub-maroon">Hub</span>
              </h1>
            </Link>

            {/* Nav Links */}
            {/* Nav Links */}
            <div className="flex items-center gap-1">
              {menu.map((item) => (
                <Link
                  key={item.title}
                  href={item.url}
                  onClick={() => setActiveItem(item.title)}
                  className={cn(
                    "relative px-4 py-2 text-sm font-semibold transition-colors duration-200",
                    activeItem === item.title
                      ? "text-foodhub-maroon after:absolute after:bottom-0 after:left-3 after:right-3 after:h-[2px] after:bg-foodhub-maroon after:rounded-full"
                      : "text-gray-500 hover:text-gray-900",
                  )}
                >
                  {item.title}
                </Link>
              ))}
            </div>

            {/* Right Side */}
            <div className="flex items-center gap-2.5">
              {IS_LOGGED_IN ? (
                <>
                  {/* City Dropdown */}
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <button className="flex items-center gap-1.5 text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors px-3 py-2 rounded-full bg-gray-50 border border-gray-100 hover:border-gray-200 hover:bg-gray-100">
                        <MapPin className="size-3.5 text-foodhub-maroon" />
                        <span>{selectedCity}</span>
                        <ChevronDown className="size-3 text-gray-400" />
                      </button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-40">
                      {cities.map((city) => (
                        <DropdownMenuItem
                          key={city}
                          onClick={() => setSelectedCity(city)}
                          className={cn(
                            "text-sm cursor-pointer",
                            selectedCity === city &&
                              "font-semibold text-foodhub-maroon",
                          )}
                        >
                          {city}
                        </DropdownMenuItem>
                      ))}
                    </DropdownMenuContent>
                  </DropdownMenu>

                  {ProfileSidebar}
                </>
              ) : (
                <div className="flex items-center gap-2">
                  <Link
                    href="/login"
                    className="px-5 py-2 text-sm font-semibold text-foodhub-maroon rounded-full border border-foodhub-maroon/25 hover:border-foodhub-maroon hover:bg-foodhub-maroon/5 transition-all duration-200 tracking-wide"
                  >
                    Login
                  </Link>
                  <Link
                    href="/register"
                    className="px-5 py-2 text-sm font-semibold text-white rounded-full
                      bg-foodhub-maroon
                      shadow-[0_2px_12px_theme(colors.foodhub-maroon/35%)]
                      hover:shadow-[0_4px_20px_theme(colors.foodhub-maroon/50%)]
                      hover:scale-[1.03] active:scale-[0.98]
                      transition-all duration-200 tracking-wide"
                  >
                    Sign up
                  </Link>
                </div>
              )}
            </div>
          </nav>

          {/* Mobile Menu */}
          <div className="flex items-center justify-between lg:hidden">
            {/* Logo */}
            <Link href={logo.url} className="flex items-center gap-2 group">
              <div className="size-7 rounded-md bg-foodhub-maroon/8 border border-foodhub-maroon/15 flex items-center justify-center">
                <img src={logo.src} className="max-h-4" alt={logo.alt} />
              </div>
              <h1 className="text-lg font-bold tracking-tight">
                Food<span className="text-foodhub-maroon">Hub</span>
              </h1>
            </Link>

            <div className="flex items-center gap-2">
              {IS_LOGGED_IN && (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <button className="flex items-center gap-1 text-sm font-medium text-gray-600 px-2.5 py-1.5 rounded-full bg-gray-50 border border-gray-100">
                      <MapPin className="size-3.5 text-foodhub-maroon" />
                      <span>{selectedCity}</span>
                      <ChevronDown className="size-3 text-gray-400" />
                    </button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    {cities.map((city) => (
                      <DropdownMenuItem
                        key={city}
                        onClick={() => setSelectedCity(city)}
                        className="text-sm cursor-pointer"
                      >
                        {city}
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              )}

              {IS_LOGGED_IN ? (
                ProfileSidebar
              ) : (
                <Sheet>
                  <SheetTrigger asChild>
                    <Button
                      variant="outline"
                      size="icon"
                      className="rounded-xl border-gray-200"
                    >
                      <Menu className="size-4" />
                    </Button>
                  </SheetTrigger>
                  <SheetContent className="overflow-y-auto">
                    <SheetHeader>
                      <SheetTitle>
                        <h1 className="text-xl font-bold">
                          Food<span className="text-foodhub-maroon">Hub</span>
                        </h1>
                      </SheetTitle>
                    </SheetHeader>
                    <div className="flex flex-col gap-6 p-4">
                      <div className="flex flex-col gap-1">
                        {menu.map((item) => (
                          <Link
                            key={item.title}
                            href={item.url}
                            onClick={() => setActiveItem(item.title)}
                            className={cn(
                              "px-4 py-2 rounded-xl text-sm font-medium transition-colors",
                              activeItem === item.title
                                ? "bg-foodhub-maroon/5 text-foodhub-maroon font-semibold"
                                : "text-gray-600 hover:text-black hover:bg-gray-50",
                            )}
                          >
                            {item.title}
                          </Link>
                        ))}
                      </div>
                      <div className="flex flex-col gap-3 pt-2">
                        <Link
                          href="/login"
                          className="w-full text-center px-5 py-2.5 text-sm font-semibold text-foodhub-maroon rounded-full border border-foodhub-maroon/30 hover:border-foodhub-maroon hover:bg-foodhub-maroon/5 transition-all duration-200 tracking-wide"
                        >
                          Login
                        </Link>
                        <Link
                          href="/register"
                          className="w-full text-center px-5 py-2.5 text-sm font-semibold text-white rounded-full
                            bg-foodhub-maroon
                            shadow-[0_2px_12px_theme(colors.foodhub-maroon/35%)]
                            hover:shadow-[0_4px_20px_theme(colors.foodhub-maroon/50%)]
                            hover:scale-[1.02] active:scale-[0.98]
                            transition-all duration-200 tracking-wide"
                        >
                          Sign up
                        </Link>
                      </div>
                    </div>
                  </SheetContent>
                </Sheet>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export { Navbar };
