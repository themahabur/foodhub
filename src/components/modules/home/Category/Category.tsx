import {
  FadeUpOnScroll,
  StaggerContainer,
  StaggerItem,
  WiggleOnHover,
} from "@/components/shared/motion/motion-wrapper";
import { categories } from "@/data/navbar.data";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export default function CategorySection() {
  return (
    <section className="w-full py-10 px-4 md:px-8 container mx-auto">
      {/* Header */}
      <FadeUpOnScroll className="flex items-center justify-between mb-6">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
          Browse by Category
        </h2>
        <Link
          href="/categories"
          className="flex items-center gap-1 text-[#8B1A2B] font-medium text-sm hover:underline transition-all"
        >
          View all <ArrowRight className="w-4 h-4" />
        </Link>
      </FadeUpOnScroll>

      {/* Category Grid */}
      <StaggerContainer className="grid grid-cols-3 sm:grid-cols-3 md:grid-cols-6 gap-3 md:gap-4">
        {categories.map((cat) => (
          <StaggerItem key={cat.id}>
            <Link
              href={cat.href}
              className={`group flex flex-col items-center justify-center gap-3 p-4 md:p-5 rounded-2xl ${cat.bg} border border-transparent hover:border-[#8B1A2B]/20 hover:shadow-md transition-all duration-200 cursor-pointer`}
            >
              <WiggleOnHover
                className={`w-12 h-12 md:w-14 md:h-14 rounded-xl ${cat.iconBg} flex items-center justify-center text-2xl md:text-3xl`}
              >
                {cat.icon}
              </WiggleOnHover>
              <span className="text-sm font-medium text-gray-700 group-hover:text-[#8B1A2B] transition-colors duration-200">
                {cat.name}
              </span>
            </Link>
          </StaggerItem>
        ))}
      </StaggerContainer>
    </section>
  );
}
