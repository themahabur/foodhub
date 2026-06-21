// app/(dashboard)/provider/reviews/page.tsx
import { Star, TrendingUp, MessageSquare } from "lucide-react";

// ----- Types & mock data (swap for a Prisma query later, same shape) -----
type Review = {
  id: string;
  customerName: string;
  rating: number; // 1-5
  comment: string;
  mealName: string;
  createdAt: string; // ISO date
};

const MOCK_REVIEWS: Review[] = [
  { id: "1", customerName: "John Doe", rating: 5, comment: "Great food! Tasted like home-cooked, packaging was solid too.", mealName: "Burger Combo", createdAt: "2026-06-19" },
  { id: "2", customerName: "Sarah Ahmed", rating: 4, comment: "Pizza was good but delivery was a bit late.", mealName: "Pizza", createdAt: "2026-06-16" },
  { id: "3", customerName: "Rakib Hasan", rating: 5, comment: "Best biryani in Rajshahi, hands down. Will order again.", mealName: "Kacchi Biryani", createdAt: "2026-06-15" },
  { id: "4", customerName: "Mitu Chowdhury", rating: 2, comment: "Food was cold when it arrived. Taste was okay otherwise.", mealName: "Chicken Fried Rice", createdAt: "2026-06-12" },
  { id: "5", customerName: "Tanvir Islam", rating: 5, comment: "Perfect spice level, generous portion. My go-to order now.", mealName: "Beef Tehari", createdAt: "2026-06-10" },
];

// ----- Helpers -----
function timeAgo(dateStr: string) {
  const days = Math.floor((Date.now() - new Date(dateStr).getTime()) / (1000 * 60 * 60 * 24));
  if (days === 0) return "Today";
  if (days === 1) return "1 day ago";
  return `${days} days ago`;
}

function StarRow({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5" aria-label={`${rating} out of 5 stars`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <Star key={i} className={i < rating ? "h-4 w-4 fill-foodhub-maroon text-foodhub-maroon" : "h-4 w-4 fill-none text-muted-foreground/30"} />
      ))}
    </div>
  );
}

function StatCard({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="flex items-center gap-4 rounded-xl border bg-card p-5">
      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-foodhub-maroon/10 text-foodhub-maroon">
        {icon}
      </div>
      <div>
        <p className="text-2xl font-semibold leading-none tracking-tight">{value}</p>
        <p className="mt-1 text-sm text-muted-foreground">{label}</p>
      </div>
    </div>
  );
}

export default function ProviderReviewsPage() {
  const reviews = MOCK_REVIEWS;

  const totalReviews = reviews.length;
  const avgRating = totalReviews === 0 ? 0 : reviews.reduce((sum, r) => sum + r.rating, 0) / totalReviews;
  const positiveCount = reviews.filter((r) => r.rating >= 4).length;
  const positivePct = totalReviews === 0 ? 0 : Math.round((positiveCount / totalReviews) * 100);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Reviews</h1>
        <p className="text-sm text-muted-foreground">What customers are saying about your meals</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <StatCard icon={<Star className="h-5 w-5" />} label="Average rating" value={totalReviews === 0 ? "—" : avgRating.toFixed(1)} />
        <StatCard icon={<MessageSquare className="h-5 w-5" />} label="Total reviews" value={String(totalReviews)} />
        <StatCard icon={<TrendingUp className="h-5 w-5" />} label="Positive reviews" value={`${positivePct}%`} />
      </div>

      <div className="rounded-xl border bg-card">
        {totalReviews === 0 ? (
          <div className="p-10 text-center text-sm text-muted-foreground">
            No reviews yet. They&apos;ll show up here once customers rate your meals.
          </div>
        ) : (
          <ul className="divide-y">
            {reviews.map((review) => (
              <li key={review.id} className="p-5">
                <div className="flex items-start justify-between gap-3">
                  <StarRow rating={review.rating} />
                  <span className="shrink-0 text-xs text-muted-foreground">{timeAgo(review.createdAt)}</span>
                </div>
                <p className="mt-2 text-sm leading-relaxed text-foreground">{review.comment}</p>
                <div className="mt-3 flex items-center gap-2 text-xs text-muted-foreground">
                  <span className="font-medium text-foreground">{review.customerName}</span>
                  <span>•</span>
                  <span className="rounded-full bg-foodhub-maroon/10 px-2 py-0.5 text-foodhub-maroon">{review.mealName}</span>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}