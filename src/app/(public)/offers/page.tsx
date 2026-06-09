
import OffersClient from "@/components/modules/offers/OffersClient";
import { OFFERS } from "@/data/offers.data";

export default function OffersPage() {
  return <OffersClient offers={OFFERS} />;
}