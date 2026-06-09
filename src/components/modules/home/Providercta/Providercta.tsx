import { ArrowRight } from "lucide-react";
import { FadeUpOnScroll } from "@/components/shared/motion/motion-wrapper";

export default function ProviderCTA() {
  return (
    <section className="w-full py-6 px-4 md:px-8 container mx-auto">
      <FadeUpOnScroll>
        <div className="relative w-full rounded-3xl bg-[#8B1A2B] overflow-hidden px-10 md:px-16 py-10 flex flex-col md:flex-row items-center justify-between gap-6">

          {/* Decorative circles */}
          <div className="absolute -left-8 top-1/2 -translate-y-1/2 w-40 h-40 rounded-full bg-white/5 pointer-events-none" />
          <div className="absolute -left-2 top-1/2 -translate-y-1/2 w-24 h-24 rounded-full bg-white/5 pointer-events-none" />
          <div className="absolute -right-10 top-1/2 -translate-y-1/2 w-52 h-52 rounded-full bg-white/5 pointer-events-none" />
          <div className="absolute right-24 -bottom-8 w-28 h-28 rounded-full bg-white/5 pointer-events-none" />

          {/* LEFT: Icon */}
          <div className="relative z-10 shrink-0">
            <div className="w-16 h-16 rounded-2xl bg-white/10 flex items-center justify-center text-4xl">
              🍳
            </div>
          </div>

          {/* CENTER: Text */}
          <div className="relative z-10 flex-1 md:px-8">
            <h2 className="text-white font-extrabold text-2xl md:text-3xl leading-snug mb-2">
              Become a FoodHub Provider
            </h2>
            <p className="text-white/60 text-sm leading-relaxed max-w-sm">
              Grow your kitchen with thousands of hungry customers across Rajshahi, Dhaka & beyond.
            </p>
          </div>

          {/* RIGHT: CTA */}
          <div className="relative z-10 shrink-0">
            <button className="cursor-pointer flex items-center gap-2 bg-transparent border-2 border-white/40 hover:border-white hover:bg-white hover:text-[#8B1A2B] text-white font-semibold text-sm px-7 py-3.5 rounded-full transition-all duration-200 whitespace-nowrap group">
              Join as Provider
              <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform duration-200" />
            </button>
          </div>

        </div>
      </FadeUpOnScroll>
    </section>
  );
}