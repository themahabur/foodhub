import { ArrowRight } from "lucide-react";
import React from "react";

const HeroSection = () => {
  return (
    <section className=" flex items-center py-20 bg-white">
      <div className="container mx-auto px-4 grid lg:grid-cols-2 gap-14 items-center">

        {/* LEFT CONTENT */}
        <div>
          {/* Heading */}
          <h1 className="text-4xl lg:text-6xl font-extrabold leading-16 text-gray-900">
            Discover Flavors
            <br />
            That Make
            <br />
            <span className="text-foodhub-yellow">You Smile</span>
          </h1>

          {/* Description */}
          <p className="mt-4 max-w-xl text-lg leading-8 text-gray-500">
            Explore handcrafted meals from trusted local providers and enjoy
            fresh delivery straight to your doorstep.
          </p>

          {/* SEARCH BAR */}
          <div className="mt-8 flex items-center overflow-hidden rounded-full border border-gray-200 bg-white shadow-[0_10px_40px_rgba(0,0,0,0.06)] max-w-2xl">

            <input
              type="text"
              placeholder="Search meals, cuisines or restaurants..."
              className="flex-1 px-6 py-5 bg-transparent outline-none text-gray-700 placeholder:text-gray-400"
            />

            <div className="h-8 w-px bg-gray-200" />

            <select className="px-5 py-5 bg-transparent outline-none text-gray-600">
              <option>Dhaka</option>
            </select>

            <button className="mr-2 px-8 py-3 text-sm font-semibold text-white rounded-full bg-foodhub-maroon shadow-[0_4px_20px_theme(colors.foodhub-maroon/35%)] hover:shadow-[0_8px_30px_theme(colors.foodhub-maroon/50%)] hover:scale-[1.03] transition-all duration-300">
              Search
            </button>
          </div>

          {/* CTA BUTTONS */}
          <div className="mt-10 flex flex-wrap gap-4">
            
            {/* Primary CTA */}
            <button className="group px-8 py-4 text-base font-semibold text-white rounded-full bg-foodhub-maroon shadow-[0_4px_20px_theme(colors.foodhub-maroon/35%)] hover:shadow-[0_8px_30px_theme(colors.foodhub-maroon/50%)] hover:scale-[1.03] transition-all duration-300 flex items-center gap-2">
              Order Now

              <ArrowRight
                size={18}
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </button>

            {/* Secondary CTA */}
            <button className="px-8 py-4 text-base font-semibold text-foodhub-maroon rounded-full border border-foodhub-maroon/25 hover:border-foodhub-maroon hover:bg-foodhub-maroon/5 transition-all duration-300">
              Become a Provider
            </button>
          </div>
        </div>

        {/* RIGHT CONTENT */}
        <div className="relative h-[600px] hidden lg:block">

          {/* PREMIUM GLOW */}
          <div className="absolute top-20 left-20 h-72 w-72 rounded-full bg-foodhub-yellow/20 blur-[120px]" />
          <div className="absolute bottom-20 right-20 h-72 w-72 rounded-full bg-foodhub-maroon/10 blur-[120px]" />

          {/* Burger */}
          <div className="absolute top-10 left-16 bg-white rounded-[32px] shadow-[0_20px_60px_rgba(0,0,0,0.08)] p-6 rotate-[-6deg]">
            <img
              src="https://foodhub-flavorfinder.lovable.app/assets/hero-burger-BLklTCT1.png"
              alt="burger"
              className="w-32 h-32 object-contain"
            />
          </div>

          {/* Rice */}
          <div className="absolute top-0 right-10">
            <img
              src="https://foodhub-flavorfinder.lovable.app/assets/hero-bowl-77uF6LbK.png"
              alt="rice"
              className="w-48 h-48 rounded-full bg-white p-2 shadow-[0_20px_60px_rgba(0,0,0,0.08)]"
            />
          </div>

          {/* Pizza */}
          <div className="absolute bottom-12 left-20">
            <img
              src="https://foodhub-flavorfinder.lovable.app/assets/hero-pizza-Bv3DcA3F.png"
              alt="pizza"
              className="w-56 h-56 rounded-full bg-white p-2 shadow-[0_20px_60px_rgba(0,0,0,0.08)]"
            />
          </div>

          {/* Drink */}
          <div className="absolute bottom-10 right-10 bg-white rounded-[32px] shadow-[0_20px_60px_rgba(0,0,0,0.08)] p-6 rotate-[-6deg]">
            <img
              src="https://foodhub-flavorfinder.lovable.app/assets/hero-drink-gHSrV030.png"
              alt="drink"
              className="w-24 h-40 object-contain"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;