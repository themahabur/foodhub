"use client";

import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import type { BusinessHours } from "@/types/restaurant";

interface BusinessHoursEditorProps {
  hours: BusinessHours[];
  onChange: (hours: BusinessHours[]) => void;
}

export function BusinessHoursEditor({
  hours,
  onChange,
}: BusinessHoursEditorProps) {
  function updateHours(day: string, value: string) {
    onChange(
      hours.map((h) => (h.day === day ? { ...h, hours: value } : h))
    );
  }

  function toggleClosed(day: string, closed: boolean) {
    onChange(
      hours.map((h) =>
        h.day === day
          ? { ...h, hours: closed ? "Closed" : "10:00 AM - 11:00 PM" }
          : h
      )
    );
  }

  return (
    <div className="divide-y divide-foodhub-maroon/10 rounded-lg border border-foodhub-maroon/10">
      {hours.map((h) => {
        const isClosed = h.hours.trim().toLowerCase() === "closed";
        return (
          <div
            key={h.day}
            className="flex flex-col gap-2.5 px-4 py-3 sm:flex-row sm:items-center sm:gap-4"
          >
            <span className="w-24 shrink-0 text-sm font-medium text-foodhub-dark">
              {h.day}
            </span>

            <Input
              value={isClosed ? "" : h.hours}
              onChange={(e) => updateHours(h.day, e.target.value)}
              placeholder="e.g. 9:00 AM - 11:00 PM"
              disabled={isClosed}
              className="flex-1 disabled:bg-foodhub-maroon/[0.03]"
            />

            <label className="flex shrink-0 items-center gap-2 text-xs text-foodhub-muted">
              <Switch
                checked={isClosed}
                onCheckedChange={(checked) => toggleClosed(h.day, checked)}
              />
              Closed
            </label>
          </div>
        );
      })}
    </div>
  );
}