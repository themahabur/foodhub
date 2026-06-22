"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { ImagePlus, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { uploadImage } from "@/lib/upload-image";

interface ImageUploadFieldProps {
  label: string;
  description?: string;
  value: string | null;
  onChange: (preview: string | null) => void;
  aspect?: "cover" | "square";
}

export function ImageUploadField({
  label,
  description,
  value,
  onChange,
  aspect = "square",
}: ImageUploadFieldProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);

  function startFakeProgress() {
    setProgress(0);

    const interval = setInterval(() => {
      setProgress((p) => {
        if (p >= 90) {
          clearInterval(interval);
          return p;
        }
        return p + Math.random() * 12;
      });
    }, 180);
  }

  async function handleFile(file: File | undefined) {
    if (!file) return;

    setUploading(true);
    startFakeProgress();

    try {
      const url = await uploadImage(file);

      setProgress(100);
      onChange(url);
    } catch (err) {
      console.error(err);
    } finally {
      setTimeout(() => {
        setUploading(false);
        setProgress(0);
      }, 300);
    }
  }

  function handleRemove(e: React.MouseEvent) {
    e.stopPropagation();
    onChange(null);
    if (inputRef.current) inputRef.current.value = "";
  }

  return (
    <div className="space-y-2">
      <div>
        <p className="text-sm font-medium text-foodhub-dark">{label}</p>
        {description && (
          <p className="text-xs text-foodhub-muted">{description}</p>
        )}
      </div>

      <button
        type="button"
        onClick={() => inputRef.current?.click()}
        disabled={uploading}
        className={cn(
          "group relative flex w-full items-center justify-center overflow-hidden rounded-xl border-2 border-dashed border-foodhub-maroon/20 bg-foodhub-maroon/[0.03] transition-colors hover:border-foodhub-maroon/40 hover:bg-foodhub-maroon/[0.06] disabled:opacity-60",
          aspect === "cover" ? "h-40 sm:h-48" : "h-28 w-28"
        )}
      >
        {/* Progress Bar */}
        {uploading && (
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-gray-200">
            <div
              className="h-full bg-foodhub-maroon transition-all duration-200"
              style={{ width: `${progress}%` }}
            />
          </div>
        )}

        {uploading ? (
          <div className="flex flex-col items-center gap-2">
            <div className="h-5 w-5 animate-spin rounded-full border-2 border-foodhub-maroon border-t-transparent" />
            <span className="text-xs text-foodhub-muted">
              Uploading...
            </span>
          </div>
        ) : value ? (
          <>
            <Image
              src={value}
              alt={label}
              fill
              className="object-cover"
              unoptimized
            />

            <div className="absolute inset-0 flex items-center justify-center bg-black/0 opacity-0 transition-opacity group-hover:bg-black/40 group-hover:opacity-100">
              <span className="text-xs font-medium text-white">
                Change
              </span>
            </div>

            <button
              type="button"
              onClick={handleRemove}
              className="absolute right-2 top-2 rounded-full bg-black/60 p-1 text-white opacity-0 transition-opacity group-hover:opacity-100"
              aria-label={`Remove ${label}`}
            >
              <X className="h-3.5 w-3.5" />
            </button>
          </>
        ) : (
          <div className="flex flex-col items-center gap-1.5 px-4 text-center">
            <ImagePlus className="h-5 w-5 text-foodhub-maroon/50" />
            <span className="text-xs text-foodhub-muted">
              Click to upload
            </span>
          </div>
        )}
      </button>

      <input
        ref={inputRef}
        type="file"
        accept="image/png,image/jpeg,image/webp"
        className="hidden"
        onChange={(e) => handleFile(e.target.files?.[0])}
      />
    </div>
  );
}