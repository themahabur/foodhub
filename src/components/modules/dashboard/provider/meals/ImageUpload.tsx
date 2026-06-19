"use client";

import { useRef, useState, useCallback } from "react";
import { ImagePlus, UploadCloud, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { ACCEPTED_IMAGE_TYPES, MAX_IMAGE_SIZE_MB } from "@/data/mealForm.data";


interface ImageUploadProps {
  value: File | null;
  onChange: (file: File | null) => void;
  error?: string;
}

export function ImageUpload({ value, onChange, error }: ImageUploadProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);

  const handleFile = useCallback(
    (file: File | undefined) => {
      if (!file) return;

      if (!ACCEPTED_IMAGE_TYPES.includes(file.type)) return;
      if (file.size > MAX_IMAGE_SIZE_MB * 1024 * 1024) return;

      setPreview((prev) => {
        if (prev) URL.revokeObjectURL(prev);
        return URL.createObjectURL(file);
      });
      onChange(file);
    },
    [onChange]
  );

  const handleRemove = () => {
    setPreview((prev) => {
      if (prev) URL.revokeObjectURL(prev);
      return null;
    });
    onChange(null);
    if (inputRef.current) inputRef.current.value = "";
  };

  return (
    <div className="space-y-2">
      <input
        ref={inputRef}
        type="file"
        accept={ACCEPTED_IMAGE_TYPES.join(",")}
        className="hidden"
        onChange={(e) => handleFile(e.target.files?.[0])}
      />

      {value && preview ? (
        <div className="group relative aspect-square w-full overflow-hidden rounded-2xl border border-foodhub-muted">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={preview}
            alt="Meal preview"
            className="h-full w-full object-cover"
          />
          <button
            type="button"
            onClick={handleRemove}
            className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-foodhub-dark/80 text-foodhub-white transition hover:bg-foodhub-dark"
            aria-label="Remove image"
          >
            <X className="h-4 w-4" />
          </button>
          <button
            type="button"
            onClick={() => inputRef.current?.click()}
            className="absolute inset-x-3 bottom-3 flex items-center justify-center gap-2 rounded-xl bg-foodhub-white/90 py-2 text-sm font-medium text-foodhub-dark opacity-0 backdrop-blur transition group-hover:opacity-100"
          >
            <ImagePlus className="h-4 w-4" />
            Change photo
          </button>
        </div>
      ) : (
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          onDragOver={(e) => {
            e.preventDefault();
            setIsDragging(true);
          }}
          onDragLeave={() => setIsDragging(false)}
          onDrop={(e) => {
            e.preventDefault();
            setIsDragging(false);
            handleFile(e.dataTransfer.files?.[0]);
          }}
          className={cn(
            "flex aspect-square w-full flex-col items-center justify-center gap-3 rounded-2xl border-2 border-dashed text-center transition",
            isDragging
              ? "border-foodhub-maroon bg-foodhub-maroon/5"
              : "border-foodhub-muted bg-foodhub-muted/20 hover:border-foodhub-maroon/50"
          )}
        >
          <UploadCloud className="h-8 w-8 text-foodhub-maroon" />
          <div className="px-6">
            <p className="text-sm font-medium text-foodhub-dark">
              Click or drag a photo here
            </p>
            <p className="mt-1 text-xs text-foodhub-dark/50">
              JPG, PNG or WEBP, up to {MAX_IMAGE_SIZE_MB}MB
            </p>
          </div>
        </button>
      )}

      {error && <p className="text-xs text-red-600">{error}</p>}
    </div>
  );
}