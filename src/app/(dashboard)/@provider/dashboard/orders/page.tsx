import { OrderStatusTabs } from "@/components/modules/dashboard/provider/orders/order-status-tabs";
import { OrdersTable } from "@/components/modules/dashboard/provider/orders/orders-table";
import { MOCK_ORDERS } from "@/data/orders/mock-orders";
import { Order, OrderStatus } from "@/types/order/order.type";


async function getOrders(status?: OrderStatus): Promise<Order[]> {
  if (!status) return MOCK_ORDERS;
  return MOCK_ORDERS.filter((o) => o.status === status);
}

export default async function OrdersPage({
  searchParams,
}: {
  searchParams: Promise<{ status?: string }>;
}) {
  const { status } = await searchParams;
  const orders = await getOrders(status as OrderStatus | undefined);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-foreground">Orders</h1>
        <p className="text-sm text-muted-foreground">Manage and track incoming orders</p>
      </div>

      <OrderStatusTabs />
      <OrdersTable orders={orders} />
    </div>
  );
}