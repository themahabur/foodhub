import { userService } from "@/services/user.service";
import { redirect } from "next/navigation";
import React from "react";
import {
  SidebarProvider,
  SidebarInset,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";
import { DashboardSidebar } from "@/components/modules/dashboard/DashboardSidebar/dashboard-sidebar";
import Link from "next/link";
import { UtensilsCrossed } from "lucide-react";
export const dynamic = "force-dynamic";


const dashboardLayout = async ({
  admin,
  customer,
  provider,
}: {
  admin: React.ReactNode;
  customer: React.ReactNode;
  provider: React.ReactNode;
}) => {
  const { data } = await userService.getSession();
  if (!data?.user) {
    redirect("/login");
  }
  const roles = data.user.role;

  return (
    <SidebarProvider>
      <DashboardSidebar role={roles} />
      <SidebarInset className="bg-gray-50">
        <header className="flex h-14 shrink-0 items-center gap-2 border-b border-gray-200 bg-white px-4">
          <SidebarTrigger className="text-gray-700 hover:bg-gray-100 hover:text-foodhub-maroon" />

          <Link
            href="/dashboard"
            className="flex items-center gap-2 ml-2 lg:hidden"
          >
            <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-foodhub-maroon text-white">
              <UtensilsCrossed className="size-4" />
            </div>
            <div className="grid flex-1 text-left text-sm leading-tight">
              <span className="truncate font-semibold text-gray-900">
                FoodHub
              </span>
              <span className="text-xs text-gray-500">
                {roles === "ADMIN" ? "Admin" : roles==="CUSTOMER" ? "Customer" : "Provider"} Panel
              </span>
            </div>
          </Link>
        </header>
        <main className="flex flex-1 flex-col gap-4 p-4 md:p-6">
          {roles === "ADMIN"
            ? admin
            : roles === "CUSTOMER"
              ? customer
              : provider}
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
};
export default dashboardLayout;
