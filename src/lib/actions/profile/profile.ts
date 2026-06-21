"use server";

interface UpdateProfileInput {
  name: string;
  phone: string;
  bio: string;
  address: string;
  city: string;
  image: string;
}

interface UpdateRestaurantInput {
  restaurantName: string;
  tradeLicense: string;
  nidNumber: string;
  businessAddress: string;
}

function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function updateProviderProfile(data: UpdateProfileInput) {
  await delay(800);
  console.log("Mock save — profile:", data);
  return { success: true };
}

export async function updateRestaurantInfo(data: UpdateRestaurantInput) {
  await delay(800);
  console.log("Mock save — restaurant:", data);
  return { success: true };
}