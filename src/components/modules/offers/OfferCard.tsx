import { Clock } from "lucide-react";

import type { Offer } from "@/types/offer.types";
import { OFFER_TAG_STYLES } from "@/data/offers.data";
import CopyCouponButton from "./CopyCouponButton";

type OfferCardProps = {
  offer: Offer;
};

export default function OfferCard({ offer }: OfferCardProps) {
  return (
    <article className="group h-full overflow-hidden rounded-3xl border border-gray-100 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:border-foodhub-maroon/20 hover:shadow-xl hover:shadow-foodhub-maroon/10">
      <div className={`relative p-5 ${offer.color.bg} ${offer.color.accent}`}>
        <div className="absolute -right-6 -top-6 size-24 rounded-full bg-white/10" />
        <div className="absolute -bottom-10 -left-10 size-28 rounded-full bg-white/10" />

        <div className="relative flex items-start justify-between gap-4">
          <div>
            <span
              className={`inline-flex rounded-full border px-2.5 py-1 text-[10px] font-extrabold ${offer.color.badge}`}
            >
              {offer.tag}
            </span>

            <h3 className="mt-4 text-2xl font-extrabold">
              {offer.discount}
            </h3>

            <p className="mt-1 text-sm font-semibold text-white/85">
              {offer.title}
            </p>
          </div>

          <span className="text-5xl">{offer.emoji}</span>
        </div>

        <div className="relative mt-5">
          <CopyCouponButton code={offer.code} />
        </div>
      </div>

      <div className="p-5">
        <p className="text-sm leading-6 text-gray-500">{offer.description}</p>

        <div className="mt-4 flex flex-wrap gap-2">
          <span
            className={`rounded-full border px-3 py-1 text-xs font-bold ${
              OFFER_TAG_STYLES[offer.tag]
            }`}
          >
            {offer.tag}
          </span>

          <span className="rounded-full border border-gray-200 bg-gray-50 px-3 py-1 text-xs font-bold text-gray-600">
            {offer.category}
          </span>
        </div>

        <div className="mt-5 space-y-2 border-t border-dashed border-gray-200 pt-4">
          <div className="flex items-center justify-between text-xs">
            <span className="text-gray-400">Min. order</span>
            <span className="font-bold text-gray-700">
              {offer.minOrder === 0 ? "No minimum" : `৳${offer.minOrder}`}
            </span>
          </div>

          {offer.maxDiscount && (
            <div className="flex items-center justify-between text-xs">
              <span className="text-gray-400">Max discount</span>
              <span className="font-bold text-gray-700">
                ৳{offer.maxDiscount}
              </span>
            </div>
          )}

          <div className="flex items-center justify-between gap-3 text-xs">
            <span className="flex items-center gap-1 text-gray-400">
              <Clock className="size-3.5" />
              Valid until
            </span>

            <span className="font-bold text-foodhub-maroon">
              {offer.validUntil}
            </span>
          </div>

          {offer.restaurant && (
            <div className="flex items-center justify-between gap-3 text-xs">
              <span className="text-gray-400">Restaurant</span>
              <span className="truncate font-bold text-gray-700">
                {offer.restaurant}
              </span>
            </div>
          )}
        </div>
      </div>
    </article>
  );
}