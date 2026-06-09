import { Search, ShoppingBag, Smile } from "lucide-react";
import { FadeUpOnScroll, StaggerContainer, StaggerItem } from "@/components/shared/motion/motion-wrapper";

const steps = [
  {
    id: 1,
    title: "Explore",
    description: "Discover meals, cuisines and top providers.",
    icon: Search,
  },
  {
    id: 2,
    title: "Order",
    description: "Place your order and pay securely.",
    icon: ShoppingBag,
  },
  {
    id: 3,
    title: "Enjoy",
    description: "Track your delivery and enjoy your meal.",
    icon: Smile,
  },
];

export default function HowItWorks() {
  return (
    <section className="w-full py-14 px-4 md:px-8 container mx-auto">

      {/* Header */}
      <FadeUpOnScroll className="text-center mb-12">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
          How It Works
        </h2>
      </FadeUpOnScroll>

      {/* Steps */}
      <StaggerContainer className="flex flex-col md:flex-row items-center justify-center gap-0">
        {steps.map((step, index) => (
          <StaggerItem key={step.id}>
            <div className="flex flex-col md:flex-row items-center">

              {/* Step card */}
              <div className="flex flex-col items-center text-center w-56">
                {/* Icon circle with badge */}
                <div className="relative mb-5">
                  <div className="w-24 h-24 rounded-full bg-red-50 flex items-center justify-center">
                    <step.icon className="w-9 h-9 text-[#8B1A2B]/70" strokeWidth={1.5} />
                  </div>
                  {/* Step number badge */}
                  <span className="absolute -top-1 -right-1 w-6 h-6 rounded-full bg-[#8B1A2B] text-white text-xs font-bold flex items-center justify-center shadow-sm">
                    {step.id}
                  </span>
                </div>

                <h3 className="font-bold text-gray-900 text-base mb-1.5">
                  {step.title}
                </h3>
                <p className="text-sm text-gray-400 leading-relaxed max-w-[180px]">
                  {step.description}
                </p>
              </div>

              {/* Dashed connector — only between steps */}
              {index < steps.length - 1 && (
                <div className="hidden md:flex items-center mx-2 mb-12">
                  <svg width="100" height="16" viewBox="0 0 100 16" fill="none">
                    <line
                      x1="0" y1="8" x2="88" y2="8"
                      stroke="#8B1A2B"
                      strokeWidth="1.5"
                      strokeDasharray="6 5"
                      strokeLinecap="round"
                      opacity="0.4"
                    />
                    <path
                      d="M88 4 L96 8 L88 12"
                      stroke="#8B1A2B"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      opacity="0.4"
                    />
                  </svg>
                </div>
              )}

            </div>
          </StaggerItem>
        ))}
      </StaggerContainer>

    </section>
  );
}