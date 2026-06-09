export type OfferTag = "Hot" | "New" | "Exclusive" | "Limited";

export type Offer = {
  id: number;
  code: string;
  title: string;
  description: string;
  discount: string;
  discountType: "percent" | "flat";
  minOrder: number;
  maxDiscount?: number;
  validUntil: string;
  category: string;
  restaurant?: string;
  tag: OfferTag;
  color: {
    bg: string;
    accent: string;
    badge: string;
  };
  emoji: string;
};

export type OfferSortValue = "default" | "discount" | "expiry" | "minorder";