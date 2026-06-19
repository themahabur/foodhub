import { MealsFilters } from "@/components/modules/dashboard/provider/meals/meals-filters";
import { MealsHeader } from "@/components/modules/dashboard/provider/meals/meals-header";
import { MealsTable } from "@/components/modules/dashboard/provider/meals/meals-table";
import { meals } from "@/data/meals.data";

export default async function ProviderMealsPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; category?: string; availability?: string }>;
}) {
  const { q, category, availability } = await searchParams;

  const filteredMeals = meals.filter((meal) => {
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