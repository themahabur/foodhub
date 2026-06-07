"use client";

import { useState } from "react";
import { Search, MapPin, ChevronDown, ArrowRight } from "lucide-react";
import { motion } from "motion/react";
import { DEFAULT_CITIES, floatingFoods } from "@/data/navbar.data";
import Image from "next/image";

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, delay, ease: "easeOut" as const },
});

export default function HeroSection() {
  const [query, setQuery] = useState("");
  const [city, setCity] = useState("Kolkata");
  const [cityOpen, setCityOpen] = useState(false);

  return (
    <section className="relative w-full flex items-center bg-white">
      {/* Soft radial gradient background — right side */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute right-0 top-0 w-[60%] h-full"
          style={{
            background:
              "radial-gradient(ellipse 80% 60% at 80% 50%, #fce8e8 0%, #fff5e6 50%, transparent 80%)",
          }}
        />
      </div>

      {/* Decorative rings */}
      <div
        aria-hidden="true"
        className="absolute right-[18%] top-1/2 -translate-y-1/2 w-[420px] h-[420px] rounded-full border border-red-100 opacity-60 pointer-events-none"
      />
      <div
        aria-hidden="true"
        className="absolute right-[22%] top-1/2 -translate-y-1/2 w-[300px] h-[300px] rounded-full border border-amber-100 opacity-50 pointer-events-none"
      />

      <div className="relative z-20 w-full container mx-auto px-6 lg:px-16 flex flex-col lg:flex-row items-center gap-6 py-16">
        {/* ── LEFT: Copy ── */}
        <div className="flex-1">
          {/* Badge */}
          <motion.span
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="inline-flex items-center gap-2 text-xs font-semibold tracking-widest uppercase text-foodhub-maroon bg-red-50 border border-red-100 px-3 py-1 rounded-full mb-6"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-foodhub-maroon animate-pulse" />
            Free delivery on first order
          </motion.span>

          {/* Headline */}
          <motion.h1
            {...fadeUp(0.1)}
            className="text-5xl lg:text-6xl font-extrabold leading-[1.1] tracking-tight text-gray-900 mb-3"
          >
            Discover Flavors
            <br />
            That Make
          </motion.h1>
          <motion.h1
            {...fadeUp(0.2)}
            className="text-5xl lg:text-6xl font-extrabold leading-[1.1] tracking-tight text-[#E8A020] mb-6"
          >
            You Smile
          </motion.h1>

          {/* Sub-copy */}
          <motion.p
            {...fadeUp(0.3)}
            className="text-gray-500 text-lg leading-relaxed mb-10 max-w-md"
          >
            Explore meals from top local providers and enjoy
            <br className="hidden sm:block" />
            delivery to your door.
          </motion.p>

          {/* Search bar */}
          <motion.div {...fadeUp(0.4)} className="relative mb-6">
            <div className="flex items-stretch bg-white border border-gray-200 rounded-full shadow-[0_4px_24px_0_rgba(0,0,0,0.08)]">
              {/* Search icon */}
              <div className="flex items-center pl-4 pr-2 text-gray-400">
                <Search size={18} strokeWidth={2} />
              </div>

              {/* Input */}
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search for meals, cuisines or providers..."
                className="flex-1 py-3.5 text-sm text-gray-700 placeholder-gray-400 bg-transparent outline-none min-w-0"
              />

              {/* City picker */}
              <div className="relative flex items-center border-l border-gray-100 px-3">
                <button
                  onClick={() => setCityOpen(!cityOpen)}
                  className="flex items-center gap-1 text-sm text-gray-600 hover:text-foodhub-maroon transition-colors py-1 whitespace-nowrap"
                >
                  <MapPin size={14} className="text-foodhub-maroon" />
                  {city}
                  <ChevronDown
                    size={13}
                    className={`transition-transform duration-200 ${cityOpen ? "rotate-180" : ""}`}
                  />
                </button>

                {/* Dropdown — rendered outside overflow container */}
                {cityOpen && (
                  <>
                    {/* Backdrop to close on outside click */}
                    <div
                      className="fixed inset-0 z-40"
                      onClick={() => setCityOpen(false)}
                    />
                    <div className="absolute top-full right-0 w-36 bg-white rounded-xl shadow-xl border border-gray-100 py-1 z-50">
                      {DEFAULT_CITIES.map((c) => (
                        <button
                          key={c}
                          onClick={() => {
                            setCity(c);
                            setCityOpen(false);
                          }}
                          className={`w-full text-left text-sm px-4 py-2 hover:bg-red-50 transition-colors ${
                            c === city
                              ? "text-foodhub-maroon font-medium"
                              : "text-gray-600"
                          }`}
                        >
                          {c}
                        </button>
                      ))}
                    </div>
                  </>
                )}
              </div>

              {/* Search button */}
              <button className="cursor-pointer bg-foodhub-maroon shadow-[0_2px_12px_theme(colors.foodhub-maroon/35%)] hover:shadow-[0_4px_20px_theme(colors.foodhub-maroon/50%)] hover:scale-[1.03] active:scale-[0.98] transition-all duration-200 tracking-wide text-white text-sm font-semibold px-6 rounded-full m-1.5">
                Search
              </button>
            </div>
          </motion.div>

          {/* CTAs */}
          <motion.div
            {...fadeUp(0.5)}
            className="flex flex-wrap items-center gap-4"
          >
            <button className="cursor-pointer inline-flex items-center gap-2 text-white font-semibold text-sm px-7 py-3.5 rounded-full bg-foodhub-maroon shadow-[0_2px_12px_theme(colors.foodhub-maroon/35%)] hover:shadow-[0_4px_20px_theme(colors.foodhub-maroon/50%)] hover:scale-[1.03] active:scale-[0.98] transition-all duration-200 tracking-wide">
              Order Now
              <ArrowRight size={16} strokeWidth={2.5} />
            </button>
            <button className="cursor-pointer inline-flex items-center gap-2 text-foodhub-maroon border border-foodhub-maroon/25 hover:border-foodhub-maroon hover:bg-foodhub-maroon/5 duration-200 tracking-wide font-semibold text-sm px-7 py-3.5 rounded-full transition-all">
              Become a Provider
            </button>
          </motion.div>
        </div>

        {/* ── RIGHT: Floating food images ── */}
        <div className="flex-1 relative min-h-105 hidden lg:block">
          {floatingFoods.map((food) => (
            <motion.div
              key={food.id}
              className={`absolute ${food.position} ${food.size} ${food.rotate} ${food.zIndex}`}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{
                opacity: 1,
                scale: 1,
                y: [0, -12, 0],
              }}
              transition={{
                opacity: { duration: 0.5, delay: parseFloat(food.delay) },
                scale: { duration: 0.5, delay: parseFloat(food.delay) },
                y: {
                  duration: 5,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: parseFloat(food.delay),
                },
              }}
            >
              <div
                className={`w-full h-full ${food.shape} bg-white shadow-[0_8px_32px_0_rgba(0,0,0,0.10)] overflow-hidden flex items-center justify-center p-3`}
              >
                <Image
                  width={200}
                  height={200}
                  src={food.src}
                  alt={food.alt}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    const colors: Record<string, string> = {
                      Burger: "from-amber-100 to-orange-100",
                      "Salad Bowl": "from-green-100 to-teal-100",
                      Pizza: "from-red-100 to-orange-100",
                      Drink: "from-pink-100 to-red-100",
                    };
                    (e.target as HTMLImageElement).style.display = "none";
                    const parent = (e.target as HTMLImageElement).parentElement;
                    if (parent) {
                      parent.innerHTML = `<div class="w-full h-full flex items-center justify-center text-4xl bg-gradient-to-br ${
                        colors[food.alt] ?? "from-gray-100 to-gray-200"
                      } rounded-xl">${
                        food.alt === "Burger"
                          ? "🍔"
                          : food.alt === "Salad Bowl"
                            ? "🥗"
                            : food.alt === "Pizza"
                              ? "🍕"
                              : "🥤"
                      }</div>`;
                    }
                  }}
                />
              </div>
            </motion.div>
          ))}

          {/* Floating badge — delivery time */}
          <motion.div
            {...fadeUp(1.4)}
            className="absolute top-24 left-40 z-20 bg-white rounded-2xl shadow-lg px-4 py-2.5 flex items-center gap-2.5 border border-gray-50"
          >
            <div className="w-8 h-8 rounded-full bg-amber-50 flex items-center justify-center text-lg">
              ⏱
            </div>
            <div>
              <p className="text-xs text-gray-400 leading-none mb-0.5">
                Avg. delivery
              </p>
              <p className="text-sm font-bold text-gray-800 leading-none">
                25 min
              </p>
            </div>
          </motion.div>

          {/* Floating badge — orders today */}
          <motion.div
            {...fadeUp(1.6)}
            className="absolute bottom-2 right-2 z-20 bg-white rounded-2xl shadow-lg px-4 py-2.5 flex items-center gap-2.5 border border-gray-50"
          >
            <div className="w-8 h-8 rounded-full bg-red-50 flex items-center justify-center text-lg">
              🔥
            </div>
            <div>
              <p className="text-xs text-gray-400 leading-none mb-0.5">
                Orders today
              </p>
              <p className="text-sm font-bold text-gray-800 leading-none">
                12,430+
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
