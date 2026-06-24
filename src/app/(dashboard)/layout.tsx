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
      <DashboardSidebar user={data.user} />
      <SidebarInset className="bg-neutral-50">
        <header className="flex h-14 shrink-0 items-center gap-2 border-b border-foodhub-maroon/10 bg-white/80 backdrop-blur-sm px-4 shadow-[0_1px_2px_rgba(0,0,0,0.03)]">
          <SidebarTrigger className="text-neutral-600 hover:bg-foodhub-maroon/5 hover:text-foodhub-maroon transition-colors" />

          <Link
            href="/dashboard"
            className="flex items-center gap-2 ml-2 lg:hidden"
          >
            <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-gradient-to-br from-foodhub-maroon to-foodhub-maroon/80 text-white shadow-sm ring-1 ring-foodhub-maroon/20">
              <UtensilsCrossed className="size-4" />
            </div>
            <div className="grid flex-1 text-left text-sm leading-tight">
              <span className="truncate font-semibold text-neutral-900">
                FoodHub
              </span>
              <span className="text-xs text-foodhub-maroon/70 font-medium">
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