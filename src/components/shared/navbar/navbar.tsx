"use client";

import { Menu, MapPin, ChevronDown, UtensilsCrossed } from "lucide-react";
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

import { NavbarProps, Role } from "@/types/navbar.types";
import {
  roleMenus,
  DEFAULT_MENU,
  DEFAULT_CITIES,
  DEFAULT_LOGO,
} from "@/data/navbar.data";
import { ProfileSidebar } from "../sidebar/profile-sidebar";
import { usePathname } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import { CartSheet } from "../cart-sheet/cart-sheet";

const Navbar = ({
  logo = DEFAULT_LOGO,
  menu = DEFAULT_MENU,
  cities = DEFAULT_CITIES,
  defaultCity = "Dhaka",
  className,
}: NavbarProps) => {
  const pathname = usePathname();

  const { data: session, isPending } = authClient.useSession();

  const [selectedCity, setSelectedCity] = useState(defaultCity);

const user = session?.user;

const role = ((user as any)?.role ?? "CUSTOMER") as Role;

const profileMenuItems = roleMenus[role] ?? [];

  return (
    <section className={cn("relative", className)}>
      {/* Top line */}
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-foodhub-maroon/30 to-transparent" />

      <div className="border-b border-gray-100/80 bg-white/95 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-3.5">

          {/* ================= DESKTOP ================= */}
          <nav className="hidden lg:flex items-center justify-between">

            {/* Logo */}
            <Link href={logo.url} className="flex items-center gap-2.5 group">
              <div className="size-8 rounded-lg bg-foodhub-maroon/8 border border-foodhub-maroon/15 flex items-center justify-center">
                <UtensilsCrossed className="size-4 text-foodhub-maroon" />
              </div>
              <h1 className="text-xl font-bold">
                Food<span className="text-foodhub-maroon">Hub</span>
              </h1>
            </Link>

            {/* Menu */}
            <div className="flex items-center gap-1">
              {menu.map((item) => (
                <Link
                  key={item.title}
                  href={item.url}
                  className={cn(
                    "px-4 py-2 text-sm font-semibold transition",
                    pathname === item.url
                      ? "text-foodhub-maroon relative after:absolute after:bottom-0 after:left-3 after:right-3 after:h-[2px] after:bg-foodhub-maroon after:rounded-full"
                      : "text-gray-500 hover:text-black"
                  )}
                >
                  {item.title}
                </Link>
              ))}
            </div>

            {/* Right side */}
            <div className="flex items-center gap-2.5">

              {/* Loading state */}
              {isPending ? (
                <div className="h-9 w-28 bg-gray-200 animate-pulse rounded-full" />
              ) : session ? (
                <>
                  {/* City selector */}
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <button className="flex items-center gap-1.5 text-sm px-3 py-2 rounded-full bg-gray-50 border hover:bg-gray-100 transition">
                        <MapPin className="size-3.5 text-foodhub-maroon" />
                        {selectedCity}
                        <ChevronDown className="size-3 text-gray-400" />
                      </button>
                    </DropdownMenuTrigger>

                    <DropdownMenuContent align="end">
                      {cities.map((city) => (
                        <DropdownMenuItem
                          key={city}
                          onClick={() => setSelectedCity(city)}
                          className={cn(
                            "cursor-pointer text-sm",
                            selectedCity === city &&
                              "text-foodhub-maroon font-semibold"
                          )}
                        >
                          {city}
                        </DropdownMenuItem>
                      ))}
                    </DropdownMenuContent>
                  </DropdownMenu>

                  {/* Cart */}
                  <CartSheet />

                  {/* Profile */}
                  <ProfileSidebar
                    role={role}
                    menuItems={profileMenuItems}
                  />
                </>
              ) : (
                <div className="flex items-center gap-2">
                  <Link
                    href="/login"
                    className="px-5 py-2 text-sm font-semibold text-foodhub-maroon border rounded-full hover:bg-foodhub-maroon/5"
                  >
                    Login
                  </Link>

                  <Link
                    href="/register"
                    className="px-5 py-2 text-sm font-semibold text-white bg-foodhub-maroon rounded-full hover:scale-[1.03] transition"
                  >
                    Sign up
                  </Link>
                </div>
              )}
            </div>
          </nav>

          {/* ================= MOBILE ================= */}
          <div className="flex lg:hidden items-center justify-between">

            {/* Logo */}
            <Link href={logo.url} className="flex items-center gap-2">
              <img src={logo.src} className="h-5" alt={logo.alt} />
              <h1 className="text-lg font-bold">
                Food<span className="text-foodhub-maroon">Hub</span>
              </h1>
            </Link>

            <div className="flex items-center gap-2">

              {/* City */}
              {!isPending && session && (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <button className="flex items-center gap-1 text-xs px-2.5 py-1.5 bg-gray-50 rounded-full">
                      <MapPin className="size-3 text-foodhub-maroon" />
                      {selectedCity}
                    </button>
                  </DropdownMenuTrigger>

                  <DropdownMenuContent align="end">
                    {cities.map((city) => (
                      <DropdownMenuItem
                        key={city}
                        onClick={() => setSelectedCity(city)}
                      >
                        {city}
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              )}

              {/* Cart */}
              {!isPending && session && <CartSheet />}

              {/* Auth / Profile */}
              {isPending ? null : session ? (
                <ProfileSidebar
                  role={role}
                  menuItems={profileMenuItems}
                />
              ) : (
                <Sheet>
                  <SheetTrigger asChild>
                    <Button
                      variant="outline"
                      size="icon"
                      className="rounded-xl"
                    >
                      <Menu className="size-4" />
                    </Button>
                  </SheetTrigger>

                  <SheetContent>
                    <SheetHeader>
                      <SheetTitle>
                        Food<span className="text-foodhub-maroon">Hub</span>
                      </SheetTitle>
                    </SheetHeader>

                    <div className="mt-6 flex flex-col gap-3">
                      {menu.map((item) => (
                        <Link
                          key={item.title}
                          href={item.url}
                          className={cn(
                            "px-4 py-2 rounded-lg text-sm",
                            pathname === item.url
                              ? "bg-foodhub-maroon/5 text-foodhub-maroon"
                              : "text-gray-600"
                          )}
                        >
                          {item.title}
                        </Link>
                      ))}

                      <Link
                        href="/login"
                        className="text-center py-2 border rounded-full text-foodhub-maroon"
                      >
                        Login
                      </Link>

                      <Link
                        href="/register"
                        className="text-center py-2 bg-foodhub-maroon text-white rounded-full"
                      >
                        Sign up
                      </Link>
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