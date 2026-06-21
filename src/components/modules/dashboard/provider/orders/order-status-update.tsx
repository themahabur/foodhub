"use client";

import { useState, useTransition } from "react";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Order, OrderStatus } from "@/types/order/order.type";
import { getNextStatusOptions, ORDER_STATUS_META } from "@/data/orders/order-status";
import { updateOrderStatus } from "@/lib/actions/orders/orders";

export function OrderStatusUpdate({ order }: { order: Order }) {
  const [status, setStatus] = useState<OrderStatus>(order.status);
  const [isPending, startTransition] = useTransition();
  const nextOptions = getNextStatusOptions(status);

  if (nextOptions.length === 0) {
    return <span className="text-sm text-muted-foreground">{ORDER_STATUS_META[status].label}</span>;
  }

  function handleChange(value: string) {
    const newStatus = value as OrderStatus;
    const previous = status;
    setStatus(newStatus);

    startTransition(async () => {
      try {
        await updateOrderStatus(order.id, newStatus);
        toast.success(`Order #${order.orderNumber} marked as ${ORDER_STATUS_META[newStatus].label}`);
      } catch {
        setStatus(previous);
        toast.error("Couldn't update status. Try again.");
      }
    });
  }

  return (
    <Select value={status} onValueChange={handleChange} disabled={isPending}>
      <SelectTrigger className="h-8 w-[150px] text-xs">
        {isPending ? (
          <span className="flex items-center gap-1.5"><Loader2 className="h-3 w-3 animate-spin" />Updating</span>
        ) : (
          <SelectValue />
        )}
      </SelectTrigger>
      <SelectContent>
        <SelectItem value={status}>{ORDER_STATUS_META[status].label}</SelectItem>
        {nextOptions.map((opt) => (
          <SelectItem key={opt} value={opt}>Mark as {ORDER_STATUS_META[opt].label}</SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}