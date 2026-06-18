import { userService } from "@/services/user.service";
import { redirect } from "next/navigation";
import React from "react";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { DashboardSidebar } from "@/components/modules/dashboard/dashboard-sidebar";

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
      <SidebarInset className="bg-foodhub-muted/20">
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
