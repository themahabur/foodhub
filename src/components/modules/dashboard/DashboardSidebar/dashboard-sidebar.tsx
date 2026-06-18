"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { UtensilsCrossed, LogOut, ChevronUp } from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuBadge,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { DashboardRole } from "@/types/dashboard.type";
import { dashboardMenus } from "@/data/dashboard.data";



const roleLabel: Record<DashboardRole, string> = {
  CUSTOMER: "Customer",
  PROVIDER: "Provider",
  ADMIN: "Admin",
};

interface DashboardSidebarProps {
  role: DashboardRole;
}

export function DashboardSidebar({ role }: DashboardSidebarProps) {
  const pathname = usePathname();
  const menuGroups = dashboardMenus[role];

  return (
    <Sidebar collapsible="icon" className="border-gray-200">
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <Link href="/dashboard">
                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-foodhub-maroon text-white">
                  <UtensilsCrossed className="size-4" />
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold text-gray-900">
                    FoodHub
                  </span>
                  <span className="truncate text-xs text-gray-500">
                    {roleLabel[role]} Panel
                  </span>
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent>
        {menuGroups.map((group, idx) => (
          <SidebarGroup key={group.label ?? idx}>
            {group.label && <SidebarGroupLabel>{group.label}</SidebarGroupLabel>}
            <SidebarGroupContent>
              <SidebarMenu>
                {group.items.map((item) => {
                  const isActive = pathname === item.href;
                  return (
                    <SidebarMenuItem key={item.href}>
                      <SidebarMenuButton
                        asChild
                        isActive={isActive}
                        tooltip={item.label}
                        className={
                          isActive
                            ? "bg-foodhub-maroon/10 text-foodhub-maroon font-medium border-l-2 border-foodhub-maroon data-[active=true]:bg-foodhub-maroon/10 data-[active=true]:text-foodhub-maroon"
                            : "text-gray-700 hover:bg-gray-100 hover:text-foodhub-maroon"
                        }
                      >
                        <Link href={item.href}>
                          <item.icon className="size-4" />
                          <span>{item.label}</span>
                        </Link>
                      </SidebarMenuButton>
                      {item.badge && (
                        <SidebarMenuBadge className="bg-amber-400 text-gray-900">
                          {item.badge}
                        </SidebarMenuBadge>
                      )}
                    </SidebarMenuItem>
                  );
                })}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>

      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton
                  size="lg"
                  className="data-[state=open]:bg-gray-100"
                >
                  <Avatar className="size-8 rounded-lg">
                    <AvatarFallback className="rounded-lg bg-foodhub-maroon text-white">
                      MR
                    </AvatarFallback>
                  </Avatar>
                  <div className="grid flex-1 text-left text-sm leading-tight">
                    <span className="truncate font-medium text-gray-900">
                      Mahabur Rahman
                    </span>
                    <span className="truncate text-xs text-gray-500">
                      mahabur@example.com
                    </span>
                  </div>
                  <ChevronUp className="ml-auto size-4 text-gray-400" />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                side="top"
                align="end"
                className="w-[--radix-dropdown-menu-trigger-width] min-w-56"
              >
                <DropdownMenuItem className="text-destructive focus:text-destructive">
                  <LogOut className="size-4" />
                  Log out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}