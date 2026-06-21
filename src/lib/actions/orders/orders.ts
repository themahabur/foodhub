"use server";

import { OrderStatus } from "@/types/order/order.type";
import { revalidatePath } from "next/cache";

export async function updateOrderStatus(orderId: string, newStatus: OrderStatus) {
  // TODO: auth check (provider owns this order) + transition validation + db update
  // const order = await db.order.findUnique({ where: { id: orderId } });
  // await db.order.update({ where: { id: orderId }, data: { status: newStatus } });

  revalidatePath("/dashboard/provider/orders");
  return { success: true };
}