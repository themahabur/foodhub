import Category from "@/components/modules/home/Category/Category";
import CustomerReviews from "@/components/modules/home/CustomerReviews/CustomerReviews";
import FeaturedMeals from "@/components/modules/home/FeaturedMeals/FeaturedMeals";
import HeroSection from "@/components/modules/home/HeroSection/HeroSection";
import HowItWorks from "@/components/modules/home/Howitworks/Howitworks";
import PromoBanner from "@/components/modules/home/Promobanner/Promobanner";
import ProviderCTA from "@/components/modules/home/Providercta/Providercta";
import TopProviders from "@/components/modules/home/TopProviders/TopProviders";
import React from "react";

const homePage = () => {
  return (
    <div className="flex flex-col items-center justify-center">
      <HeroSection />
      <Category />
      <FeaturedMeals />
      <TopProviders />
      <HowItWorks/>
      <PromoBanner/>
      <CustomerReviews/>
      <ProviderCTA/>
    </div>
  );
};

export default homePage;
