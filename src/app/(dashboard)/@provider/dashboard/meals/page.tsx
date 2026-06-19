import Link from "next/link";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { MEALS } from "@/data/meals.data";
import { MealsFilter } from "@/components/modules/dashboard/provider/meals/mealsFilter";
import { MealsEmptyState } from "@/components/modules/dashboard/provider/meals/mealsEmptyState";
import { MealCard } from "@/components/modules/dashboard/provider/meals/mealCard";

interface MealsPageProps {
  searchParams: Promise<{ category?: string }>;
}

export default async function MealsPage({ searchParams }: MealsPageProps) {
  const { category: activeCategory } = await searchParams;
  const meals = activeCategory
    ? MEALS.filter((meal) => meal.categoryId === activeCategory)
    : MEALS;

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="text-sm font-medium text-foodhub-maroon">Meals</p>
          <h1 className="mt-1 text-2xl font-semibold text-foreground sm:text-3xl">
            Your menu
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            {MEALS.length} meal{MEALS.length === 1 ? "" : "s"} on your menu
          </p>
        </div>
        <Button
          asChild
          className="bg-foodhub-maroon hover:bg-foodhub-maroon/90"
        >
          <Link href="/provider/meals/create">
            <Plus className="mr-2 h-4 w-4" />
            Add meal
          </Link>
        </Button>
      </div>
      <MealsFilter activeCategory={activeCategory} />
      {meals.length === 0 ? (
        <div className="mt-6">
          <MealsEmptyState />
        </div>
      ) : (
        <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {meals.map((meal) => (
            <MealCard key={meal.id} meal={meal} />
          ))}
        </div>
      )}
    </div>
  );
}