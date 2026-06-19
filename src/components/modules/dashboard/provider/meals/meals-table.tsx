import Image from "next/image";
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
      <div className="flex flex-col items-center justify-center rounded-lg border border-dashed py-16 text-center">
        <p className="text-sm font-medium text-gray-900">No meals found</p>
        <p className="text-sm text-gray-500">
          Try adjusting your filters or add a new meal.
        </p>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-lg border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-16">Image</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {meals.map((meal) => (
            <TableRow key={meal.id}>
              <TableCell>
                <div className="relative size-12 overflow-hidden rounded-md bg-gray-100">
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
                <Badge variant="secondary">{meal.category.name}</Badge>
              </TableCell>

              <TableCell>৳{meal.price}</TableCell>

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
