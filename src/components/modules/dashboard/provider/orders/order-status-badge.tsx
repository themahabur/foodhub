
import { ORDER_STATUS_META } from "@/data/orders/order-status";
import { cn } from "@/lib/utils";
import { OrderStatus } from "@/types/order/order.type";

export function OrderStatusBadge({ status }: { status: OrderStatus }) {
  const meta = ORDER_STATUS_META[status];
  return (
    <span className={cn("inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-medium", meta.badgeClass)}>
      <span className={cn("h-1.5 w-1.5 rounded-full", meta.dotClass)} />
      {meta.label}
    </span>
  );
}