import { CreateMealForm } from "@/components/modules/dashboard/provider/meals/create-meal-form";
import { FadeDown, FadeUp } from "@/components/shared/motion/motion-wrapper";

export default function createMealPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6 lg:px-8">
      <FadeDown className="mb-8">
        <p className="text-sm font-medium text-foodhub-maroon">Meals</p>
        <h1 className="mt-1 text-2xl font-semibold text-foodhub-dark sm:text-3xl">
          Add a new meal
        </h1>
        <p className="mt-2 text-sm text-foodhub-dark/60">
          Fill in the details below — this is how customers will see it on
          your menu.
        </p>
      </FadeDown>

      <FadeUp delay={0.1}>
        <CreateMealForm />
      </FadeUp>
    </div>
  );
}