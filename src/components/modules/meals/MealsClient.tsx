"use client";

import { useMemo, useState } from "react";
import { Search, SlidersHorizontal, X } from "lucide-react";

import type { Meal, SortValue } from "@/types/meal.types";
import { CATEGORIES, SORT_OPTIONS } from "@/data/meals.data";


import {
  FadeUpOnScroll,
  StaggerContainer,
  StaggerItem,
} from "@/components/shared/motion/motion-wrapper";
import SortDropdown from "./SortDropdown";
import FilterPanel from "./FilterPanel";
import MealCard from "./MealCard";
import MobileFilterDrawer from "./MobileFilterDrawer";

type MealsClientProps = {
  meals: Meal[];
};

export default function MealsClient({ meals }: MealsClientProps) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");
  const [sort, setSort] = useState<SortValue>("relevance");
  const [vegOnly, setVegOnly] = useState(false);
  const [maxPrice, setMaxPrice] = useState(400);
  const [filterOpen, setFilterOpen] = useState(false);

  const filteredMeals = useMemo(() => {
    const searchedMeals = meals.filter((meal) => {
      const searchText = query.toLowerCase();

      const matchedSearch =
        meal.name.toLowerCase().includes(searchText) ||
        meal.restaurant.toLowerCase().includes(searchText);

      const matchedCategory = category === "All" || meal.category === category;
      const matchedDiet = !vegOnly || meal.isVeg;
      const matchedPrice = meal.price <= maxPrice;

      return matchedSearch && matchedCategory && matchedDiet && matchedPrice;
    });

    if (sort === "rating") {
      return [...searchedMeals].sort((a, b) => b.rating - a.rating);
    }

    if (sort === "price_asc") {
      return [...searchedMeals].sort((a, b) => a.price - b.price);
    }

    if (sort === "price_desc") {
      return [...searchedMeals].sort((a, b) => b.price - a.price);
    }

    if (sort === "delivery") {
      return [...searchedMeals].sort(
        (a, b) => parseInt(a.deliveryTime) - parseInt(b.deliveryTime)
      );
    }

    return searchedMeals;
  }, [meals, query, category, sort, vegOnly, maxPrice]);

  const hasFilters = category !== "All" || vegOnly || maxPrice < 400;

  const clearFilters = () => {
    setCategory("All");
    setVegOnly(false);
    setMaxPrice(400);
  };

  const clearEverything = () => {
    clearFilters();
    setQuery("");
    setSort("relevance");
  };

  return (
    <main className="bg-foodhub-maroon/5">

      <section className="container mx-auto px-4 py-6 md:px-8">
        <FadeUpOnScroll className="mt-4 mb-6 rounded-3xl border border-white/70 bg-white p-4 shadow-sm  shadow-foodhub-maroon/10">
          <div className="flex flex-col gap-3 md:flex-row">
            <div className="flex flex-1 items-center gap-2 rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3">
              <Search className="size-4 shrink-0 text-gray-400" />

              <input
                type="text"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search meals or restaurants..."
                className="w-full bg-transparent text-sm text-gray-700 outline-none placeholder:text-gray-400"
              />

              {query && (
                <button
                  type="button"
                  onClick={() => setQuery("")}
                  className="text-gray-400 transition hover:text-foodhub-maroon"
                >
                  <X className="size-4" />
                </button>
              )}
            </div>

            <SortDropdown
              sort={sort}
              setSort={setSort}
              options={SORT_OPTIONS}
            />

            <button
              type="button"
              onClick={() => setFilterOpen(true)}
              className={`flex items-center justify-center gap-2 rounded-2xl border px-5 py-3 text-sm font-semibold transition lg:hidden ${
                hasFilters
                  ? "border-foodhub-maroon bg-foodhub-maroon text-white"
                  : "border-gray-200 bg-white text-gray-600"
              }`}
            >
              <SlidersHorizontal className="size-4" />
              Filters
            </button>
          </div>
        </FadeUpOnScroll>

        <div className="mb-5 flex gap-2 overflow-x-auto pb-2 lg:hidden">
          {CATEGORIES.map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => setCategory(item)}
              className={`shrink-0 rounded-full border px-4 py-2 text-xs font-bold transition ${
                category === item
                  ? "border-foodhub-maroon bg-foodhub-maroon text-white"
                  : "border-gray-200 bg-white text-gray-600"
              }`}
            >
              {item}
            </button>
          ))}
        </div>

        {hasFilters && (
          <div className="mb-5 flex flex-wrap gap-2">
            {category !== "All" && (
              <FilterChip label={category} onRemove={() => setCategory("All")} />
            )}

            {vegOnly && (
              <FilterChip label="Veg only" onRemove={() => setVegOnly(false)} />
            )}

            {maxPrice < 400 && (
              <FilterChip
                label={`Under ৳${maxPrice}`}
                onRemove={() => setMaxPrice(400)}
              />
            )}
          </div>
        )}

        <div className="flex gap-6">
          <aside className="hidden w-64 shrink-0 lg:block">
            <div className="sticky top-24 rounded-3xl border border-gray-100 bg-white p-5 shadow-sm">
              <div className="mb-5 flex items-center justify-between">
                <div className="flex items-center gap-2 text-sm font-bold text-gray-900">
                  <SlidersHorizontal className="size-4 text-foodhub-maroon" />
                  Filters
                </div>

                {hasFilters && (
                  <button
                    type="button"
                    onClick={clearFilters}
                    className="text-xs font-semibold text-foodhub-maroon hover:underline"
                  >
                    Clear all
                  </button>
                )}
              </div>

              <FilterPanel
                category={category}
                setCategory={setCategory}
                vegOnly={vegOnly}
                setVegOnly={setVegOnly}
                maxPrice={maxPrice}
                setMaxPrice={setMaxPrice}
              />
            </div>
          </aside>

          <div className="min-w-0 flex-1">
            <div className="mb-4 flex items-center justify-between">
              <div>
                <h2 className="text-lg font-extrabold text-gray-900">
                  Available Meals
                </h2>
                <p className="text-sm text-gray-500">
                  {filteredMeals.length} meals found
                </p>
              </div>
            </div>

            {filteredMeals.length === 0 ? (
              <div className="rounded-3xl border border-dashed border-gray-200 bg-white py-20 text-center">
                <div className="mb-4 text-5xl">🍽️</div>
                <h3 className="text-lg font-bold text-gray-900">
                  No meals found
                </h3>
                <p className="mt-1 text-sm text-gray-500">
                  Try changing your search or filters.
                </p>

                <button
                  type="button"
                  onClick={clearEverything}
                  className="mt-5 rounded-full border border-foodhub-maroon/30 px-5 py-2 text-sm font-semibold text-foodhub-maroon transition hover:bg-foodhub-maroon hover:text-white"
                >
                  Clear everything
                </button>
              </div>
            ) : (
              <StaggerContainer className="grid grid-cols-2 gap-3 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-3 md:gap-5">
                {filteredMeals.map((meal) => (
                  <StaggerItem key={meal.id}>
                    <MealCard meal={meal} />
                  </StaggerItem>
                ))}
              </StaggerContainer>
            )}
          </div>
        </div>
      </section>

      <MobileFilterDrawer
        open={filterOpen}
        onClose={() => setFilterOpen(false)}
        category={category}
        setCategory={setCategory}
        vegOnly={vegOnly}
        setVegOnly={setVegOnly}
        maxPrice={maxPrice}
        setMaxPrice={setMaxPrice}
      />
    </main>
  );
}

type FilterChipProps = {
  label: string;
  onRemove: () => void;
};

function FilterChip({ label, onRemove }: FilterChipProps) {
  return (
    <span className="inline-flex items-center gap-1 rounded-full bg-foodhub-maroon/10 px-3 py-1 text-xs font-semibold text-foodhub-maroon">
      {label}
      <button type="button" onClick={onRemove}>
        <X className="size-3" />
      </button>
    </span>
  );
}