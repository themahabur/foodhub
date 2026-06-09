"use client";

import { ReactNode, useState } from "react";
import { ChevronDown } from "lucide-react";

type OptionObject = {
  label: string;
  value: string;
};

type RestaurantDropdownProps = {
  value: string;
  options: string[] | OptionObject[];
  onChange: (value: string) => void;
  icon?: ReactNode;
  getLabel?: (value: string) => string;
};

export default function RestaurantDropdown({
  value,
  options,
  onChange,
  icon,
  getLabel,
}: RestaurantDropdownProps) {
  const [open, setOpen] = useState(false);

  const currentLabel = getLabel ? getLabel(value) : value;

  const normalizedOptions = options.map((option) => {
    if (typeof option === "string") {
      return {
        label: option,
        value: option,
      };
    }

    return option;
  });

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between gap-3 rounded-2xl border border-gray-200 bg-white px-5 py-3 text-sm font-semibold text-gray-600 transition hover:border-foodhub-maroon/30 lg:w-48"
      >
        <span className="flex min-w-0 items-center gap-2">
          {icon}
          <span className="truncate">{currentLabel}</span>
        </span>

        <ChevronDown
          className={`size-4 shrink-0 transition ${open ? "rotate-180" : ""}`}
        />
      </button>

      {open && (
        <>
          <button
            type="button"
            className="fixed inset-0 z-10"
            onClick={() => setOpen(false)}
          />

          <div className="absolute right-0 top-full z-20 mt-2 w-full overflow-hidden rounded-2xl border border-gray-100 bg-white py-2 shadow-xl lg:w-48">
            {normalizedOptions.map((option) => (
              <button
                key={option.value}
                type="button"
                onClick={() => {
                  onChange(option.value);
                  setOpen(false);
                }}
                className={`w-full px-4 py-2 text-left text-sm transition hover:bg-foodhub-maroon/5 ${
                  value === option.value
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