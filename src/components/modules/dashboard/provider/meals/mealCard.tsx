import { MEAL_CATEGORIES } from "@/data/mealForm.data";
import { Meal } from "@/types/meal.types";
import Image from "next/image";
import { MealActionsMenu } from "./mealActionsMenu";
import { MealStatusToggle } from "./mealStatusToggle";


interface MealCardProps {
  meal: Meal;
}

export function MealCard({ meal }: MealCardProps) {
  const categoryLabel = MEAL_CATEGORIES.find(
    (category) => category.value === meal.categoryId
  )?.label;

  return (
    <div className="group overflow-hidden rounded-2xl border border-gray-200 bg-white transition hover:shadow-md">
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-gray-100">
        <Image
          src={meal.image}
          alt={meal.title}
          fill
          className="object-cover"
        />

        <div className="absolute right-2 top-2">
          <MealActionsMenu mealId={meal.id} mealName={meal.title} />
        </div>

        {!meal.isAvailable && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-900/50">
            <span className="rounded-full bg-white px-3 py-1 text-xs font-medium text-gray-900">
              Out of stock
            </span>
          </div>
        )}
      </div>

      <div className="space-y-2 p-4">
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-medium text-gray-900">{meal.title}</h3>
          <span className="whitespace-nowrap font-semibold text-foodhub-maroon">
            ৳{meal.price}
          </span>
        </div>

        <p className="text-xs text-gray-500">{categoryLabel}</p>

        <p className="line-clamp-2 text-sm text-gray-600">
          {meal.description}
        </p>

        <div className="flex items-center justify-between border-t border-gray-200 pt-3">
          <span className="text-xs text-gray-500">
            {meal.isAvailable ? "Available" : "Unavailable"}
          </span>
          <MealStatusToggle
            mealId={meal.id}
            initialAvailable={meal.isAvailable}
          />
        </div>
      </div>
    </div>
  );
}