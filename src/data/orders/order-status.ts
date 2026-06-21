import { OrderStatus } from "@/types/order/order.type";


export const ORDER_STATUS_FLOW: OrderStatus[] = ["PENDING", "CONFIRMED", "PREPARING", "DELIVERED"];

export const ORDER_STATUS_META: Record<OrderStatus, { label: string; badgeClass: string; dotClass: string }> = {
  PENDING: { label: "Pending", badgeClass: "bg-amber-50 text-amber-700 border-amber-200", dotClass: "bg-amber-500" },
  CONFIRMED: { label: "Confirmed", badgeClass: "bg-blue-50 text-blue-700 border-blue-200", dotClass: "bg-blue-500" },
  PREPARING: { label: "Preparing", badgeClass: "bg-orange-50 text-orange-700 border-orange-200", dotClass: "bg-orange-500" },
  DELIVERED: { label: "Delivered", badgeClass: "bg-emerald-50 text-emerald-700 border-emerald-200", dotClass: "bg-emerald-500" },
  CANCELLED: { label: "Cancelled", badgeClass: "bg-red-50 text-red-700 border-red-200", dotClass: "bg-red-500" },
};

// valid forward moves from current status — drives the update dropdown
export function getNextStatusOptions(current: OrderStatus): OrderStatus[] {
  switch (current) {
    case "PENDING": return ["CONFIRMED", "CANCELLED"];
    case "CONFIRMED": return ["PREPARING", "CANCELLED"];
    case "PREPARING": return ["DELIVERED", "CANCELLED"];
    case "DELIVERED":
    case "CANCELLED":
      return []; // terminal
  }
}