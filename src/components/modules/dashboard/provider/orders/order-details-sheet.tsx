"use client";

import { useState } from "react";
import { Eye, MapPin, Phone, CreditCard, Ban, Check } from "lucide-react";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

import { cn } from "@/lib/utils";
import { Order } from "@/types/order/order.type";
import { ORDER_STATUS_FLOW, ORDER_STATUS_META } from "@/data/orders/order-status";

export function OrderDetailsSheet({ order }: { order: Order }) {
  const [open, setOpen] = useState(false);
  const isCancelled = order.status === "CANCELLED";
  const currentStepIndex = ORDER_STATUS_FLOW.indexOf(isCancelled ? "PENDING" : order.status);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="outline" size="sm" className="h-8 gap-1.5 text-xs">
          <Eye className="h-3.5 w-3.5" />
          View
        </Button>
      </SheetTrigger>
      <SheetContent className="w-full overflow-y-auto sm:max-w-md">
        <SheetHeader>
          <SheetTitle>Order #{order.orderNumber}</SheetTitle>
        </SheetHeader>

        <div className="mt-6 space-y-6 px-4">
          <div>
            <p className="mb-3 text-sm font-medium text-foreground">Status</p>
            <div className="flex items-center">
              {ORDER_STATUS_FLOW.map((step, i) => {
                const reached = !isCancelled && i <= currentStepIndex;
                const isLast = i === ORDER_STATUS_FLOW.length - 1;
                return (
                  <div key={step} className="flex flex-1 items-center last:flex-none">
                    <div className="flex flex-col items-center gap-1">
                      <div className={cn(
                        "flex h-6 w-6 items-center justify-center rounded-full border text-[10px]",
                        reached ? "border-foodhub-maroon bg-foodhub-maroon text-white" : "border-muted-foreground/30 text-muted-foreground"
                      )}>
                        {reached ? <Check className="h-3 w-3" /> : i + 1}
                      </div>
                      <span className="text-[10px] text-muted-foreground">{ORDER_STATUS_META[step].label}</span>
                    </div>
                    {!isLast && (
                      <div className={cn("mx-1 h-px flex-1", reached ? "bg-foodhub-maroon" : "bg-muted-foreground/20")} />
                    )}
                  </div>
                );
              })}
            </div>

            {isCancelled && (
              <div className="mt-3 flex items-center gap-2 rounded-md border border-red-200 bg-red-50 px-3 py-2 text-xs text-red-700">
                <Ban className="h-3.5 w-3.5" />
                Order was cancelled
              </div>
            )}
          </div>

          <Separator />

          <div className="space-y-2">
            <p className="text-sm font-medium text-foreground">Customer</p>
            <p className="text-sm text-muted-foreground">{order.customerName}</p>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Phone className="h-3.5 w-3.5" />
              {order.customerPhone}
            </div>
            <div className="flex items-start gap-2 text-sm text-muted-foreground">
              <MapPin className="mt-0.5 h-3.5 w-3.5 shrink-0" />
              {order.deliveryAddress}
            </div>
          </div>

          <Separator />

          <div className="space-y-2">
            <p className="text-sm font-medium text-foreground">Items</p>
            <div className="space-y-2">
              {order.items.map((item) => (
                <div key={item.id} className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">{item.quantity}x {item.name}</span>
                  <span className="font-medium">৳{item.price * item.quantity}</span>
                </div>
              ))}
            </div>
            <Separator className="my-2" />
            <div className="flex items-center justify-between text-sm font-semibold">
              <span>Total</span>
              <span>৳{order.total}</span>
            </div>
          </div>

          <Separator />

          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <CreditCard className="h-3.5 w-3.5" />
            {order.paymentMethod === "CASH_ON_DELIVERY" ? "Cash on Delivery" : "Paid Online"}
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}