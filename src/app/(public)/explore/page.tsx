
import MealsClient from "@/components/modules/meals/MealsClient";
import { MEALS } from "@/data/meals.data";

export default function MealsPage() {
  return <MealsClient meals={MEALS} />;
}