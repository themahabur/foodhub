import { OFFER_CATEGORIES, OFFER_TAGS } from "@/data/offers.data";

type OfferFilterPanelProps = {
  category: string;
  setCategory: (value: string) => void;
  tagFilter: string;
  setTagFilter: (value: string) => void;
};

export default function OfferFilterPanel({
  category,
  setCategory,
  tagFilter,
  setTagFilter,
}: OfferFilterPanelProps) {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <p className="mb-3 text-xs font-bold uppercase tracking-wider text-gray-400">
          Category
        </p>

        <div className="flex flex-col gap-1">
          {OFFER_CATEGORIES.map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => setCategory(item)}
              className={`rounded-xl px-3 py-2 text-left text-sm transition ${
                category === item
                  ? "bg-foodhub-maroon font-semibold text-white"
                  : "text-gray-600 hover:bg-gray-50"
              }`}
            >
              {item}
            </button>
          ))}
        </div>
      </div>

      <div>
        <p className="mb-3 text-xs font-bold uppercase tracking-wider text-gray-400">
          Offer Type
        </p>

        <div className="flex flex-col gap-1">
          {OFFER_TAGS.map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => setTagFilter(item)}
              className={`rounded-xl px-3 py-2 text-left text-sm transition ${
                tagFilter === item
                  ? "bg-foodhub-maroon font-semibold text-white"
                  : "text-gray-600 hover:bg-gray-50"
              }`}
            >
              {item}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}