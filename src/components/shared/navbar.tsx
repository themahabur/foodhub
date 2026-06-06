"use client";

import { Menu, MapPin, ChevronDown, User, LayoutDashboard, ShoppingBag, Heart, Settings, LogOut, Package, DollarSign, ShieldCheck, Users, Flag } from "lucide-react";
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
  DropdownMenuSeparator,
  DropdownMenuLabel,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import Link from "next/link";


const CURRENT_ROLE: "customer" | "provider" | "admin" = "customer";

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
  logo?: {
    url: string;
    src: string;
    alt: string;
  };
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

  return (
    <section className={cn("py-4 border-b border-gray-100", className)}>
      <div className="container mx-auto px-4">

        {/* Desktop Menu */}
        <nav className="hidden items-center justify-between lg:flex">

          {/* Logo */}
          <Link href={logo.url} className="flex items-center gap-2">
            <img src={logo.src} className="max-h-8" alt={logo.alt} />
            <h1 className="text-2xl font-bold">
              Food<span className="text-[#8B1A2B]">Hub</span>
            </h1>
          </Link>

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
                    ? "text-black after:absolute after:bottom-0 after:left-3 after:right-3 after:h-[2px] after:bg-[#8B1A2B] after:rounded-full"
                    : "text-black/60 hover:text-black"
                )}
              >
                {item.title}
              </Link>
            ))}
          </div>

          {/* Right Side: City Selector + Profile */}
          <div className="flex items-center gap-3">

            {/* City Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="flex items-center gap-1.5 text-sm font-medium text-gray-700 hover:text-black transition-colors px-3 py-2 rounded-full border border-gray-200 hover:border-gray-400">
                  <MapPin className="size-4 text-[#8B1A2B]" />
                  <span>{selectedCity}</span>
                  <ChevronDown className="size-3.5 text-gray-400" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-40">
                {cities.map((city) => (
                  <DropdownMenuItem
                    key={city}
                    onClick={() => setSelectedCity(city)}
                    className={cn(
                      "text-sm cursor-pointer",
                      selectedCity === city && "font-semibold text-[#8B1A2B]"
                    )}
                  >
                    {city}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Profile Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="flex items-center justify-center size-9 rounded-full border border-gray-200 hover:border-gray-400 hover:bg-gray-50 transition-all">
                  <User className="size-4 text-gray-600" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-52">
                <DropdownMenuLabel className="text-xs text-gray-400 font-normal">
                  Signed in as <span className="font-semibold text-gray-700">{roleLabels[CURRENT_ROLE]}</span>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                {profileMenuItems.map((item) => {
                  const Icon = item.icon;
                  return (
                    <DropdownMenuItem key={item.title} asChild>
                      <Link
                        href={item.url}
                        className="flex items-center gap-2.5 cursor-pointer text-sm"
                      >
                        <Icon className="size-4 text-gray-500" />
                        {item.title}
                      </Link>
                    </DropdownMenuItem>
                  );
                })}
                <DropdownMenuSeparator />
                <DropdownMenuItem className="flex items-center gap-2.5 cursor-pointer text-sm text-red-500 focus:text-red-500 focus:bg-red-50">
                  <LogOut className="size-4" />
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

          </div>
        </nav>

        {/* Mobile Menu */}
        <div className="block lg:hidden">
          <div className="flex items-center justify-between">
            <Link href={logo.url} className="flex items-center gap-2">
              <img src={logo.src} className="max-h-8" alt={logo.alt} />
              <h1 className="text-xl font-bold">
                Food<span className="text-[#8B1A2B]">Hub</span>
              </h1>
            </Link>

            <div className="flex items-center gap-2">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="flex items-center gap-1 text-sm font-medium text-gray-700 px-2 py-1.5 rounded-full border border-gray-200">
                    <MapPin className="size-3.5 text-[#8B1A2B]" />
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

              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="outline" size="icon">
                    <Menu className="size-4" />
                  </Button>
                </SheetTrigger>
                <SheetContent className="overflow-y-auto">
                  <SheetHeader>
                    <SheetTitle>
                      <h1 className="text-xl font-bold">
                        Food<span className="text-[#8B1A2B]">Hub</span>
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
                            "px-4 py-2 rounded-md text-sm font-medium transition-colors",
                            activeItem === item.title
                              ? "text-[#8B1A2B] font-semibold"
                              : "text-gray-600 hover:text-black hover:bg-gray-50"
                          )}
                        >
                          {item.title}
                        </Link>
                      ))}
                    </div>

                    {/* Profile section in mobile drawer */}
                    <div className="flex flex-col gap-1">
                      <p className="text-xs text-gray-400 px-4 pb-1">
                        {roleLabels[CURRENT_ROLE]} Menu
                      </p>
                      {profileMenuItems.map((item) => {
                        const Icon = item.icon;
                        return (
                          <Link
                            key={item.title}
                            href={item.url}
                            className="flex items-center gap-2.5 px-4 py-2 rounded-md text-sm font-medium text-gray-600 hover:text-black hover:bg-gray-50 transition-colors"
                          >
                            <Icon className="size-4 text-gray-400" />
                            {item.title}
                          </Link>
                        );
                      })}
                      <button className="flex items-center gap-2.5 px-4 py-2 rounded-md text-sm font-medium text-red-500 hover:bg-red-50 transition-colors">
                        <LogOut className="size-4" />
                        Logout
                      </button>
                    </div>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export { Navbar };