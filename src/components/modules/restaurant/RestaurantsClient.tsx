"use client";

import { useMemo, useState } from "react";
import { ArrowUpDown, MapPin, Search, SlidersHorizontal, X } from "lucide-react";

import type {
  Restaurant,
  RestaurantSortValue,
} from "@/types/restaurant.types";

import {
  RESTAURANT_CATEGORIES,
  RESTAURANT_LOCATIONS,
  RESTAURANT_SORT_OPTIONS,
} from "@/data/restaurants.data";



import {
  FadeUpOnScroll,
  StaggerContainer,
  StaggerItem,
} from "@/components/shared/motion/motion-wrapper";
import RestaurantDropdown from "./RestaurantDropdown";
import RestaurantFilterPanel from "./RestaurantFilterPanel";
import RestaurantCard from "./RestaurantCard";
import MobileRestaurantFilterDrawer from "./MobileRestaurantFilterDrawer";

type RestaurantsClientProps = {
  restaurants: Restaurant[];
};

export default function RestaurantsClient({
  restaurants,
}: RestaurantsClientProps) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");
  const [location, setLocation] = useState("All Areas");
  const [sort, setSort] = useState<RestaurantSortValue>("relevance");
  const [openOnly, setOpenOnly] = useState(false);
  const [filterOpen, setFilterOpen] = useState(false);

  const filteredRestaurants = useMemo(() => {
    const searchedRestaurants = restaurants.filter((restaurant) => {
      const searchText = query.toLowerCase();

      const matchedSearch =
        restaurant.name.toLowerCase().includes(searchText) ||
        restaurant.cuisines.some((cuisine) =>
          cuisine.toLowerCase().includes(searchText)
        );

      const matchedCategory =
        category === "All" || restaurant.category === category;

      const matchedLocation =
        location === "All Areas" || restaurant.location === location;

      const matchedAvailability = !openOnly || restaurant.isOpen;

      return (
        matchedSearch &&
        matchedCategory &&
        matchedLocation &&
        matchedAvailability
      );
    });

    if (sort === "rating") {
      return [...searchedRestaurants].sort((a, b) => b.rating - a.rating);
    }

    if (sort === "delivery") {
      return [...searchedRestaurants].sort(
        (a, b) => parseInt(a.deliveryTime) - parseInt(b.deliveryTime)
      );
    }

    if (sort === "order_asc") {
      return [...searchedRestaurants].sort((a, b) => a.minOrder - b.minOrder);
    }

    return searchedRestaurants;
  }, [restaurants, query, category, location, sort, openOnly]);

  const hasFilters =
    category !== "All" || location !== "All Areas" || openOnly;

  const clearFilters = () => {
    setCategory("All");
    setLocation("All Areas");
    setOpenOnly(false);
  };

  const clearEverything = () => {
    clearFilters();
    setQuery("");
    setSort("relevance");
  };

  return (
    <main className="min-h-screen bg-[#FAF7F4]">

      <section className="container mx-auto px-4 py-6 md:px-8">
<FadeUpOnScroll className="mt-5 mb-7 rounded-[28px] border border-foodhub-maroon/10 bg-white/90 p-3 shadow-[0_18px_50px_rgba(128,0,32,0.08)] backdrop-blur">
  <div className="flex items-center gap-2 sm:gap-3">
    {/* Search Box */}
    <div className="group flex min-h-[54px] min-w-0 flex-1 items-center gap-3 rounded-2xl border border-gray-200 bg-gray-50/80 px-3 sm:px-4 transition-all duration-300 focus-within:border-foodhub-maroon/40 focus-within:bg-white focus-within:shadow-[0_10px_30px_rgba(128,0,32,0.10)]">
      <div className="flex size-9 shrink-0 items-center justify-center rounded-full bg-white text-gray-400 shadow-sm transition group-focus-within:bg-foodhub-maroon group-focus-within:text-white">
        <Search className="size-4" />
      </div>

      <input
        type="text"
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        placeholder="Search restaurants..."
        className="w-full min-w-0 bg-transparent text-sm font-medium text-gray-700 outline-none placeholder:font-normal placeholder:text-gray-400"
      />

      {query && (
        <button
          type="button"
          onClick={() => setQuery("")}
          aria-label="Clear search"
          className="flex size-8 shrink-0 items-center justify-center rounded-full bg-white text-gray-400 shadow-sm transition hover:bg-foodhub-maroon hover:text-white"
        >
          <X className="size-4" />
        </button>
      )}
    </div>

    {/* Location Icon Dropdown */}
    <RestaurantDropdown
      icon={<MapPin className="size-5" />}
      value={location}
      options={RESTAURANT_LOCATIONS}
      onChange={setLocation}
      iconOnly
      ariaLabel="Select location"
    />

    {/* Sort Icon Dropdown */}
    <RestaurantDropdown
      icon={<ArrowUpDown className="size-5" />}
      value={sort}
      options={RESTAURANT_SORT_OPTIONS}
      onChange={(value) => setSort(value as RestaurantSortValue)}
      getLabel={(value) =>
        RESTAURANT_SORT_OPTIONS.find((option) => option.value === value)
          ?.label ?? "Relevance"
      }
      iconOnly
      ariaLabel="Sort restaurants"
    />

    {/* Filter Icon Button */}
    <button
      type="button"
      onClick={() => setFilterOpen(true)}
      aria-label="Open filters"
      title="Filters"
      className={`flex size-[54px] shrink-0 items-center justify-center rounded-2xl border transition-all duration-300 ${
        hasFilters
          ? "border-foodhub-maroon bg-foodhub-maroon text-white shadow-[0_14px_30px_rgba(128,0,32,0.22)]"
          : "border-gray-200 bg-white text-gray-500 shadow-sm hover:border-foodhub-maroon/30 hover:bg-foodhub-maroon/5 hover:text-foodhub-maroon"
      } lg:hidden`}
    >
      <SlidersHorizontal className="size-5" />
    </button>
  </div>
</FadeUpOnScroll>

        <div className="mb-5 flex gap-2 overflow-x-auto pb-2 lg:hidden">
          {RESTAURANT_CATEGORIES.map((item) => (
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
              <FilterChip
                label={category}
                onRemove={() => setCategory("All")}
              />
            )}

            {location !== "All Areas" && (
              <FilterChip
                label={location}
                onRemove={() => setLocation("All Areas")}
              />
            )}

            {openOnly && (
              <FilterChip
                label="Open now"
                onRemove={() => setOpenOnly(false)}
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

              <RestaurantFilterPanel
                category={category}
                setCategory={setCategory}
                openOnly={openOnly}
                setOpenOnly={setOpenOnly}
              />
            </div>
          </aside>

          <div className="min-w-0 flex-1">
            <div className="mb-4 flex items-center justify-between">
              <div>
                <h2 className="text-lg font-extrabold text-gray-900">
                  Available Restaurants
                </h2>
                <p className="text-sm text-gray-500">
                  {filteredRestaurants.length} restaurants near you
                </p>
              </div>
            </div>

            {filteredRestaurants.length === 0 ? (
              <div className="rounded-3xl border border-dashed border-gray-200 bg-white py-20 text-center">
                <div className="mb-4 text-5xl">🍽️</div>

                <h3 className="text-lg font-bold text-gray-900">
                  No restaurants found
                </h3>

                <p className="mt-1 text-sm text-gray-500">
                  Try changing your area or cuisine.
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
              <StaggerContainer className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
                {filteredRestaurants.map((restaurant) => (
                  <StaggerItem key={restaurant.id}>
                    <RestaurantCard restaurant={restaurant} />
                  </StaggerItem>
                ))}
              </StaggerContainer>
            )}
          </div>
        </div>
      </section>

      <MobileRestaurantFilterDrawer

        open={filterOpen}
        onClose={() => setFilterOpen(false)}
        category={category}
        setCategory={setCategory}
        openOnly={openOnly}
        setOpenOnly={setOpenOnly}
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