import AddMealForm from "@/components/modules/dashboard/provider/meals/add-meal-form";
import { Button } from "@/components/ui/button";
import { categoryService } from "@/services/category.service";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";


export default function ProviderMealCreatePage() {


  const category = categoryService.getCategory();


  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm font-medium text-foodhub-maroon">
            Provider dashboard
          </p>
          <h1 className="text-3xl font-semibold tracking-tight text-gray-900">
            Add new meal
          </h1>
          <p className="mt-2 max-w-2xl text-sm text-gray-500">
            Add a new menu item to your restaurant with pricing, availability,
            and an image.
          </p>
        </div>

        <Button
          asChild
          className="border border-gray-200 bg-white text-gray-700 shadow-sm hover:bg-gray-50"
        >
          <Link href="/dashboard/meals">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to meals
          </Link>
        </Button>
      </div>

      <AddMealForm  category={category}/>
    </div>
  );
}
