export type OrderStatus = "PENDING" | "CONFIRMED" | "PREPARING" | "DELIVERED" | "CANCELLED";

export interface OrderItem {
  id: string;
  name: string;
  quantity: number;
  price: number;
}

export interface Order {
  id: string;
  orderNumber: string;
  customerName: string;
  customerPhone: string;
  deliveryAddress: string;
  items: OrderItem[];
  total: number;
  status: OrderStatus;
  paymentMethod: "CASH_ON_DELIVERY" | "ONLINE";
  createdAt: Date;
}