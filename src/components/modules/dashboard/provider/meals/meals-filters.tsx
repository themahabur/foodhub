"use client";

import { useState, useTransition } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { MealCategory } from "@/types/meal/meal.types";

const categoryOptions: { value: MealCategory | "all"; label: string }[] = [
  { value: "all", label: "All Categories" },
  { value: "biryani-rice", label: "Biryani & Rice" },
  { value: "curry", label: "Curry" },
  { value: "kebab-grill", label: "Kebab & Grill" },
  { value: "fast-food", label: "Fast Food" },
  { value: "snacks", label: "Snacks" },
  { value: "dessert", label: "Dessert" },
  { value: "beverage", label: "Beverage" },
  { value: "bakery", label: "Bakery" },
  { value: "vegetarian", label: "Vegetarian" },
  { value: "set-menu", label: "Set Menu" },
];

const availabilityOptions = [
  { value: "all", label: "All" },
  { value: "available", label: "Available" },
  { value: "unavailable", label: "Unavailable" },
];

export function MealsFilters() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [, startTransition] = useTransition();
  const [search, setSearch] = useState(searchParams.get("q") ?? "");

  function updateParam(key: string, value: string) {
    const params = new URLSearchParams(searchParams.toString());
    if (value && value !== "all") {
      params.set(key, value);
    } else {
      params.delete(key);
    }
    startTransition(() => {
      router.push(`${pathname}?${params.toString()}`);
    });
  }

  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-gray-500" />
        <Input
          placeholder="Search meals by name..."
          className="pl-9"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            updateParam("q", e.target.value);
          }}
        />
      </div>

      <Select
        defaultValue={searchParams.get("category") ?? "all"}
        onValueChange={(value) => updateParam("category", value)}
      >
        <SelectTrigger className="w-full sm:w-[180px]">
          <SelectValue placeholder="Category" />
        </SelectTrigger>
        <SelectContent>
          {categoryOptions.map((opt) => (
            <SelectItem key={opt.value} value={opt.value}>
              {opt.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select
        defaultValue={searchParams.get("availability") ?? "all"}
        onValueChange={(value) => updateParam("availability", value)}
      >
        <SelectTrigger className="w-full sm:w-[160px]">
          <SelectValue placeholder="Availability" />
        </SelectTrigger>
        <SelectContent>
          {availabilityOptions.map((opt) => (
            <SelectItem key={opt.value} value={opt.value}>
              {opt.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
