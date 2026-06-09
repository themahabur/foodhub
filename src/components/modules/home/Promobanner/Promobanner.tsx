"use client";

import { ArrowRight, Copy, Check } from "lucide-react";
import { useState } from "react";
import { FadeUpOnScroll } from "@/components/shared/motion/motion-wrapper";

export default function PromoBanner() {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText("FOODHUB20");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="w-full py-6 px-4 md:px-8 container mx-auto">
      <FadeUpOnScroll>
        <div className="relative w-full rounded-3xl bg-[#8B1A2B] overflow-hidden px-8 md:px-14 py-10 flex flex-col md:flex-row items-center justify-between gap-8">

          {/* Decorative circles */}
          <div className="absolute -left-10 top-1/2 -translate-y-1/2 w-40 h-40 rounded-full bg-white/5 pointer-events-none" />
          <div className="absolute -left-4 top-1/2 -translate-y-1/2 w-24 h-24 rounded-full bg-white/5 pointer-events-none" />
          <div className="absolute -right-8 top-1/2 -translate-y-1/2 w-48 h-48 rounded-full bg-white/5 pointer-events-none" />
          <div className="absolute right-20 -top-6 w-24 h-24 rounded-full bg-white/5 pointer-events-none" />

          {/* LEFT: Text */}
          <div className="relative z-10">
            <span className="inline-block text-[10px] font-semibold tracking-widest uppercase text-white/60 border border-white/20 rounded-full px-3 py-1 mb-4">
              Limited Time Offer
            </span>
            <h2 className="text-white font-extrabold text-3xl md:text-4xl leading-tight">
              Get 20% OFF on
              <br />your
              <br />
              <span className="text-[#E8A020]">first order!</span>
            </h2>
          </div>

          {/* CENTER: Coupon code */}
          <div className="relative z-10 flex flex-col items-center gap-2">
            <p className="text-xs font-semibold tracking-widest uppercase text-white/50">
              Use Code
            </p>
            <button
              onClick={handleCopy}
              className="group flex items-center gap-3 border-2 border-dashed border-[#E8A020]/70 hover:border-[#E8A020] rounded-xl px-6 py-3 transition-all duration-200"
            >
              <span className="text-[#E8A020] font-extrabold tracking-[0.2em] text-lg">
                FOODHUB20
              </span>
              <span className="text-[#E8A020]/60 group-hover:text-[#E8A020] transition-colors">
                {copied
                  ? <Check className="w-4 h-4" />
                  : <Copy className="w-4 h-4" />
                }
              </span>
            </button>
            <p className="text-[11px] text-white/40">
              {copied ? "Copied!" : "Click to copy"}
            </p>
          </div>

          {/* RIGHT: Emoji + CTA */}
          <div className="relative z-10 flex items-center gap-5">
            <span className="text-5xl select-none">🍔</span>
            <button className="cursor-pointer flex items-center gap-2 bg-[#E8A020] hover:bg-[#d4911a] text-white font-bold text-sm px-7 py-3.5 rounded-full shadow-[0_4px_20px_rgba(232,160,32,0.4)] hover:shadow-[0_6px_28px_rgba(232,160,32,0.55)] hover:scale-[1.03] active:scale-[0.98] transition-all duration-200 whitespace-nowrap">
              Order Now <ArrowRight className="w-4 h-4" />
            </button>
          </div>

        </div>
      </FadeUpOnScroll>
    </section>
  );
}