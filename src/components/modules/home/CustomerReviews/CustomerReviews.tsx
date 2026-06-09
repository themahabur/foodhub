import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Star } from "lucide-react";
import {
  FadeUpOnScroll,
  StaggerContainer,
  StaggerItem,
} from "@/components/shared/motion/motion-wrapper";
import { reviews } from "@/data/navbar.data";



export default function CustomerReviews() {
  return (
    <section className="w-full py-10 px-4 md:px-8 container mx-auto">

      {/* Header */}
      <FadeUpOnScroll className="flex items-center justify-between mb-6">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
          What Customers Say
        </h2>
        <Link
          href="/reviews"
          className="flex items-center gap-1 text-[#8B1A2B] font-medium text-sm hover:underline transition-all"
        >
          View all <ArrowRight className="w-4 h-4" />
        </Link>
      </FadeUpOnScroll>

      {/* Reviews Grid */}
      <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {reviews.map((review) => (
          <StaggerItem key={review.id}>
            <div className="flex flex-col justify-between h-full bg-gray-50 hover:bg-white border border-transparent hover:border-[#8B1A2B]/10 hover:shadow-md rounded-2xl p-6 transition-all duration-300">

              {/* Quote mark */}
              <div>
                <svg
                  width="28" height="22" viewBox="0 0 28 22"
                  fill="none" className="mb-3"
                >
                  <path
                    d="M0 22V13.6C0 9.97 0.9 6.9 2.7 4.38 4.56 1.86 7.2 0.24 10.62 0l1.08 2.1C9.18 2.76 7.32 3.84 6 5.34 4.68 6.84 3.96 8.56 3.84 10.5H7.8V22H0Zm15.6 0V13.6c0-3.63.9-6.7 2.7-9.22C20.16 1.86 22.8.24 26.22 0l1.08 2.1c-2.52.66-4.38 1.74-5.7 3.24-1.32 1.5-2.04 3.22-2.16 5.16H23.4V22H15.6Z"
                    fill="#8B1A2B"
                    opacity="0.75"
                  />
                </svg>

                {/* Stars */}
                <div className="flex items-center gap-0.5 mb-4">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        i < review.rating
                          ? "fill-amber-400 text-amber-400"
                          : "fill-gray-200 text-gray-200"
                      }`}
                    />
                  ))}
                </div>

                {/* Review text */}
                <p className="text-sm text-gray-600 leading-relaxed mb-6">
                  {review.text}
                </p>
              </div>

              {/* Reviewer */}
              <div className="flex items-center gap-3 pt-4 border-t border-gray-100">
                <div className="relative w-10 h-10 rounded-full overflow-hidden bg-gray-200 shrink-0">
                  <Image
                    src={review.avatar}
                    alt={review.name}
                    fill
                    className="object-cover"
                    
                  />
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-900">{review.name}</p>
                  <p className="text-xs text-gray-400">Verified Customer</p>
                </div>
              </div>

            </div>
          </StaggerItem>
        ))}
      </StaggerContainer>

    </section>
  );
}