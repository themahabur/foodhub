"use client";

import { use } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "@tanstack/react-form";
import z from "zod";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { toast } from "sonner";
import { ImageUploadField } from "@/components/modules/dashboard/provider/restaurant/image-upload-field";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";

import { Category } from "@/types/category/category.type";
import { env } from "@/env";
import { createMeal } from "@/actions/meals.action";

type CategoryData = {
  data: Category[];
  success: boolean;
  message: string;
  error: string;
};

const createMealSchema = z.object({
  categoryId: z.string().uuid("Invalid category ID"),
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  image: z.string().url("Invalid image URL"),
  price: z.number().positive("Price must be greater than 0"),
  stock: z.number().int().min(0, "Stock cannot be negative"),
  isAvailable: z.boolean(),
  preparationTime: z.number().int().positive(),
});

const AddMealForm = ({ category }: { category: Promise<CategoryData> }) => {
  const router = useRouter();
  const { data: categories } = use(category);

  const form = useForm({
    defaultValues: {
      categoryId: "",
      title: "",
      description: "",
      image: "",
      price: 0,
      stock: 0,
      isAvailable: true,
      preparationTime: 0,
    },
    validators: {
      onSubmit: createMealSchema,
    },
    onSubmit: async ({ value }) => {
      const toastId = toast.loading("Please wait...");
      const {
        categoryId,
        title,
        description,
        image,
        price,
        stock,
        isAvailable,
        preparationTime,
      } = value;

      try {
        const res = await createMeal({
          categoryId,
          title,
          description,
          image,
          price,
          stock,
          isAvailable,
          preparationTime,
        });

        if (res.success === false) {
          return toast.error(res.error, { id: toastId });
        }

        toast.success("Meal added successfully", { id: toastId });
        // router.push("/dashboard/meals");
      } catch (err) {
        toast.error("error: Failed to add meal", { id: toastId });
      }
    },
  });

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        form.handleSubmit();
      }}
      className="grid gap-6 lg:grid-cols-[1fr_320px]"
    >
      {/* LEFT SIDE */}
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Meal details</CardTitle>
            <CardDescription>
              Enter the information customers will see in the menu.
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-6">
            <div className="grid gap-4 sm:grid-cols-2">
              {/* TITLE */}
              <form.Field
                name="title"
                children={(field) => (
                  <Field>
                    <FieldLabel>Meal name</FieldLabel>
                    <Input
                      value={field.state.value}
                      onChange={(e) => field.handleChange(e.target.value)}
                      placeholder="e.g. Chicken Biryani"
                    />
                    <FieldError errors={field.state.meta.errors} />
                  </Field>
                )}
              />

              {/* CATEGORY */}
              <form.Field
                name="categoryId"
                children={(field) => (
                  <Field>
                    <FieldLabel>Category</FieldLabel>

                    <Select
                      value={field.state.value}
                      onValueChange={(value) => field.handleChange(value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>

                      <SelectContent>
                        {categories?.map((cat) => (
                          <SelectItem key={cat.id} value={cat.id}>
                            {cat.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>

                    <FieldError errors={field.state.meta.errors} />
                  </Field>
                )}
              />
            </div>

            <div className="grid gap-4 sm:grid-cols-3">
              {/* PRICE */}
              <form.Field
                name="price"
                children={(field) => (
                  <Field>
                    <FieldLabel>Price</FieldLabel>
                    <Input
                      type="number"
                      value={field.state.value}
                      onChange={(e) =>
                        field.handleChange(Number(e.target.value))
                      }
                    />
                    <FieldError errors={field.state.meta.errors} />
                  </Field>
                )}
              />

              {/* STOCK */}
              <form.Field
                name="stock"
                children={(field) => (
                  <Field>
                    <FieldLabel>Stock</FieldLabel>
                    <Input
                      type="number"
                      value={field.state.value}
                      onChange={(e) =>
                        field.handleChange(Number(e.target.value))
                      }
                    />
                    <FieldError errors={field.state.meta.errors} />
                  </Field>
                )}
              />

              {/* PREP TIME */}
              <form.Field
                name="preparationTime"
                children={(field) => (
                  <Field>
                    <FieldLabel>Prep time (min)</FieldLabel>
                    <Input
                      type="number"
                      value={field.state.value}
                      onChange={(e) =>
                        field.handleChange(Number(e.target.value))
                      }
                    />
                    <FieldError errors={field.state.meta.errors} />
                  </Field>
                )}
              />
            </div>

            {/* DESCRIPTION */}
            <form.Field
              name="description"
              children={(field) => (
                <Field>
                  <FieldLabel>Description</FieldLabel>
                  <Textarea
                    rows={4}
                    value={field.state.value}
                    onChange={(e) => field.handleChange(e.target.value)}
                    placeholder="Write a short description"
                  />
                  <FieldError errors={field.state.meta.errors} />
                </Field>
              )}
            />
          </CardContent>
        </Card>

        {/* AVAILABILITY */}
        <Card>
          <CardHeader>
            <CardTitle>Availability</CardTitle>
            <CardDescription>
              Control whether this meal can be ordered.
            </CardDescription>
          </CardHeader>

          <CardContent className="grid gap-4 sm:grid-cols-2">
            <form.Field
              name="isAvailable"
              children={(field) => (
                <Field>
                  <FieldLabel>Availability</FieldLabel>

                  <Select
                    value={field.state.value ? "true" : "false"}
                    onValueChange={(value) =>
                      field.handleChange(value === "true")
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>

                    <SelectContent>
                      <SelectItem value="true">Available</SelectItem>
                      <SelectItem value="false">Unavailable</SelectItem>
                    </SelectContent>
                  </Select>

                  <FieldError errors={field.state.meta.errors} />
                </Field>
              )}
            />
          </CardContent>
        </Card>
      </div>

      {/* RIGHT SIDE */}
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Meal image</CardTitle>
            <CardDescription>
              Upload a photo that represents the meal.
            </CardDescription>
          </CardHeader>

          <CardContent>
            <form.Field
              name="image"
              children={(field) => (
                <ImageUploadField
                  label="Meal photo"
                  description="JPEG, PNG or WebP"
                  value={field.state.value}
                  onChange={(value) => value && field.handleChange(value)}
                  aspect="square"
                />
              )}
            />
          </CardContent>
        </Card>

        <div className="flex justify-end gap-3">
          <Button type="button" variant="outline" onClick={() => router.back()}>
            Cancel
          </Button>

          <Button
            disabled={!form.state.isValid}
            type="submit"
            className="bg-foodhub-maroon text-white hover:bg-foodhub-maroon/90"
          >
            Save meal
          </Button>
        </div>
      </div>
    </form>
  );
};

export default AddMealForm;
