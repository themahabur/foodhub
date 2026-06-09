
import RestaurantsClient from "@/components/modules/restaurant/RestaurantsClient";
import { RESTAURANTS } from "@/data/restaurants.data";

export default function RestaurantsPage() {
  return <RestaurantsClient restaurants={RESTAURANTS} />;
}