"use client";

import { useState } from "react";
import { toast } from "sonner";
import { Switch } from "@/components/ui/switch";

export function AvailabilityToggle({
  mealId,
  isAvailable,
}: {
  mealId: string;
  isAvailable: boolean;
}) {
  const [checked, setChecked] = useState(isAvailable);
  const [pending, setPending] = useState(false);

  async function handleToggle(value: boolean) {
    setChecked(value);
    setPending(true);
    try {
      // await updateMealAvailability(mealId, value);
      toast.success(value ? "Meal marked available" : "Meal marked unavailable");
    } catch {
      setChecked(!value);
      toast.error("Failed to update availability");
    } finally {
      setPending(false);
    }
  }

  return (
    <div className="flex items-center gap-2">
      <Switch checked={checked} disabled={pending} onCheckedChange={handleToggle} />
      <span className="text-xs text-foodhub-muted">{checked ? "Available" : "Unavailable"}</span>
    </div>
  );
}