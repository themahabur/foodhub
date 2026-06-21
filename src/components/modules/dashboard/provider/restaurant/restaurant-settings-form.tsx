"use client";

import { useState } from "react";
import { Store, Clock, MapPin, UtensilsCrossed, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { toast } from "sonner";
import { RestaurantSettings } from "@/types/provider/restaurant.type";
import { CUISINE_OPTIONS, INITIAL_RESTAURANT_SETTINGS } from "@/data/restaurant/restaurant.data";
import { ImageUploadField } from "./image-upload-field";
import { BusinessHoursEditor } from "./business-hours-editor";
import { TagInput } from "./tag-input";


function SectionHeader({
  icon: Icon,
  title,
  description,
}: {
  icon: typeof Store;
  title: string;
  description: string;
}) {
  return (
    <CardHeader className="flex flex-row items-start gap-3 space-y-0">
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-foodhub-maroon/10">
        <Icon className="h-5 w-5 text-foodhub-maroon" />
      </div>
      <div>
        <CardTitle className="text-base">{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </div>
    </CardHeader>
  );
}

export function RestaurantSettingsForm() {
  const [data, setData] = useState<RestaurantSettings>(
    INITIAL_RESTAURANT_SETTINGS
  );
  const [isSaving, setIsSaving] = useState(false);

  function update<K extends keyof RestaurantSettings>(
    key: K,
    value: RestaurantSettings[K]
  ) {
    setData((prev) => ({ ...prev, [key]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!data.name.trim()) {
      toast.error("Restaurant name is required");
      return;
    }
    if (!data.phone.trim()) {
      toast.error("Contact phone number is required");
      return;
    }

    setIsSaving(true);
    // No backend yet — replace this block with a server action / API call.
    // e.g. await updateRestaurantSettings(data)
    console.log("Restaurant settings (local state only):", data);
    await new Promise((res) => setTimeout(res, 600));
    setIsSaving(false);

    toast.success("Restaurant settings saved");
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Restaurant Information */}
      <Card>
        <SectionHeader
          icon={Store}
          title="Restaurant information"
          description="Basic details customers see on your restaurant page."
        />
        <CardContent className="space-y-4">
          <div className="space-y-1.5">
            <Label htmlFor="name">Restaurant name</Label>
            <Input
              id="name"
              value={data.name}
              onChange={(e) => update("name", e.target.value)}
              placeholder="e.g. Rajshahi Biryani House"
              required
            />
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={data.description}
              onChange={(e) => update("description", e.target.value)}
              placeholder="Tell customers what makes your restaurant special."
              rows={4}
            />
          </div>
        </CardContent>
      </Card>

      {/* Cover Image & Logo */}
      <Card>
        <SectionHeader
          icon={Store}
          title="Cover image & logo"
          description="Shown at the top of your restaurant page and in search results."
        />
        <CardContent className="grid gap-6 sm:grid-cols-[1fr_auto]">
          <ImageUploadField
            label="Cover image"
            description="Recommended size 1200×400px"
            value={data.coverImage}
            onChange={(v) => update("coverImage", v)}
            aspect="cover"
          />
          <ImageUploadField
            label="Logo"
            description="Square, at least 200×200px"
            value={data.logo}
            onChange={(v) => update("logo", v)}
            aspect="square"
          />
        </CardContent>
      </Card>

      {/* Business Hours */}
      <Card>
        <SectionHeader
          icon={Clock}
          title="Business hours"
          description="Customers will only be able to order while you're open."
        />
        <CardContent>
          <BusinessHoursEditor
            hours={data.businessHours}
            onChange={(h) => update("businessHours", h)}
          />
        </CardContent>
      </Card>

      {/* Delivery Area */}
      <Card>
        <SectionHeader
          icon={MapPin}
          title="Delivery area"
          description="Areas you currently deliver to, and your maximum delivery radius."
        />
        <CardContent className="space-y-4">
          <div className="space-y-1.5">
            <Label>Delivery areas / zones</Label>
            <TagInput
              values={data.deliveryAreas}
              onChange={(v) => update("deliveryAreas", v)}
              placeholder="e.g. Shaheb Bazar, Rajshahi"
            />
          </div>

          <div className="max-w-xs space-y-1.5">
            <Label htmlFor="radius">Max delivery radius (km)</Label>
            <Input
              id="radius"
              type="number"
              inputMode="decimal"
              min="0"
              step="0.5"
              value={data.deliveryRadius}
              onChange={(e) => update("deliveryRadius", e.target.value)}
              placeholder="e.g. 5"
            />
          </div>
        </CardContent>
      </Card>

      {/* Cuisine Types */}
      <Card>
        <SectionHeader
          icon={UtensilsCrossed}
          title="Cuisine types"
          description="Helps customers find you when browsing by category."
        />
        <CardContent>
          <TagInput
            values={data.cuisineTypes}
            onChange={(v) => update("cuisineTypes", v)}
            placeholder="Add a cuisine type"
            suggestions={CUISINE_OPTIONS}
          />
        </CardContent>
      </Card>

      {/* Contact Information */}
      <Card>
        <SectionHeader
          icon={Phone}
          title="Contact information"
          description="How customers and FoodHub support can reach you."
        />
        <CardContent className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-1.5">
            <Label htmlFor="phone">Phone number</Label>
            <Input
              id="phone"
              type="tel"
              value={data.phone}
              onChange={(e) => update("phone", e.target.value)}
              placeholder="01XXXXXXXXX"
              required
            />
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={data.email}
              onChange={(e) => update("email", e.target.value)}
              placeholder="restaurant@example.com"
            />
          </div>

          <div className="space-y-1.5 sm:col-span-2">
            <Label htmlFor="address">Address</Label>
            <Input
              id="address"
              value={data.address}
              onChange={(e) => update("address", e.target.value)}
              placeholder="House, road, area"
            />
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="city">City</Label>
            <Input
              id="city"
              value={data.city}
              onChange={(e) => update("city", e.target.value)}
              placeholder="e.g. Rajshahi"
            />
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-end gap-3 pb-2">
        <Button type="button" variant="outline" disabled={isSaving}>
          Cancel
        </Button>
        <Button
          type="submit"
          disabled={isSaving}
          className="bg-foodhub-maroon text-foodhub-white hover:bg-foodhub-maroon/90"
        >
          {isSaving ? "Saving..." : "Save changes"}
        </Button>
      </div>
    </form>
  );
}