"use client";

import { useState } from "react";
import { Switch } from "@/components/ui/switch";

interface MealStatusToggleProps {
  mealId: string;
  initialAvailable: boolean;
}

export function MealStatusToggle({
  mealId,
  initialAvailable,
}: MealStatusToggleProps) {
  const [isAvailable, setIsAvailable] = useState(initialAvailable);

  const handleChange = (checked: boolean) => {
    setIsAvailable(checked);
    // Mock toggle — replace with a real API call, e.g.
    // await fetch(`/api/provider/meals/${mealId}/availability`, {
    //   method: "PATCH",
    //   body: JSON.stringify({ isAvailable: checked }),
    // });
  };

  return (
    <Switch
      checked={isAvailable}
      onCheckedChange={handleChange}
      aria-label={`Toggle availability for meal ${mealId}`}
      className="data-[state=checked]:bg-foodhub-maroon"
    />
  );
}