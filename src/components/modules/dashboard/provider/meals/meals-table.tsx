import Image from "next/image";
import { UtensilsCrossed } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Meal } from "@/types/meal/meal.types";
import { AvailabilityToggle } from "./availability-toggle";
import { MealActionsMenu } from "./meal-actions-menu";

export function MealsTable({ meals }: { meals: Meal[] }) {
  if (meals.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center gap-3 rounded-xl border border-dashed bg-white py-16 text-center">
        <div className="flex size-12 items-center justify-center rounded-full bg-foodhub-maroon/10 text-foodhub-maroon">
          <UtensilsCrossed className="size-5" />
        </div>
        <div>
          <p className="text-sm font-medium text-gray-900">No meals found</p>
          <p className="text-sm text-gray-500">
            Try adjusting your filters or add a new meal.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-xl border shadow-sm">
      <Table>
        <TableHeader>
          <TableRow className="bg-gray-50/80 hover:bg-gray-50/80">
            <TableHead className="w-16">Image</TableHead>
            <TableHead className="text-xs font-semibold uppercase tracking-wide text-gray-500">
              Name
            </TableHead>
            <TableHead className="text-xs font-semibold uppercase tracking-wide text-gray-500">
              Category
            </TableHead>
            <TableHead className="text-xs font-semibold uppercase tracking-wide text-gray-500">
              Price
            </TableHead>
            <TableHead className="text-xs font-semibold uppercase tracking-wide text-gray-500">
              Status
            </TableHead>
            <TableHead className="text-right text-xs font-semibold uppercase tracking-wide text-gray-500">
              Actions
            </TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {meals.map((meal) => (
            <TableRow
              key={meal.id}
              className="transition-colors hover:bg-foodhub-maroon/[0.03]"
            >
              <TableCell>
                <div className="relative size-12 overflow-hidden rounded-lg ring-1 ring-gray-200">
                  <Image
                    src={meal.image}
                    alt={meal.title}
                    fill
                    className="object-cover"
                  />
                </div>
              </TableCell>

              <TableCell className="font-medium text-gray-900">
                {meal.title}
              </TableCell>

              <TableCell>
                <Badge
                  variant="outline"
                  className="border-foodhub-maroon/20 bg-foodhub-maroon/5 text-foodhub-maroon"
                >
                  {meal.category.name}
                </Badge>
              </TableCell>

              <TableCell className="font-semibold text-gray-900">
                <span className="text-foodhub-maroon">৳</span>
                {meal.price}
              </TableCell>

              <TableCell>
                <AvailabilityToggle
                  mealId={meal.id}
                  isAvailable={meal.isAvailable}
                />
              </TableCell>

              <TableCell className="text-right">
                <MealActionsMenu mealId={meal.id} mealTitle={meal.title} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}