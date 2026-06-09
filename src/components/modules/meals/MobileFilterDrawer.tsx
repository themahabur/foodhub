import { X } from "lucide-react";
import FilterPanel from "./FilterPanel";

type MobileFilterDrawerProps = {
  open: boolean;
  onClose: () => void;
  category: string;
  setCategory: (value: string) => void;
  vegOnly: boolean;
  setVegOnly: (value: boolean) => void;
  maxPrice: number;
  setMaxPrice: (value: number) => void;
};

export default function MobileFilterDrawer({
  open,
  onClose,
  category,
  setCategory,
  vegOnly,
  setVegOnly,
  maxPrice,
  setMaxPrice,
}: MobileFilterDrawerProps) {
  if (!open) return null;

  return (
    <>
      <button
        type="button"
        onClick={onClose}
        className="fixed inset-0 z-40 bg-black/40 lg:hidden"
      />

      <div className="fixed bottom-0 left-0 right-0 z-50 rounded-t-3xl bg-white px-5 pb-8 pt-4 shadow-2xl lg:hidden">
        <div className="mb-5 flex items-center justify-between">
          <h3 className="text-base font-extrabold text-gray-900">Filters</h3>

          <button type="button" onClick={onClose}>
            <X className="size-5 text-gray-500" />
          </button>
        </div>

        <FilterPanel
          category={category}
          setCategory={setCategory}
          vegOnly={vegOnly}
          setVegOnly={setVegOnly}
          maxPrice={maxPrice}
          setMaxPrice={setMaxPrice}
        />

        <button
          type="button"
          onClick={onClose}
          className="mt-6 w-full rounded-2xl bg-foodhub-maroon py-3 text-sm font-bold text-white"
        >
          Apply Filters
        </button>
      </div>
    </>
  );
}