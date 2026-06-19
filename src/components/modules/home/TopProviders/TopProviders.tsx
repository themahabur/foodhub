import Link from "next/link";
import { ArrowRight, Star, Clock } from "lucide-react";
import {
  FadeUpOnScroll,
  StaggerContainer,
  StaggerItem,
} from "@/components/shared/motion/motion-wrapper";
import { Provider } from "@/types/provider/provider.type";

export default function TopProviders({ providers }: { providers: Provider[] }) {
  return (
    <section className="w-full py-10 px-4 md:px-8 container mx-auto">

      {/* Header */}
      <FadeUpOnScroll className="flex items-center justify-between mb-6">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
          Top Providers
        </h2>
        <Link
          href="/providers"
          className="flex items-center gap-1 text-[#8B1A2B] font-medium text-sm hover:underline transition-all"
        >
          View all <ArrowRight className="w-4 h-4" />
        </Link>
      </FadeUpOnScroll>

      {/* Providers Row */}
      <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
        {providers.map((provider) => (
          <StaggerItem key={provider.id}>
            <Link
              href={`/provider/${provider.id}`}
              className="flex items-center gap-3 p-4 bg-white rounded-2xl border border-gray-100 hover:border-[#8B1A2B]/15 hover:shadow-md transition-all duration-200 group"
            >
              {/* Avatar */}
              <div className={`w-12 h-12 shrink-0 rounded-xl flex items-center justify-center text-lg font-bold 
                ${
                  // provider.color
                  "bg-foodhub-maroon/10 text-foodhub-maroon"
                }
                `}>
                {provider.businessName.charAt(0).toUpperCase()}
              </div>

              {/* Info */}
              <div className="min-w-0">
                <p className="font-semibold text-gray-900 text-sm truncate group-hover:text-[#8B1A2B] transition-colors duration-200">
                  {provider.businessName}
                </p>
                <p className="text-xs text-gray-400 truncate mb-1.5">
                  {provider.cuisineType.join(", ")}
                </p>
                <div className="flex items-center gap-2 text-xs text-gray-500">
                  <span className="flex items-center gap-0.5">
                    <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                    <span className="font-medium text-gray-700">{
                    // provider.rating
                    "4.5"
                    }</span>
                  </span>
                  <span className="w-1 h-1 rounded-full bg-gray-300" />
                  <span className="flex items-center gap-0.5">
                    <Clock className="w-3 h-3 text-gray-400" />
                    {provider.deliveryTime.split(" ")[0]} min
                  </span>
                </div>
              </div>
            </Link>
          </StaggerItem>
        ))}
      </StaggerContainer>

    </section>
  );
}
