"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { CheckCircle2, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { MealFormData, MealFormErrors } from "@/types/mealForm.type";
import { DESCRIPTION_MAX_LENGTH, MEAL_CATEGORIES } from "@/data/mealForm.data";
import { ImageUpload } from "./ImageUpload";


const INITIAL_FORM: MealFormData = {
  name: "",
  category: "",
  price: "",
  description: "",
  image: null,
};

function validate(form: MealFormData): MealFormErrors {
  const errors: MealFormErrors = {};

  if (!form.name.trim()) errors.name = "Give your meal a name.";
  if (!form.category) errors.category = "Choose a category.";

  if (!form.price.trim()) {
    errors.price = "Set a price.";
  } else if (Number(form.price) <= 0) {
    errors.price = "Price must be more than ৳0.";
  }

  if (!form.description.trim()) {
    errors.description = "Add a short description.";
  } else if (form.description.length > DESCRIPTION_MAX_LENGTH) {
    errors.description = `Keep it under ${DESCRIPTION_MAX_LENGTH} characters.`;
  }

  if (!form.image) errors.image = "Add a photo of the meal.";

  return errors;
}

export function CreateMealForm() {
  const router = useRouter();
  const [form, setForm] = useState<MealFormData>(INITIAL_FORM);
  const [errors, setErrors] = useState<MealFormErrors>({});
  const [status, setStatus] = useState<"idle" | "submitting" | "success">(
    "idle"
  );

  const updateField = <K extends keyof MealFormData>(
    key: K,
    value: MealFormData[K]
  ) => {
    setForm((prev) => ({ ...prev, [key]: value }));
    setErrors((prev) => ({ ...prev, [key]: undefined }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const nextErrors = validate(form);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    setStatus("submitting");

    // Mock submit — replace with a real API call or server action later.
    // e.g. await fetch("/api/provider/meals", { method: "POST", body: ... })
    await new Promise((resolve) => setTimeout(resolve, 900));

    setStatus("success");
  };

  if (status === "success") {
    return (
      <div className="flex flex-col items-center gap-4 rounded-2xl border border-foodhub-muted bg-foodhub-white px-6 py-16 text-center">
        <CheckCircle2 className="h-12 w-12 text-foodhub-maroon" />
        <div>
          <h2 className="text-lg font-semibold text-foodhub-dark">
            {form.name} is added
          </h2>
          <p className="mt-1 text-sm text-foodhub-dark/60">
            Customers will see it on your menu shortly.
          </p>
        </div>
        <div className="mt-2 flex gap-3">
          <Button
            variant="outline"
            onClick={() => {
              setForm(INITIAL_FORM);
              setStatus("idle");
            }}
          >
            Add another meal
          </Button>
          <Button
            className="bg-foodhub-maroon hover:bg-foodhub-maroon/90"
            onClick={() => router.push("/provider/meals")}
          >
            View all meals
          </Button>
        </div>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="grid gap-8 md:grid-cols-[320px_1fr]"
    >
      <div>
        <Label className="mb-2 block text-foodhub-dark">Meal photo</Label>
        <ImageUpload
          value={form.image}
          onChange={(file) => updateField("image", file)}
          error={errors.image}
        />
      </div>

      <div className="space-y-6">
        <div>
          <Label htmlFor="name" className="text-foodhub-dark">
            Meal name
          </Label>
          <Input
            id="name"
            placeholder="e.g. Kacchi Biryani"
            value={form.name}
            onChange={(e) => updateField("name", e.target.value)}
            className="mt-1.5"
          />
          {errors.name && (
            <p className="mt-1 text-xs text-red-600">{errors.name}</p>
          )}
        </div>

        <div className="grid gap-6 sm:grid-cols-2">
          <div>
            <Label htmlFor="category" className="text-foodhub-dark">
              Category
            </Label>
            <Select
              value={form.category}
              onValueChange={(value) =>
                updateField("category", value as MealFormData["category"])
              }
            >
              <SelectTrigger id="category" className="mt-1.5">
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent>
                {MEAL_CATEGORIES.map((category) => (
                  <SelectItem key={category.value} value={category.value}>
                    {category.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.category && (
              <p className="mt-1 text-xs text-red-600">{errors.category}</p>
            )}
          </div>

          <div>
            <Label htmlFor="price" className="text-foodhub-dark">
              Price
            </Label>
            <div className="relative mt-1.5">
              <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-foodhub-dark/50">
                ৳
              </span>
              <Input
                id="price"
                type="number"
                min="0"
                placeholder="350"
                value={form.price}
                onChange={(e) => updateField("price", e.target.value)}
                className="pl-7"
              />
            </div>
            {errors.price && (
              <p className="mt-1 text-xs text-red-600">{errors.price}</p>
            )}
          </div>
        </div>

        <div>
          <div className="flex items-baseline justify-between">
            <Label htmlFor="description" className="text-foodhub-dark">
              Description
            </Label>
            <span className="text-xs text-foodhub-dark/40">
              {form.description.length}/{DESCRIPTION_MAX_LENGTH}
            </span>
          </div>
          <Textarea
            id="description"
            placeholder="What makes this meal worth ordering?"
            value={form.description}
            onChange={(e) => updateField("description", e.target.value)}
            maxLength={DESCRIPTION_MAX_LENGTH}
            rows={4}
            className="mt-1.5 resize-none"
          />
          {errors.description && (
            <p className="mt-1 text-xs text-red-600">{errors.description}</p>
          )}
        </div>

        <div className="flex items-center justify-end gap-3 border-t border-foodhub-muted pt-6">
          <Button type="button" variant="ghost" onClick={() => router.back()}>
            Cancel
          </Button>
          <Button
            type="submit"
            disabled={status === "submitting"}
            className="bg-foodhub-maroon hover:bg-foodhub-maroon/90"
          >
            {status === "submitting" ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Adding meal...
              </>
            ) : (
              "Add meal"
            )}
          </Button>
        </div>
      </div>
    </form>
  );
}