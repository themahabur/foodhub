import { MealsFilters } from "@/components/modules/dashboard/provider/meals/meals-filters";
import { MealsHeader } from "@/components/modules/dashboard/provider/meals/meals-header";
import { MealsTable } from "@/components/modules/dashboard/provider/meals/meals-table";
import { meals } from "@/data/meals.data";
import { mealService } from "@/services/meal.service";
import { Meal } from "@/types/meal/meal.types";

export default async function ProviderMealsPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; category?: string; availability?: string }>;
}) {


  const { q, category, availability } = await searchParams;

  const data = await mealService.getMeals();

  console.log(data);

  const meals = data.data;

  const filteredMeals = meals.filter((meal: Meal) => {
    const matchesQuery = q ? meal.title.toLowerCase().includes(q.toLowerCase()) : true;
    const matchesCategory = category ? meal.category.slug === category : true;
    const matchesAvailability =
      availability === "available"
        ? meal.isAvailable
        : availability === "unavailable"
          ? !meal.isAvailable
          : true;

    return matchesQuery && matchesCategory && matchesAvailability;
  });

  return (
    <div className="space-y-6">
      <MealsHeader />
      <MealsFilters />
      <MealsTable meals={filteredMeals} />
    </div>
  );
}