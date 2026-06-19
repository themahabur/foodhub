import Link from "next/link";
import { UtensilsCrossed } from "lucide-react";
import { Button } from "@/components/ui/button";

export function MealsEmptyState() {
  return (
    <div className="flex flex-col items-center gap-3 rounded-2xl border border-dashed border-border bg-muted/30 px-6 py-20 text-center">
      <UtensilsCrossed className="h-10 w-10 text-foodhub-maroon" />
      <div>
        <h3 className="font-medium text-foreground">No meals yet</h3>
        <p className="mt-1 text-sm text-muted-foreground">
          Add your first meal so customers can start ordering.
        </p>
      </div>
      <Button
        asChild
        className="mt-2 bg-foodhub-maroon hover:bg-foodhub-maroon/90"
      >
        <Link href="/provider/meals/create">Add a meal</Link>
      </Button>
    </div>
  );
}