import Image from "next/image";
import Link from "next/link";
import { Clock, MapPin, Star } from "lucide-react";

import type { Restaurant } from "@/types/restaurant.types";
import { RESTAURANT_TAG_COLORS } from "@/data/restaurants.data";

type RestaurantCardProps = {
  restaurant: Restaurant;
};

export default function RestaurantCard({ restaurant }: RestaurantCardProps) {
  const tag = restaurant.tags[0];

  return (
    <Link
      href={`/restaurants/${restaurant.id}`}
      className="group block h-full overflow-hidden rounded-3xl border border-gray-100 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:border-foodhub-maroon/20 hover:shadow-xl hover:shadow-foodhub-maroon/10"
    >
      <div className="relative h-40 w-full overflow-hidden bg-gray-100">
        <Image
          src={restaurant.image}
          alt={restaurant.name}
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
          className="object-cover transition duration-500 group-hover:scale-105"
        />

        {!restaurant.isOpen && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/50">
            <span className="rounded-full bg-black/40 px-3 py-1 text-xs font-bold uppercase tracking-widest text-white">
              Closed
            </span>
          </div>
        )}

        {tag && (
          <span
            className={`absolute right-3 top-3 rounded-full border px-2 py-1 text-[10px] font-extrabold ${
              RESTAURANT_TAG_COLORS[tag] ??
              "border-gray-200 bg-white text-gray-600"
            }`}
          >
            {tag}
          </span>
        )}

        <span
          className={`absolute bottom-3 left-3 flex size-11 items-center justify-center rounded-2xl text-base font-extrabold shadow-sm ${restaurant.color}`}
        >
          {restaurant.initial}
        </span>
      </div>

      <div className="p-4">
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0">
            <h3 className="truncate text-base font-extrabold text-gray-900 transition group-hover:text-foodhub-maroon">
              {restaurant.name}
            </h3>

            <p className="mt-1 truncate text-xs text-gray-500">
              {restaurant.cuisines.join(" · ")}
            </p>
          </div>

          <span
            className={`shrink-0 rounded-full px-2 py-1 text-[10px] font-bold ${
              restaurant.isOpen
                ? "bg-green-50 text-green-600"
                : "bg-red-50 text-red-600"
            }`}
          >
            {restaurant.isOpen ? "Open" : "Closed"}
          </span>
        </div>

        <div className="mt-4 flex flex-wrap items-center gap-2 text-xs text-gray-500">
          <span className="flex items-center gap-1">
            <Star className="size-3.5 fill-amber-400 text-amber-400" />
            <span className="font-bold text-gray-800">
              {restaurant.rating}
            </span>
          </span>

          <span className="size-1 rounded-full bg-gray-300" />

          <span className="flex items-center gap-1">
            <Clock className="size-3.5" />
            {restaurant.deliveryTime}
          </span>

          <span className="size-1 rounded-full bg-gray-300" />

          <span className="flex items-center gap-1">
            <MapPin className="size-3.5 text-foodhub-maroon" />
            {restaurant.location}
          </span>
        </div>

        <p className="mt-3 text-xs text-gray-400">
          Min. order:{" "}
          <span className="font-semibold text-gray-700">
            ৳{restaurant.minOrder}
          </span>
        </p>
      </div>
    </Link>
  );
}