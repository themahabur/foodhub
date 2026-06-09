import { RESTAURANT_CATEGORIES } from "@/data/restaurants.data";

type RestaurantFilterPanelProps = {
  category: string;
  setCategory: (value: string) => void;
  openOnly: boolean;
  setOpenOnly: (value: boolean) => void;
};

export default function RestaurantFilterPanel({
  category,
  setCategory,
  openOnly,
  setOpenOnly,
}: RestaurantFilterPanelProps) {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <p className="mb-3 text-xs font-bold uppercase tracking-wider text-gray-400">
          Cuisine
        </p>

        <div className="flex flex-col gap-1">
          {RESTAURANT_CATEGORIES.map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => setCategory(item)}
              className={`rounded-xl px-3 py-2 text-left text-sm transition ${
                category === item
                  ? "bg-foodhub-maroon font-semibold text-white"
                  : "text-gray-600 hover:bg-gray-50"
              }`}
            >
              {item}
            </button>
          ))}
        </div>
      </div>

      <div>
        <p className="mb-3 text-xs font-bold uppercase tracking-wider text-gray-400">
          Availability
        </p>

        <button
          type="button"
          onClick={() => setOpenOnly(!openOnly)}
          className="flex items-center gap-3"
        >
          <span
            className={`flex h-5 w-10 items-center rounded-full px-0.5 transition ${
              openOnly ? "bg-green-500" : "bg-gray-200"
            }`}
          >
            <span
              className={`size-4 rounded-full bg-white shadow transition ${
                openOnly ? "translate-x-5" : "translate-x-0"
              }`}
            />
          </span>

          <span className="text-sm font-medium text-gray-600">Open now</span>
        </button>
      </div>
    </div>
  );
}