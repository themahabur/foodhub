"use client";

import { useState } from "react";
import { X, Plus } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface TagInputProps {
  values: string[];
  onChange: (values: string[]) => void;
  placeholder?: string;
  suggestions?: readonly string[];
}

export function TagInput({
  values,
  onChange,
  placeholder = "Type and press Enter",
  suggestions,
}: TagInputProps) {
  const [input, setInput] = useState("");

  function addTag(tag: string) {
    const trimmed = tag.trim();
    if (!trimmed || values.includes(trimmed)) return;
    onChange([...values, trimmed]);
    setInput("");
  }

  function removeTag(tag: string) {
    onChange(values.filter((v) => v !== tag));
  }

  const availableSuggestions = suggestions?.filter(
    (s) => !values.includes(s)
  );

  return (
    <div className="space-y-2.5">
      <div className="flex flex-wrap gap-2">
        {values.map((tag) => (
          <Badge
            key={tag}
            variant="secondary"
            className="gap-1 bg-foodhub-maroon/10 text-foodhub-maroon hover:bg-foodhub-maroon/15"
          >
            {tag}
            <button
              type="button"
              onClick={() => removeTag(tag)}
              aria-label={`Remove ${tag}`}
              className="rounded-full hover:text-foodhub-maroon/70"
            >
              <X className="h-3 w-3" />
            </button>
          </Badge>
        ))}
      </div>

      <div className="flex gap-2">
        <Input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              addTag(input);
            }
          }}
          placeholder={placeholder}
          className="flex-1"
        />
        <Button
          type="button"
          variant="outline"
          size="icon"
          onClick={() => addTag(input)}
          aria-label="Add"
        >
          <Plus className="h-4 w-4" />
        </Button>
      </div>

      {availableSuggestions && availableSuggestions.length > 0 && (
        <div className="flex flex-wrap gap-1.5">
          {availableSuggestions.map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => addTag(s)}
              className={cn(
                "rounded-full border border-foodhub-maroon/15 px-2.5 py-1 text-xs text-foodhub-muted transition-colors",
                "hover:border-foodhub-maroon/30 hover:bg-foodhub-maroon/5 hover:text-foodhub-maroon"
              )}
            >
              + {s}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}