import Category from "@/components/modules/home/Category/Category";
import CustomerReviews from "@/components/modules/home/CustomerReviews/CustomerReviews";
import FeaturedMeals from "@/components/modules/home/FeaturedMeals/FeaturedMeals";
import HeroSection from "@/components/modules/home/HeroSection/HeroSection";
import HowItWorks from "@/components/modules/home/Howitworks/Howitworks";
import PromoBanner from "@/components/modules/home/Promobanner/Promobanner";
import ProviderCTA from "@/components/modules/home/Providercta/Providercta";
import TopProviders from "@/components/modules/home/TopProviders/TopProviders";
import Footer from "@/components/shared/Footer/Footer";
import { mealService } from "@/services/meal.service";
import { providerService } from "@/services/provider.service";
import React from "react";

const homePage = async () => {
  const { data: meals } = await mealService.getMeals();

  const { data: providers } = await providerService.getProviders();

  console.log(meals, providers);

  return (
    <div className="flex flex-col items-center justify-center">
      <HeroSection />
      <Category />
      <FeaturedMeals meals={meals} />
      <TopProviders providers={providers} />
      <HowItWorks />
      <PromoBanner />
      <CustomerReviews />
      <ProviderCTA />
      <Footer />
    </div>
  );
};

export default homePage;
