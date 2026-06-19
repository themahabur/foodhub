export interface Provider {
  id: string;
  userId: string;
  businessName: string;
  logo: string;
  address: string;
  city: string;
  phone: string;
  isVerified: boolean;
  isOpen: boolean;
  rating: number;
  totalOrders: number;
  createdAt: string;
  updatedAt: string;
}