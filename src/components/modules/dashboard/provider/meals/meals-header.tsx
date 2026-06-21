import Link from "next/link";
import { ChefHat, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

export function MealsHeader() {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex items-center gap-3">
        <div className="flex size-11 items-center justify-center rounded-xl bg-gradient-to-br from-foodhub-maroon to-foodhub-maroon/70 text-white shadow-sm">
          <ChefHat className="size-5" />
        </div>
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-gray-900">
            Meals
          </h1>
          <p className="text-sm text-gray-500">
            Manage your menu items, pricing & availability
          </p>
        </div>
      </div>

      <Button
        asChild
        size="lg"
        className="bg-foodhub-maroon text-white shadow-md shadow-foodhub-maroon/20 transition-all hover:bg-foodhub-maroon/90 hover:shadow-lg hover:shadow-foodhub-maroon/30"
      >
        <Link href="/dashboard/meals/new">
          <Plus className="size-4" />
          Add Meal
        </Link>
      </Button>
    </div>
  );
}