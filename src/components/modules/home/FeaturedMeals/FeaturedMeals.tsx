import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Star, Plus } from "lucide-react";
import { FadeUpOnScroll, StaggerContainer, StaggerItem } from "@/components/shared/motion/motion-wrapper";
import { Meal } from "@/types/meal.types";



export default function FeaturedMeals({meals}:{meals:Meal[]}) {
  return (
    <section className="w-full py-10 px-4 md:px-8 container mx-auto">

      {/* Header */}
      <FadeUpOnScroll className="flex items-center justify-between mb-6">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
          Featured Meals
        </h2>
        <Link
          href="/meals"
          className="flex items-center gap-1 text-f font-medium text-sm hover:underline transition-all"
        >
          View all <ArrowRight className="w-4 h-4" />
        </Link>
      </FadeUpOnScroll>

      {/* Meals Grid */}
      <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        {meals.map((meal) => (
          <StaggerItem key={meal.id}>
            <div className="group bg-white rounded-2xl border border-gray-100 hover:border-[#8B1A2B]/15 hover:shadow-lg transition-all duration-300 overflow-hidden">

              {/* Image */}
              <div className="relative w-full aspect-[4/3] overflow-hidden">
                <Image
                  src={"/meal-biryani.jpg"}
                  alt={meal.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>

              {/* Content */}
              <div className="p-4">
                <h3 className="font-bold text-gray-900 text-base leading-snug mb-0.5">
                  {meal.title}
                </h3>
                <p className="text-sm text-gray-400 mb-2">{meal.provider.businessName}</p>

                {/* Rating */}
                <div className="flex items-center gap-1 mb-3">
                  <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                  <span className="text-sm font-medium text-gray-700">
                    {meal.rating}
                  </span>
                </div>

                {/* Price + Add */}
                <div className="flex items-center justify-between">
                  <span className="text-lg font-bold text-gray-900">
                    ৳{meal.price}
                  </span>
                  <button className="cursor-pointer flex items-center gap-1.5 text-sm font-semibold text-[#8B1A2B] border border-[#8B1A2B]/30 hover:bg-[#8B1A2B] hover:text-white hover:border-[#8B1A2B] px-4 py-1.5 rounded-full transition-all duration-200">
                    <Plus className="w-3.5 h-3.5" />
                    Add
                  </button>
                </div>
              </div>

            </div>
          </StaggerItem>
        ))}
      </StaggerContainer>

    </section>
  );
}