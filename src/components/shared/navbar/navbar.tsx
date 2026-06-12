"use client";

import { Menu, MapPin, ChevronDown } from "lucide-react";
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

import { NavbarProps } from "@/types/navbar.types";
import {
  IS_LOGGED_IN,
  CURRENT_ROLE,
  roleMenus,
  DEFAULT_MENU,
  DEFAULT_CITIES,
  DEFAULT_LOGO,
} from "@/data/navbar.data";
import { ProfileSidebar } from "../sidebar/profile-sidebar";
import { usePathname } from "next/navigation";

const Navbar = ({
  logo = DEFAULT_LOGO,
  menu = DEFAULT_MENU,
  cities = DEFAULT_CITIES,
  defaultCity = "Dhaka",
  className,
}: NavbarProps) => {
  const pathname = usePathname();

  const [selectedCity, setSelectedCity] = useState(defaultCity);

  const profileMenuItems = roleMenus[CURRENT_ROLE];

  return (
    <section className={cn("relative", className)}>
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-foodhub-maroon/30 to-transparent" />

      <div className="border-b border-gray-100/80 bg-white/95 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-3.5">
          {/* Desktop */}
          <nav className="hidden items-center justify-between lg:flex">
            <Link href={logo.url} className="flex items-center gap-2.5 group">
              <div className="size-8 rounded-lg bg-foodhub-maroon/8 border border-foodhub-maroon/15 flex items-center justify-center group-hover:bg-foodhub-maroon/12 transition-colors">
                <img src={logo.src} className="max-h-5" alt={logo.alt} />
              </div>
              <h1 className="text-xl font-bold tracking-tight">
                Food<span className="text-foodhub-maroon">Hub</span>
              </h1>
            </Link>

            <div className="flex items-center gap-1">
              {menu.map((item) => (
                <Link
                  key={item.title}
                  href={item.url}
                  className={cn(
                    "relative px-4 py-2 text-sm font-semibold transition-colors duration-200",
                    pathname === item.url
                      ? "text-foodhub-maroon after:absolute after:bottom-0 after:left-3 after:right-3 after:h-[2px] after:bg-foodhub-maroon after:rounded-full"
                      : "text-gray-500 hover:text-gray-900",
                  )}
                >
                  {item.title}
                </Link>
              ))}
            </div>

            <div className="flex items-center gap-2.5">
              {IS_LOGGED_IN ? (
                <>
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
                  <ProfileSidebar
                    role={CURRENT_ROLE}
                    menuItems={profileMenuItems}
                  />
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
                    className="px-5 py-2 text-sm font-semibold text-white rounded-full bg-foodhub-maroon shadow-[0_2px_12px_theme(colors.foodhub-maroon/35%)] hover:shadow-[0_4px_20px_theme(colors.foodhub-maroon/50%)] hover:scale-[1.03] active:scale-[0.98] transition-all duration-200 tracking-wide"
                  >
                    Sign up
                  </Link>
                </div>
              )}
            </div>
          </nav>

          {/* Mobile */}
          <div className="flex items-center justify-between lg:hidden">
            <Link href={logo.url} className="flex items-center gap-2">
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
                <ProfileSidebar
                  role={CURRENT_ROLE}
                  menuItems={profileMenuItems}
                />
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
                            className={cn(
                              "px-4 py-2 rounded-xl text-sm font-medium transition-colors",
                              pathname === item.url
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
                          className="w-full text-center px-5 py-2.5 text-sm font-semibold text-white rounded-full bg-foodhub-maroon shadow-[0_2px_12px_theme(colors.foodhub-maroon/35%)] hover:shadow-[0_4px_20px_theme(colors.foodhub-maroon/50%)] hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 tracking-wide"
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
