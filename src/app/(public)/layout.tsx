import Footer from "@/components/shared/Footer/Footer";
import { Navbar } from "@/components/shared/navbar/navbar";
import { authClient } from "@/lib/auth-client";
import { headers } from "next/headers";
import React from "react";

const publicLayout = async ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <Navbar />
      {children}
     
    </div>
  );
};

export default publicLayout;
