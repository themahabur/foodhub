import { userService } from "@/services/user.service";
import { redirect } from "next/navigation";
import React from "react";
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
    <div className="flex min-h-screen w-full">
      {roles === "ADMIN" ? admin : roles === "CUSTOMER" ? customer : provider}
    </div>
  );
};
export default dashboardLayout;
