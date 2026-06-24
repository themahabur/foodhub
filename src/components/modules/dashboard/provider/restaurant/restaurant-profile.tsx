import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Star,
  Clock,
  MapPin,
  BadgeCheck,
  Pencil,
  Tag,
  Wallet,
  ImageOff,
  User,
  Mail,
  Phone,
} from "lucide-react";
import { Provider } from "@/types/provider/provider.type";
import ProviderNotFound from "./ProviderNotFound";
import Link from "next/link";

type Props = {
  success: boolean;
  message: string;
  data: Provider;
  error: string;
};

const RestaurantProfile = ({ provider }: { provider: Props }) => {
  const { data: restaurant, success, message, error } = provider;

  console.log("RESTAURANT:", restaurant);

  //   const memberSince = new Date(restaurant.createdAt).toLocaleDateString(
  //     "en-US",
  //     {
  //       month: "long",
  //       year: "numeric",
  //     },
  //   );
  return (
    <div className="space-y-6">
      {success ? (
        <>
          <div className="flex items-start justify-between">
            <div>
              <h1 className="text-2xl font-semibold">Restaurant Profile</h1>
              <p className="text-sm text-muted-foreground">
                How customers see your restaurant on FoodHub.
              </p>
            </div>
            <Button
              asChild
              className="bg-foodhub-maroon hover:bg-foodhub-maroon/90"
            >
              <Link href="/dashboard/restaurant/edit">
                <Pencil className="size-4" />
                Update
              </Link>
            </Button>
          </div>
          <Card className="overflow-hidden p-0">
            {/* Banner */}
            <div className="relative h-52 w-full bg-gradient-to-br from-foodhub-maroon/15 to-amber-100">
              {restaurant.banner ? (
                <Image
                  src={restaurant.banner}
                  alt={restaurant.businessName}
                  fill
                  className="object-cover"
                />
              ) : (
                <div className="flex h-full items-center justify-center text-muted-foreground">
                  <ImageOff className="size-8" />
                </div>
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/0" />

              <div className="absolute right-4 top-4">
                <Badge
                  className={
                    restaurant.isOpen
                      ? "border-0 bg-emerald-500 text-white"
                      : "border-0 bg-zinc-500 text-white"
                  }
                >
                  <span className="mr-1.5 inline-block size-1.5 rounded-full bg-white" />
                  {restaurant.isOpen ? "Open now" : "Closed"}
                </Badge>
              </div>

              <div className="absolute -bottom-10 left-6 flex size-24 items-center justify-center overflow-hidden rounded-2xl border-4 border-background bg-white">
                {restaurant.logo ? (
                  <Image
                    src={restaurant.logo}
                    alt="logo"
                    width={96}
                    height={96}
                    className="object-cover"
                  />
                ) : (
                  <span className="text-2xl font-semibold text-foodhub-maroon">
                    {restaurant.businessName.charAt(0)}
                  </span>
                )}
              </div>
            </div>

            <CardContent className="pt-14 pb-6">
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-semibold">
                  {restaurant.businessName}
                </h2>
                {restaurant.isVerified ? (
                  <BadgeCheck className="size-5 text-foodhub-maroon" />
                ) : (
                  <Badge
                    variant="outline"
                    className="text-xs text-muted-foreground"
                  >
                    Pending verification
                  </Badge>
                )}
              </div>
              <p className="mt-1 flex items-center gap-1.5 text-sm text-muted-foreground">
                <MapPin className="size-3.5" />
                {restaurant.address}
              </p>
              <p className="mt-3 max-w-2xl text-sm text-muted-foreground">
                {restaurant.description}
              </p>

              {/* Stats row */}
              <div className="mt-5 grid grid-cols-3 gap-3 sm:max-w-md">
                <div className="rounded-xl border bg-amber-50 p-3">
                  <div className="flex items-center gap-1.5 text-amber-600">
                    <Star className="size-4 fill-amber-500 text-amber-500" />
                    <span className="text-sm font-semibold">
                      {restaurant.rating != null ? restaurant.rating : "New"}
                    </span>
                  </div>
                  <p className="mt-0.5 text-xs text-muted-foreground">Rating</p>
                </div>
                <div className="rounded-xl border bg-muted/50 p-3">
                  <div className="flex items-center gap-1.5">
                    <Clock className="size-4 text-foodhub-maroon" />
                    <span className="text-sm font-semibold">
                      {restaurant.deliveryTime}
                    </span>
                  </div>
                  <p className="mt-0.5 text-xs text-muted-foreground">
                    Delivery time
                  </p>
                </div>
                <div className="rounded-xl border bg-muted/50 p-3">
                  <div className="flex items-center gap-1.5">
                    <Wallet className="size-4 text-foodhub-maroon" />
                    <span className="text-sm font-semibold">
                      {restaurant.minOrder != null
                        ? `৳${restaurant.minOrder}`
                        : "No min"}
                    </span>
                  </div>
                  <p className="mt-0.5 text-xs text-muted-foreground">
                    Min order
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Cuisine + tags */}
          <Card>
            <CardContent className="space-y-5 pt-6">
              <div>
                <div className="mb-2 flex items-center gap-2 text-sm font-medium">
                  <Tag className="size-4 text-foodhub-maroon" />
                  Cuisine types
                </div>
                {restaurant.cuisineType.length > 0 ? (
                  <div className="flex flex-wrap gap-2">
                    {restaurant.cuisineType.map((c) => (
                      <Badge
                        key={c}
                        className="bg-foodhub-maroon/10 text-foodhub-maroon hover:bg-foodhub-maroon/15"
                      >
                        {c}
                      </Badge>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-muted-foreground">
                    No cuisine types added yet.
                  </p>
                )}
              </div>

              <div>
                <div className="mb-2 flex items-center gap-2 text-sm font-medium">
                  <Tag className="size-4 text-foodhub-maroon" />
                  Tags
                </div>
                {restaurant.tags.length > 0 ? (
                  <div className="flex flex-wrap gap-2">
                    {restaurant.tags.map((t) => (
                      <Badge key={t} variant="secondary">
                        {t}
                      </Badge>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-muted-foreground">
                    No tags added yet.
                  </p>
                )}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="space-y-4 pt-6">
              <div className="flex items-center gap-2 text-sm font-medium">
                <User className="size-4 text-foodhub-maroon" />
                Account holder
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                <div className="flex items-center gap-2 text-sm">
                  <User className="size-4 text-muted-foreground" />
                  {restaurant.user.name}
                  <Badge variant="outline" className="ml-1 text-xs">
                    {restaurant.user.role}
                  </Badge>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Mail className="size-4 text-muted-foreground" />
                  {restaurant.user.email}
                  {!restaurant.user.emailVerified && (
                    <span className="text-xs text-amber-600">(unverified)</span>
                  )}
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Phone className="size-4 text-muted-foreground" />
                  {restaurant.user.phone ?? "Not added"}
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Badge
                    className={
                      restaurant.user.status === "ACTIVE"
                        ? "border-0 bg-emerald-500/10 text-emerald-600"
                        : "border-0 bg-zinc-500/10 text-zinc-600"
                    }
                  >
                    {restaurant.user.status}
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* <p className="text-center text-xs text-muted-foreground">
            Member since {memberSince}
          </p> */}
        </>
      ) : (
        <ProviderNotFound error={error} />
      )}
    </div>
  );
};

export default RestaurantProfile;
