import { RestaurantSettingsForm } from "@/components/modules/dashboard/provider/restaurant/restaurant-settings-form";

export default function RestaurantSettingsPage() {
  return (
    <div className="mx-auto max-w-3xl space-y-1 px-4 py-6 sm:px-6">
      <h1 className="text-2xl font-semibold text-foodhub-dark">
        Restaurant
      </h1>
      <p className="mb-6 text-sm text-foodhub-muted">
        Manage how your restaurant appears to customers on FoodHub.
      </p>

      <RestaurantSettingsForm />
    </div>
  );
}