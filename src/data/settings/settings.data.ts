export type AccountStatus = "ACTIVE" | "SUSPENDED" | "PENDING_VERIFICATION";

export interface NotificationPreferences {
  orderUpdates: boolean;
  promotions: boolean;
  newsletter: boolean;
  smsAlerts: boolean;
}

export interface UserSettings {
  id: string;
  name: string;
  email: string;
  role: "CUSTOMER" | "PROVIDER" | "ADMIN";
  avatarUrl: string;
  joinedAt: string;
  accountStatus: AccountStatus;
  emailVerified: boolean;
  googleLinked: boolean;
  googleEmail: string | null;
  notificationPreferences: NotificationPreferences;
}

export function getDemoUserSettings(): UserSettings {
  return {
    id: "usr_8f23a1",
    name: "Tania Akter",
    email: "tania.akter@example.com",
    role: "PROVIDER",
    avatarUrl: "https://i.pravatar.cc/150?img=47",
    joinedAt: "2025-03-14T00:00:00.000Z",
    accountStatus: "ACTIVE",
    emailVerified: true,
    googleLinked: true,
    googleEmail: "tania.akter@gmail.com",
    notificationPreferences: {
      orderUpdates: true,
      promotions: false,
      newsletter: true,
      smsAlerts: false,
    },
  };
}