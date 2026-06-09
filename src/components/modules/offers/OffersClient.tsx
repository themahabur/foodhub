"use client";

import { useMemo, useState } from "react";
import { Search, SlidersHorizontal, Tag, X } from "lucide-react";

import type { Offer, OfferSortValue } from "@/types/offer.types";
import {
  OFFER_CATEGORIES,
  OFFER_SORT_OPTIONS,
  OFFER_TAGS,
} from "@/data/offers.data";

import OfferCard from "./OfferCard";
import OfferDropdown from "./OfferDropdown";
import OfferFilterPanel from "./OfferFilterPanel";

import {
  FadeUpOnScroll,
  StaggerContainer,
  StaggerItem,
} from "@/components/shared/motion/motion-wrapper";

type OffersClientProps = {
  offers: Offer[];
};

export default function OffersClient({ offers }: OffersClientProps) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");
  const [tagFilter, setTagFilter] = useState("All Tags");
  const [sort, setSort] = useState<OfferSortValue>("default");

  const filteredOffers = useMemo(() => {
    const searchedOffers = offers.filter((offer) => {
      const searchText = query.toLowerCase();

      const matchedSearch =
        offer.title.toLowerCase().includes(searchText) ||
        offer.code.toLowerCase().includes(searchText) ||
        offer.description.toLowerCase().includes(searchText) ||
        (offer.restaurant ?? "").toLowerCase().includes(searchText);

      const matchedCategory =
        category === "All" || offer.category === category;

      const matchedTag = tagFilter === "All Tags" || offer.tag === tagFilter;

      return matchedSearch && matchedCategory && matchedTag;
    });

    if (sort === "discount") {
      return [...searchedOffers].sort(
        (a, b) => getDiscountNumber(b.discount) - getDiscountNumber(a.discount)
      );
    }

    if (sort === "minorder") {
      return [...searchedOffers].sort((a, b) => a.minOrder - b.minOrder);
    }

    return searchedOffers;
  }, [offers, query, category, tagFilter, sort]);

  const hasFilters =
    category !== "All" || tagFilter !== "All Tags" || query !== "";

  const clearFilters = () => {
    setCategory("All");
    setTagFilter("All Tags");
  };

  const clearEverything = () => {
    clearFilters();
    setQuery("");
    setSort("default");
  };

  return (
    <main className="min-h-screen bg-[#FAF7F4]">
      {/* <section className="relative overflow-hidden bg-foodhub-maroon text-white">
        <div className="absolute -left-24 -top-24 size-80 rounded-full bg-white/10 blur-3xl" />
        <div className="absolute -right-24 top-8 size-80 rounded-full bg-foodhub-yellow/20 blur-3xl" />

        <div className="container relative mx-auto px-4 py-10 md:px-8 md:py-14">
          <FadeUpOnScroll>
            <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-1.5 text-xs font-semibold text-white/90">
              <Tag className="size-3.5" />
              FoodHub Offers
            </span>

            <h1 className="mt-5 max-w-2xl text-3xl font-extrabold leading-tight md:text-5xl">
              Save more with exclusive coupons and food deals.
            </h1>

            <p className="mt-4 max-w-xl text-sm leading-6 text-white/70 md:text-base">
              Copy a coupon code and use it during checkout to enjoy delicious
              meals for less.
            </p>
          </FadeUpOnScroll>
        </div>
      </section> */}

      <section className="container mx-auto px-4 py-6 md:px-8">
        <FadeUpOnScroll className="mt-4 mb-6 rounded-3xl border border-white/70 bg-white p-4 shadow-sm shadow-foodhub-maroon/10">
          <div className="flex flex-col gap-3 lg:flex-row">
            <div className="flex flex-1 items-center gap-2 rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3">
              <Search className="size-4 shrink-0 text-gray-400" />

              <input
                type="text"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search offers, restaurants or coupon codes..."
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

            <OfferDropdown
              value={sort}
              options={OFFER_SORT_OPTIONS}
              onChange={(value) => setSort(value as OfferSortValue)}
              getLabel={(value) =>
                OFFER_SORT_OPTIONS.find((option) => option.value === value)
                  ?.label ?? "Default"
              }
            />
          </div>
        </FadeUpOnScroll>

        <div className="mb-5 flex gap-2 overflow-x-auto pb-2">
          {OFFER_CATEGORIES.map((item) => (
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

              <OfferFilterPanel
                category={category}
                setCategory={setCategory}
                tagFilter={tagFilter}
                setTagFilter={setTagFilter}
              />
            </div>
          </aside>

          <div className="min-w-0 flex-1">
            <div className="mb-5 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
              <div>
                <h2 className="text-lg font-extrabold text-gray-900">
                  Active Offers
                </h2>
                <p className="text-sm text-gray-500">
                  {filteredOffers.length} offers available
                </p>
              </div>

              <div className="flex gap-2 overflow-x-auto pb-1 lg:hidden">
                {OFFER_TAGS.map((tag) => (
                  <button
                    key={tag}
                    type="button"
                    onClick={() => setTagFilter(tag)}
                    className={`shrink-0 rounded-full border px-4 py-2 text-xs font-bold transition ${
                      tagFilter === tag
                        ? "border-foodhub-maroon bg-foodhub-maroon text-white"
                        : "border-gray-200 bg-white text-gray-600"
                    }`}
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>

            {hasFilters && (
              <div className="mb-5 flex flex-wrap gap-2">
                {query && (
                  <FilterChip label={`Search: ${query}`} onRemove={() => setQuery("")} />
                )}

                {category !== "All" && (
                  <FilterChip
                    label={category}
                    onRemove={() => setCategory("All")}
                  />
                )}

                {tagFilter !== "All Tags" && (
                  <FilterChip
                    label={tagFilter}
                    onRemove={() => setTagFilter("All Tags")}
                  />
                )}
              </div>
            )}

            {filteredOffers.length === 0 ? (
              <div className="rounded-3xl border border-dashed border-gray-200 bg-white py-20 text-center">
                <div className="mb-4 text-5xl">🏷️</div>

                <h3 className="text-lg font-bold text-gray-900">
                  No offers found
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
              <StaggerContainer className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
                {filteredOffers.map((offer) => (
                  <StaggerItem key={offer.id}>
                    <OfferCard offer={offer} />
                  </StaggerItem>
                ))}
              </StaggerContainer>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}

function getDiscountNumber(discount: string) {
  const number = parseFloat(discount.replace(/[^\d.]/g, ""));
  return Number.isNaN(number) ? 0 : number;
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