import { useState } from "react";
import { ChevronDown } from "lucide-react";
import type { SortValue } from "@/types/meal/meal.types";

type SortDropdownProps = {
  sort: SortValue;
  setSort: (value: SortValue) => void;
  options: {
    label: string;
    value: SortValue;
  }[];
};

export default function SortDropdown({
  sort,
  setSort,
  options,
}: SortDropdownProps) {
  const [open, setOpen] = useState(false);

  const selectedLabel = options.find((option) => option.value === sort)?.label;

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between gap-3 rounded-2xl border border-gray-200 bg-white px-5 py-3 text-sm font-semibold text-gray-600 transition hover:border-foodhub-maroon/30 md:w-48"
      >
        {selectedLabel}
        <ChevronDown
          className={`size-4 transition ${open ? "rotate-180" : ""}`}
        />
      </button>

      {open && (
        <>
          <button
            type="button"
            className="fixed inset-0 z-10"
            onClick={() => setOpen(false)}
          />

          <div className="absolute right-0 top-full z-20 mt-2 w-full overflow-hidden rounded-2xl border border-gray-100 bg-white py-2 shadow-xl md:w-48">
            {options.map((option) => (
              <button
                key={option.value}
                type="button"
                onClick={() => {
                  setSort(option.value);
                  setOpen(false);
                }}
                className={`w-full px-4 py-2 text-left text-sm transition hover:bg-foodhub-maroon/5 ${
                  sort === option.value
                    ? "font-bold text-foodhub-maroon"
                    : "text-gray-600"
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}