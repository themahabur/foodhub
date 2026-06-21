"use client";

import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const TABS = [
  { label: "All", value: "ALL" },
  { label: "Pending", value: "PENDING" },
  { label: "Confirmed", value: "CONFIRMED" },
  { label: "Preparing", value: "PREPARING" },
  { label: "Delivered", value: "DELIVERED" },
  { label: "Cancelled", value: "CANCELLED" },
] as const;

export function OrderStatusTabs() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const active = searchParams.get("status") || "ALL";

  function handleSelect(value: string) {
    const params = new URLSearchParams(searchParams);
    value === "ALL" ? params.delete("status") : params.set("status", value);
    router.push(`${pathname}?${params.toString()}`);
  }

  return (
    <div className="flex gap-1 overflow-x-auto rounded-lg bg-muted p-1">
      {TABS.map((tab) => (
        <button
          key={tab.value}
          onClick={() => handleSelect(tab.value)}
          className={cn(
            "shrink-0 rounded-md px-3 py-1.5 text-sm font-medium transition-colors",
            active === tab.value ? "bg-background text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"
          )}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}