import Footer from "@/components/shared/Footer/Footer";
import { Navbar } from "@/components/shared/navbar/navbar";
import React from "react";

const publicLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <Navbar />
      {children}
      <Footer />
    </div>
  );
};

export default publicLayout;
