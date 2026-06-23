"use client";

import { useEffect } from "react";
import {
  Store,
  Clock,
  MapPin,
  UtensilsCrossed,
  type LucideIcon,
} from "lucide-react";
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

import { ImageUploadField } from "./image-upload-field";
import { TagInput } from "./tag-input";
import { CUISINE_OPTIONS } from "@/data/restaurant/restaurant.data";
import { Provider } from "@/types/provider/provider.type";
import z from "zod";
import { useForm } from "@tanstack/react-form";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";

/* ---------------- TYPES ---------------- */

export interface ProviderSettings {
  businessName: string;
  logo: string | null;
  banner: string | null;
  description: string;
  cuisineType: string[];
  deliveryTime: string;
  address: string;
  minOrder: number | null;
  isOpen: boolean;
  tags: string[];
}

/* ---------------- SCHEMA ---------------- */

const formSchema = z.object({
  businessName: z.string().min(1, "Business name is required"),
  logo: z.string().nullable(),
  banner: z.string().nullable(),
  description: z.string().min(1, "Description is required"),
  cuisineType: z.array(z.string()),
  deliveryTime: z.string().min(1, "Delivery time is required"),
  address: z.string().min(1, "Address is required"),
  minOrder: z.number().nullable(),
  isOpen: z.boolean(),
  tags: z.array(z.string()),
});

/* ---------------- PROPS ---------------- */

type Props = {
  success: boolean;
  message: string;
  data: Provider | null;
  error: string;
};

/* ---------------- SECTION HEADER ---------------- */

