import { X } from "lucide-react";
import RestaurantFilterPanel from "./RestaurantFilterPanel";

type MobileRestaurantFilterDrawerProps = {
  open: boolean;
  onClose: () => void;
  category: string;
  setCategory: (value: string) => void;
  openOnly: boolean;
  setOpenOnly: (value: boolean) => void;
};

export default function MobileRestaurantFilterDrawer({
  open,
  onClose,
  category,
  setCategory,
  openOnly,
  setOpenOnly,
}: MobileRestaurantFilterDrawerProps) {
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

        <RestaurantFilterPanel
          category={category}
          setCategory={setCategory}
          openOnly={openOnly}
          setOpenOnly={setOpenOnly}
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