import Link from "next/link";
import { cn } from "@/lib/utils";
import { MEAL_CATEGORIES } from "@/data/mealForm.data";

interface MealsFilterProps {
  activeCategory?: string;
}

export function MealsFilter({ activeCategory }: MealsFilterProps) {
  return (
    <div className="flex gap-2 overflow-x-auto pb-2">
      <Link
        href="/provider/meals"
        className={cn(
          "shrink-0 rounded-full border px-4 py-1.5 text-sm transition",
          !activeCategory
            ? "border-foodhub-maroon bg-foodhub-maroon text-white"
            : "border-border text-foreground/70 hover:border-foodhub-maroon/50"
        )}
      >
        All
      </Link>

      {MEAL_CATEGORIES.map((category) => (
        <Link
          key={category.value}
          href={`/provider/meals?category=${category.value}`}
          className={cn(
            "shrink-0 rounded-full border px-4 py-1.5 text-sm transition",
            activeCategory === category.value
              ? "border-foodhub-maroon bg-foodhub-maroon text-white"
              : "border-border text-foreground/70 hover:border-foodhub-maroon/50"
          )}
        >
          {category.label}
        </Link>
      ))}
    </div>
  );
}