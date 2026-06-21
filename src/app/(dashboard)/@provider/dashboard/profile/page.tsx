import { ProfileForm } from "@/components/modules/dashboard/provider/profile/profile-form";

// Mock data — replace with real session + Prisma fetch later
const mockUser = {
  name: "Mahabur Rahman",
  email: "mahabur@foodhub.com",
  phone: "01712345678",
  bio: "Running a small biryani shop in Rajshahi since 2022.",
  address: "House 12, Road 4, Shaheb Bazar",
  city: "Rajshahi",
  image: "",
};

const mockProvider = {
  restaurantName: "Rajshahi Biryani House",
  tradeLicense: "TRAD/048291/2023",
  nidNumber: "1995XXXXXXXXX",
  businessAddress: "Shop 7, Shaheb Bazar Road, Rajshahi",
};

export default function ProfilePage() {
  return (
    <div className="mx-auto max-w-3xl space-y-8 p-4 md:p-8">
      <div>
        <h1 className="text-2xl font-bold">Profile Settings</h1>
        <p className="text-sm text-muted-foreground">
          Manage your personal and restaurant information
        </p>
      </div>

      <ProfileForm user={mockUser} provider={mockProvider} />
    </div>
  );
}