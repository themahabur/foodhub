"use client";

import { useRef, useState } from "react";
import { Camera, Loader2 } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { toast } from "sonner";

interface AvatarUploadProps {
  name: string;
  image: string;
  onUpload: (url: string) => void;
}

export function AvatarUpload({ name, image, onUpload }: AvatarUploadProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [preview, setPreview] = useState(image);
  const [uploading, setUploading] = useState(false);

  async function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      toast.error("Image must be under 5MB");
      return;
    }

    const localPreview = URL.createObjectURL(file);
    setPreview(localPreview);
    setUploading(true);

    // Mock upload — replace with real S3/UploadThing call later
    await new Promise((resolve) => setTimeout(resolve, 600));
    onUpload(localPreview);
    toast.success("Profile picture updated");
    setUploading(false);
  }

  const initials = name.split(" ").map((n) => n[0]).join("").slice(0, 2).toUpperCase();

  return (
    <div className="relative w-fit">
      <Avatar className="h-24 w-24 border-2 border-foodhub-maroon/20">
        <AvatarImage src={preview} alt={name} />
        <AvatarFallback className="bg-foodhub-maroon text-white text-xl">
          {initials}
        </AvatarFallback>
      </Avatar>

      <button
        type="button"
        onClick={() => inputRef.current?.click()}
        disabled={uploading}
        className="absolute bottom-0 right-0 flex h-8 w-8 items-center justify-center rounded-full bg-foodhub-maroon text-white shadow-md transition hover:bg-foodhub-maroon/90 disabled:opacity-60"
      >
        {uploading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Camera className="h-4 w-4" />}
      </button>

      <input ref={inputRef} type="file" accept="image/*" className="hidden" onChange={handleFileChange} />
    </div>
  );
}