function SectionHeader({
  icon: Icon,
  title,
  description,
}: {
  icon: LucideIcon;
  title: string;
  description: string;
}) {
  return (
    <CardHeader className="flex flex-row items-start gap-3 space-y-0">
      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-foodhub-maroon/10">
        <Icon className="h-5 w-5 text-foodhub-maroon" />
      </div>
      <div>
        <CardTitle className="text-base">{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </div>
    </CardHeader>
  );
}

/* ---------------- FORM ---------------- */

export function RestaurantSettingsForm({ provider }: { provider: Props }) {
  const providerData = provider?.data;
  const isEditMode = !!providerData?.id;

  const form = useForm({
    defaultValues: {
      businessName: providerData?.businessName ?? "",
      logo: providerData?.logo ?? null,
      banner: providerData?.banner ?? null,
      description: providerData?.description ?? "",
      cuisineType: providerData?.cuisineType ?? [],
      deliveryTime: providerData?.deliveryTime ?? "",
      address: providerData?.address ?? "",
      minOrder: providerData?.minOrder ?? null,
      isOpen: providerData?.isOpen ?? true,
      tags: providerData?.tags ?? [],
    } as ProviderSettings,
    validators: {
      onSubmit: formSchema,
    },
    onSubmit: async ({ value }) => {
      try {
        if (isEditMode) {
          console.log("UPDATE PROVIDER:", value);
          toast.success("Restaurant updated successfully");
        } else {
          console.log("CREATE PROVIDER:", value);
          toast.success("Restaurant created successfully");
        }
      } catch (err) {
        toast.error("Something went wrong");
      }
    },
  });

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        form.handleSubmit();
      }}
      className="space-y-6"
    >
      {/* MODE */}
      <div className="text-sm text-gray-500">
        Mode:{" "}
        <span className="font-medium text-foodhub-maroon">
          {isEditMode ? "Update Provider" : "Create Provider"}
        </span>
      </div>

      {/* ---------------- BUSINESS INFO ---------------- */}
      <Card>
        <SectionHeader
          icon={Store}
          title="Business information"
          description="Basic details shown to your customers."
        />

        <CardContent className="space-y-4">
          <form.Field name="businessName">
            {(field) => (
              <Field>
                <FieldLabel>Business name</FieldLabel>
                <Input
                  value={field.state.value}
                  onChange={(e) => field.handleChange(e.target.value)}
                />
                <FieldError errors={field.state.meta.errors} />
              </Field>
            )}
          </form.Field>

          <form.Field name="description">
            {(field) => (
              <Field>
                <FieldLabel>Description</FieldLabel>
                <Textarea
                  rows={4}
                  value={field.state.value}
                  onChange={(e) => field.handleChange(e.target.value)}
                />
                <FieldError errors={field.state.meta.errors} />
              </Field>
            )}
          </form.Field>
        </CardContent>
      </Card>

      {/* ---------------- IMAGES ---------------- */}
      <Card>
        <SectionHeader
          icon={Store}
          title="Brand assets"
          description="Logo and banner shown across platform."
        />

        <CardContent className="grid gap-6 sm:grid-cols-2">
          <form.Field name="logo">
            {(field) => (
              <ImageUploadField
                label="Logo"
                value={field.state.value}
                onChange={field.handleChange}
                aspect="square"
              />
            )}
          </form.Field>

          <form.Field name="banner">
            {(field) => (
              <ImageUploadField
                label="Banner"
                value={field.state.value}
                onChange={field.handleChange}
                aspect="cover"
              />
            )}
          </form.Field>
        </CardContent>
      </Card>

      {/* ---------------- DELIVERY ---------------- */}
      <Card>
        <SectionHeader
          icon={Clock}
          title="Delivery information"
          description="Delivery time and minimum order."
        />

        <CardContent className="space-y-4">
          <form.Field name="deliveryTime">
            {(field) => (
              <Input
                value={field.state.value}
                onChange={(e) => field.handleChange(e.target.value)}
                placeholder="20-35 mins"
              />
            )}
          </form.Field>

          <form.Field name="minOrder">
            {(field) => (
              <Input
                type="number"
                value={field.state.value ?? ""}
                onChange={(e) => field.handleChange(Number(e.target.value))}
                placeholder="Minimum order"
              />
            )}
          </form.Field>

          <form.Field name="address">
            {(field) => (
              <Input
                value={field.state.value}
                onChange={(e) => field.handleChange(e.target.value)}
                placeholder="Address"
              />
            )}
          </form.Field>
        </CardContent>
      </Card>

      {/* ---------------- CUISINE ---------------- */}
      <Card>
        <SectionHeader
          icon={UtensilsCrossed}
          title="Cuisine types"
          description="Food categories"
        />

        <CardContent>
          <form.Field name="cuisineType">
            {(field) => (
              <TagInput
                values={field.state.value}
                onChange={field.handleChange}
                suggestions={CUISINE_OPTIONS}
              />
            )}
          </form.Field>
        </CardContent>
      </Card>

      {/* ---------------- TAGS + STATUS ---------------- */}
      <Card>
        <SectionHeader
          icon={MapPin}
          title="Tags & Status"
          description="Control visibility"
        />

        <CardContent className="space-y-4">
          <form.Field name="tags">
            {(field) => (
              <TagInput
                values={field.state.value}
                onChange={field.handleChange}
              />
            )}
          </form.Field>

          <form.Field name="isOpen">
            {(field) => (
              <div className="flex items-center justify-between">
                <Label>Status</Label>

                <Button
                  type="button"
                  variant="outline"
                  onClick={() => field.handleChange(!field.state.value)}
                  className={
                    field.state.value ? "text-foodhub-maroon" : "text-gray-500"
                  }
                >
                  {field.state.value ? "Open" : "Closed"}
                </Button>
              </div>
            )}
          </form.Field>
        </CardContent>
      </Card>

      {/* ---------------- ACTIONS ---------------- */}
      <div className="flex justify-end gap-3">
        <Button type="button" variant="outline">
          Cancel
        </Button>

        <Button type="submit" className="bg-foodhub-maroon text-white">
          {isEditMode ? "Update" : "Create"}
        </Button>
      </div>
    </form>
  );
}
