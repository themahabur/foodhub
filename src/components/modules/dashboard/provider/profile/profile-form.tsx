"use client";

import { useState, useTransition } from "react";
import { CheckCircle2, Loader2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

import { AvatarUpload } from "./avatar-upload";
import { FadeUp } from "@/components/shared/motion/motion-wrapper";
import { updateProviderProfile, updateRestaurantInfo } from "@/lib/actions/profile/profile";

interface ProfileFormProps {
  user: { name: string; email: string; phone: string; bio: string; address: string; city: string; image: string };
  provider: { restaurantName: string; tradeLicense: string; nidNumber: string; businessAddress: string };
}

export function ProfileForm({ user, provider }: ProfileFormProps) {
  const [profile, setProfile] = useState(user);
  const [restaurant, setRestaurant] = useState(provider);
  const [savingProfile, startProfileSave] = useTransition();
  const [savingRestaurant, startRestaurantSave] = useTransition();

  function handleProfileSave() {
    startProfileSave(async () => {
      try {
        await updateProviderProfile(profile);
        toast.success("Profile updated");
      } catch {
        toast.error("Couldn't save changes");
      }
    });
  }

  function handleRestaurantSave() {
    startRestaurantSave(async () => {
      try {
        await updateRestaurantInfo(restaurant);
        toast.success("Restaurant info updated");
      } catch {
        toast.error("Couldn't save changes");
      }
    });
  }

  return (
    <div className="space-y-6">
      <FadeUp>
        <Card>
          <CardHeader>
            <CardTitle>Personal Information</CardTitle>
            <CardDescription>Your basic profile details</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <AvatarUpload
              name={profile.name}
              image={profile.image}
              onUpload={(url) => setProfile((p) => ({ ...p, image: url }))}
            />

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  value={profile.name}
                  onChange={(e) => setProfile((p) => ({ ...p, name: e.target.value }))}
                  placeholder="Your full name"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <div className="relative">
                  <Input id="email" value={profile.email} disabled className="pr-9 bg-muted" />
                  <CheckCircle2 className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-green-600" />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  id="phone"
                  type="tel"
                  value={profile.phone}
                  onChange={(e) => setProfile((p) => ({ ...p, phone: e.target.value }))}
                  placeholder="01XXXXXXXXX"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="city">City</Label>
                <Input
                  id="city"
                  value={profile.city}
                  onChange={(e) => setProfile((p) => ({ ...p, city: e.target.value }))}
                  placeholder="Rajshahi"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="address">Address</Label>
              <Textarea
                id="address"
                value={profile.address}
                onChange={(e) => setProfile((p) => ({ ...p, address: e.target.value }))}
                placeholder="House, road, area"
                rows={2}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="bio">Bio</Label>
              <Textarea
                id="bio"
                value={profile.bio}
                onChange={(e) => setProfile((p) => ({ ...p, bio: e.target.value }))}
                placeholder="Tell customers a bit about yourself"
                rows={3}
              />
            </div>
          </CardContent>
        </Card>
      </FadeUp>

      <div className="flex justify-end">
        <Button
          onClick={handleProfileSave}
          disabled={savingProfile}
          className="bg-foodhub-maroon hover:bg-foodhub-maroon/90"
        >
          {savingProfile && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          Save Personal Info
        </Button>
      </div>

      <FadeUp delay={0.1}>
        <Card>
          <CardHeader>
            <CardTitle>Restaurant Owner Information</CardTitle>
            <CardDescription>Business details shown for verification</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="restaurantName">Restaurant Name</Label>
                <Input
                  id="restaurantName"
                  value={restaurant.restaurantName}
                  onChange={(e) => setRestaurant((r) => ({ ...r, restaurantName: e.target.value }))}
                  placeholder="e.g. Rajshahi Biryani House"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="tradeLicense">Trade License Number</Label>
                <Input
                  id="tradeLicense"
                  value={restaurant.tradeLicense}
                  onChange={(e) => setRestaurant((r) => ({ ...r, tradeLicense: e.target.value }))}
                  placeholder="TRAD/XXXXXX/2026"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="nidNumber">NID Number</Label>
                <Input
                  id="nidNumber"
                  value={restaurant.nidNumber}
                  onChange={(e) => setRestaurant((r) => ({ ...r, nidNumber: e.target.value }))}
                  placeholder="National ID number"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="businessAddress">Business Address</Label>
              <Textarea
                id="businessAddress"
                value={restaurant.businessAddress}
                onChange={(e) => setRestaurant((r) => ({ ...r, businessAddress: e.target.value }))}
                placeholder="Restaurant's full address"
                rows={2}
              />
            </div>
          </CardContent>
        </Card>
      </FadeUp>

      <div className="flex justify-end">
        <Button
          onClick={handleRestaurantSave}
          disabled={savingRestaurant}
          className="bg-foodhub-maroon hover:bg-foodhub-maroon/90"
        >
          {savingRestaurant && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          Save Restaurant Info
        </Button>
      </div>
    </div>
  );
}