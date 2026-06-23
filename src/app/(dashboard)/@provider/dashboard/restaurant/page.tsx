import Link from "next/link";

import { getProvider } from "@/actions/provider.action";
import RestaurantProfile from "@/components/modules/dashboard/provider/restaurant/restaurant-profile";

export default async function  RestaurantProfilePage() {
  const provider = await getProvider();

  return (
    <div className="space-y-6">
      
      <RestaurantProfile provider={provider} />
    </div>
  );
}
