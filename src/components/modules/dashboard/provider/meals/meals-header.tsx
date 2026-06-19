import Link from "next/link";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

export function MealsHeader() {
  return (
    <div className="flex items-center justify-between">
      <div>
        <h1 className="text-2xl font-semibold text-gray-900">Meals</h1>
        <p className="text-sm text-gray-500">
          Manage your menu items, pricing & availability
        </p>
      </div>

      <Button
        asChild
        className="bg-foodhub-maroon text-white hover:bg-foodhub-maroon/90"
      >
        <Link href="/dashboard/provider/meals/new">
          <Plus className="size-4" />
          Add Meal
        </Link>
      </Button>
    </div>
  );
}
