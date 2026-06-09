import { CATEGORIES } from "@/data/meals.data";

type FilterPanelProps = {
  category: string;
  setCategory: (value: string) => void;
  vegOnly: boolean;
  setVegOnly: (value: boolean) => void;
  maxPrice: number;
  setMaxPrice: (value: number) => void;
};

export default function FilterPanel({
  category,
  setCategory,
  vegOnly,
  setVegOnly,
  maxPrice,
  setMaxPrice,
}: FilterPanelProps) {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <p className="mb-3 text-xs font-bold uppercase tracking-wider text-gray-400">
          Category
        </p>

        <div className="flex flex-col gap-1">
          {CATEGORIES.map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => setCategory(item)}
              className={`rounded-xl px-3 py-2 text-left text-sm transition ${
                category === item
                  ? "bg-foodhub-maroon text-white font-semibold"
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
          Diet
        </p>

        <button
          type="button"
          onClick={() => setVegOnly(!vegOnly)}
          className="flex items-center gap-3"
        >
          <span
            className={`flex h-5 w-10 items-center rounded-full px-0.5 transition ${
              vegOnly ? "bg-green-500" : "bg-gray-200"
            }`}
          >
            <span
              className={`size-4 rounded-full bg-white shadow transition ${
                vegOnly ? "translate-x-5" : "translate-x-0"
              }`}
            />
          </span>

          <span className="text-sm font-medium text-gray-600">Veg only</span>
        </button>
      </div>

      <div>
        <p className="mb-3 text-xs font-bold uppercase tracking-wider text-gray-400">
          Max Price
        </p>

        <input
          type="range"
          min={100}
          max={400}
          step={10}
          value={maxPrice}
          onChange={(event) => setMaxPrice(Number(event.target.value))}
          className="w-full accent-foodhub-maroon"
        />

        <div className="mt-1 flex justify-between text-xs text-gray-400">
          <span>৳100</span>
          <span className="font-bold text-foodhub-maroon">৳{maxPrice}</span>
        </div>
      </div>
    </div>
  );
}