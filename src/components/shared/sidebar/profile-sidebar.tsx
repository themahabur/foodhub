"use client";

import { User, LogOut, ChevronRight } from "lucide-react";
import {
  Sheet, SheetContent, SheetTrigger,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { Role, RoleMenuItem } from "@/types/navbar.types";
import { roleLabels } from "@/data/navbar.data";


interface ProfileSidebarProps {
  role: Role;
  menuItems: RoleMenuItem[];
}

export const ProfileSidebar = ({ role, menuItems }: ProfileSidebarProps) => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <button className="relative flex items-center justify-center size-9 rounded-full bg-foodhub-maroon/8 border border-foodhub-maroon/20 hover:border-foodhub-maroon/50 hover:bg-foodhub-maroon/12 transition-all duration-200">
          <User className="size-4 text-foodhub-maroon" />
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
                {roleLabels[role]}
              </span>
            </div>
          </div>
        </div>

        {/* Menu Items */}
        <div className="flex-1 py-2 overflow-y-auto">
          <p className="px-5 pt-4 pb-2 text-[11px] font-semibold text-gray-400 uppercase tracking-widest">
            Menu
          </p>
          {menuItems.map((item) => {
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
};