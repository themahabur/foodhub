export interface Provider {
  id: string;
  userId: string;
  businessName: string;
  logo: string;
  banner: string;
  description: string;
  cuisineType: string[];
  deliveryTime: string;
  address: string;
  minOrder: number | null;
  rating: number | null;
  isOpen: boolean;
  tags: string[];
  isVerified: boolean;
  createdAt: string;
  updatedAt: string;
  user: User;
}

export interface User {
  id: string;
  name: string;
  email: string;
  emailVerified: boolean;
  image: string | null;
  createdAt: string;
  updatedAt: string;
  role: "CUSTOMER" | "PROVIDER" | "ADMIN";
  phone: string | null;
  address: string | null;
  status: "ACTIVE" | "INACTIVE" | "SUSPENDED";
  banned: boolean;
  banReason: string | null;
  banExpires: string | null;
}