import Image from "next/image";
import { Plus, Star } from "lucide-react";

import type { Meal } from "@/types/meal.types";
import { EMOJI, TAG_COLORS } from "@/data/meals.data";

type MealCardProps = {
  meal: Meal;
};

export default function MealCard({ meal }: MealCardProps) {
  const tag = meal.tags[0];

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-3xl border border-gray-100 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:border-foodhub-maroon/20 hover:shadow-xl hover:shadow-foodhub-maroon/10">
      <div className="relative aspect-[4/3] overflow-hidden bg-gray-100">
        <Image
          src={meal.image}
          alt={meal.name}
          fill
          sizes="(max-width: 768px) 50vw, 33vw"
          className="object-cover transition duration-500 group-hover:scale-105"
        />

        <div
          className={`absolute left-3 top-3 flex size-5 items-center justify-center rounded-md border-2 bg-white ${
            meal.isVeg ? "border-green-600" : "border-red-600"
          }`}
        >
          <div
            className={`size-2 rounded-full ${
              meal.isVeg ? "bg-green-600" : "bg-red-600"
            }`}
          />
        </div>

        {tag && (
          <span
            className={`absolute right-3 top-3 rounded-full border px-2 py-1 text-[10px] font-extrabold ${
              TAG_COLORS[tag] ?? "border-gray-200 bg-white text-gray-600"
            }`}
          >
            {tag}
          </span>
        )}

        <div className="absolute bottom-3 left-3 rounded-full bg-white/90 px-3 py-1 text-xs font-bold text-gray-700 backdrop-blur">
          {EMOJI[meal.category] ?? "🍽️"} {meal.category}
        </div>
      </div>

      <div className="flex flex-1 flex-col p-3 md:p-4">
        <h3 className="line-clamp-1 text-sm font-extrabold text-gray-900 md:text-base">
          {meal.name}
        </h3>

        <p className="mt-1 line-clamp-1 text-xs text-gray-500">
          {meal.restaurant}
        </p>

        <div className="mt-3 flex items-center gap-2 text-xs text-gray-500">
          <Star className="size-3.5 fill-amber-400 text-amber-400" />
          <span className="font-bold text-gray-800">{meal.rating}</span>
          <span className="size-1 rounded-full bg-gray-300" />
          <span className="truncate">{meal.deliveryTime}</span>
        </div>

        <div className="mt-auto flex items-center justify-between pt-4">
          <span className="text-base font-extrabold text-gray-900">
            ৳{meal.price}
          </span>

          <button
            type="button"
            className="flex items-center gap-1 rounded-full border border-foodhub-maroon/30 px-3 py-1.5 text-xs font-bold text-foodhub-maroon transition hover:bg-foodhub-maroon hover:text-white"
          >
            <Plus className="size-3" />
            Add
          </button>
        </div>
      </div>
    </article>
  );
}