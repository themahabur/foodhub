"use client";

import { useState } from "react";
import { Check, Copy } from "lucide-react";

type CopyCouponButtonProps = {
  code: string;
};

export default function CopyCouponButton({ code }: CopyCouponButtonProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  return (
    <button
      type="button"
      onClick={handleCopy}
      className="flex items-center gap-2 rounded-xl border-2 border-dashed border-white/50 px-3 py-2 text-xs font-bold text-white/90 transition hover:border-white hover:text-white"
    >
      {copied ? (
        <Check className="size-3.5" />
      ) : (
        <Copy className="size-3.5" />
      )}

      <span>{copied ? "Copied!" : code}</span>
    </button>
  );
}