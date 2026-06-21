import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

import { OrderStatusBadge } from "./order-status-badge";
import { OrderStatusUpdate } from "./order-status-update";
import { OrderDetailsSheet } from "./order-details-sheet";
import { Order } from "@/types/order/order.type";

export function OrdersTable({ orders }: { orders: Order[] }) {
  if (orders.length === 0) {
    return (
      <div className="flex h-40 items-center justify-center rounded-lg border border-dashed text-sm text-muted-foreground">
        No orders found
      </div>
    );
  }

  return (
    <div className="rounded-lg border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Order</TableHead>
            <TableHead>Customer</TableHead>
            <TableHead>Items</TableHead>
            <TableHead>Total</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Update</TableHead>
            <TableHead className="text-right">Details</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {orders.map((order) => (
            <TableRow key={order.id}>
              <TableCell className="font-medium">#{order.orderNumber}</TableCell>
              <TableCell className="text-muted-foreground">{order.customerName}</TableCell>
              <TableCell className="text-muted-foreground">
                {order.items.length} item{order.items.length > 1 ? "s" : ""}
              </TableCell>
              <TableCell className="font-medium">৳{order.total}</TableCell>
              <TableCell><OrderStatusBadge status={order.status} /></TableCell>
              <TableCell><OrderStatusUpdate order={order} /></TableCell>
              <TableCell className="text-right"><OrderDetailsSheet order={order} /></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}