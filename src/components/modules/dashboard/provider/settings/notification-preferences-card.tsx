"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";
import { NotificationPreferences } from "@/data/settings/settings.data";


const items: { key: keyof NotificationPreferences; label: string; description: string }[] = [
  { key: "orderUpdates", label: "Order Updates", description: "Status changes for your orders and deliveries." },
  { key: "promotions", label: "Promotions & Offers", description: "Discounts, deals, and seasonal offers." },
  { key: "newsletter", label: "Newsletter", description: "Occasional product updates and tips." },
  { key: "smsAlerts", label: "SMS Alerts", description: "Critical alerts sent via SMS." },
];

export function NotificationPreferencesCard({ initialPreferences }: { initialPreferences: NotificationPreferences }) {
  const [preferences, setPreferences] = useState(initialPreferences);

  function handleChange(key: keyof NotificationPreferences, value: boolean) {
    setPreferences((prev) => ({ ...prev, [key]: value }));
    toast.success(`${value ? "Enabled" : "Disabled"} ${items.find((i) => i.key === key)?.label}.`); // demo only
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">Notification Preferences</CardTitle>
        <CardDescription>Choose what you want to be notified about.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {items.map((item, i) => (
          <div key={item.key}>
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor={item.key}>{item.label}</Label>
                <p className="text-sm text-muted-foreground">{item.description}</p>
              </div>
              <Switch id={item.key} checked={preferences[item.key]} onCheckedChange={(v) => handleChange(item.key, v)} />
            </div>
            {i < items.length - 1 && <Separator className="mt-4" />}
          </div>
        ))}
      </CardContent>
    </Card>
  );
}