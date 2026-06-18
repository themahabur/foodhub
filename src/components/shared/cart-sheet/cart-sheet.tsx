"use client";

import { useState } from "react";
import { ShoppingBag, Minus, Plus, X, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetFooter,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";

interface CartItem {
  id: string;
  name: string;
  restaurant: string;
  price: number;
  qty: number;
  image: string;
}

const MOCK_CART_ITEMS: CartItem[] = [
  {
    id: "1",
    name: "Chicken Tikka Biryani",
    restaurant: "Sultan's Dine",
    price: 320,
    qty: 1,
    image: "https://images.unsplash.com/photo-1633945274405-b6c8069047b0?w=200&h=200&fit=crop",
  },
  {
    id: "2",
    name: "Beef Tehari",
    restaurant: "Star Kabab",
    price: 280,
    qty: 2,
    image: "https://images.unsplash.com/photo-1631515243349-e0cb75fb8d3a?w=200&h=200&fit=crop",
  },
  {
    id: "3",
    name: "Chicken Fried Rice",
    restaurant: "China Town",
    price: 250,
    qty: 1,
    image: "https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=200&h=200&fit=crop",
  },
];

const DELIVERY_FEE = 40;

const CartSheet = () => {
  const [items, setItems] = useState<CartItem[]>(MOCK_CART_ITEMS);

  const itemCount = items.reduce((sum, item) => sum + item.qty, 0);
  const subtotal = items.reduce((sum, item) => sum + item.price * item.qty, 0);
  const total = items.length > 0 ? subtotal + DELIVERY_FEE : 0;

  const updateQty = (id: string, delta: number) => {
    setItems((prev) =>
      prev
        .map((item) =>
          item.id === id
            ? { ...item, qty: Math.max(1, item.qty + delta) }
            : item
        )
    );
  };

  const removeItem = (id: string) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        <button
          className="relative flex items-center justify-center size-9 rounded-full bg-gray-50 border hover:bg-gray-100 transition"
          aria-label="Open cart"
        >
          <ShoppingBag className="size-4 text-foodhub-maroon" />
          {itemCount > 0 && (
            <span className="absolute -top-1.5 -right-1.5 flex items-center justify-center size-5 rounded-full bg-foodhub-maroon text-white text-[10px] font-bold">
              {itemCount}
            </span>
          )}
        </button>
      </SheetTrigger>

      <SheetContent className="flex flex-col p-0">
        <SheetHeader className="px-5 pt-5 pb-4 border-b">
          <SheetTitle className="flex items-center gap-2">
            <ShoppingBag className="size-4.5 text-foodhub-maroon" />
            Your Cart
            {itemCount > 0 && (
              <span className="text-sm font-normal text-gray-400">
                ({itemCount} {itemCount === 1 ? "item" : "items"})
              </span>
            )}
          </SheetTitle>
        </SheetHeader>

        {/* Items */}
        {items.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center gap-3 px-6 text-center">
            <div className="size-16 rounded-full bg-foodhub-maroon/8 flex items-center justify-center">
              <ShoppingBag className="size-7 text-foodhub-maroon/50" />
            </div>
            <p className="text-sm font-medium text-gray-600">
              Your cart is empty
            </p>
            <p className="text-xs text-gray-400">
              Add some delicious meals to get started
            </p>
          </div>
        ) : (
          <div className="flex-1 overflow-y-auto px-5 py-4 flex flex-col gap-4">
            {items.map((item) => (
              <div key={item.id} className="flex gap-3 group">
                <img
                  src={item.image}
                  alt={item.name}
                  className="size-16 rounded-xl object-cover border"
                />

                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <div className="min-w-0">
                      <h4 className="text-sm font-semibold text-gray-900 truncate">
                        {item.name}
                      </h4>
                      <p className="text-xs text-gray-400">{item.restaurant}</p>
                    </div>

                    <button
                      onClick={() => removeItem(item.id)}
                      className="text-gray-300 hover:text-foodhub-maroon transition shrink-0"
                      aria-label={`Remove ${item.name}`}
                    >
                      <Trash2 className="size-3.5" />
                    </button>
                  </div>

                  <div className="flex items-center justify-between mt-2">
                    <span className="text-sm font-bold text-foodhub-maroon">
                      ৳{item.price * item.qty}
                    </span>

                    <div className="flex items-center gap-2 bg-gray-50 rounded-full border px-1">
                      <button
                        onClick={() => updateQty(item.id, -1)}
                        className="size-6 flex items-center justify-center rounded-full hover:bg-gray-200 transition"
                        aria-label="Decrease quantity"
                      >
                        <Minus className="size-3" />
                      </button>
                      <span className="text-xs font-semibold w-4 text-center">
                        {item.qty}
                      </span>
                      <button
                        onClick={() => updateQty(item.id, 1)}
                        className="size-6 flex items-center justify-center rounded-full hover:bg-gray-200 transition"
                        aria-label="Increase quantity"
                      >
                        <Plus className="size-3" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Footer / Summary */}
        {items.length > 0 && (
          <SheetFooter className="border-t px-5 py-4 flex flex-col gap-3 sm:flex-col">
            <div className="w-full flex flex-col gap-1.5">
              <div className="flex items-center justify-between text-sm text-gray-500">
                <span>Subtotal</span>
                <span>৳{subtotal}</span>
              </div>
              <div className="flex items-center justify-between text-sm text-gray-500">
                <span>Delivery fee</span>
                <span>৳{DELIVERY_FEE}</span>
              </div>
              <div className="flex items-center justify-between text-base font-bold text-gray-900 pt-1.5 border-t">
                <span>Total</span>
                <span className="text-foodhub-maroon">৳{total}</span>
              </div>
            </div>

            <Button className="w-full rounded-full bg-foodhub-maroon hover:bg-foodhub-maroon/90 h-11 text-sm font-semibold">
              Proceed to Checkout
            </Button>
          </SheetFooter>
        )}
      </SheetContent>
    </Sheet>
  );
};

export { CartSheet };