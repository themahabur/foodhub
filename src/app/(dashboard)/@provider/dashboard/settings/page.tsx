
import { AccountStatusCard } from "@/components/modules/dashboard/provider/settings/account-status-card";
import { ChangePasswordCard } from "@/components/modules/dashboard/provider/settings/change-password-card";
import { DangerZoneCard } from "@/components/modules/dashboard/provider/settings/danger-zone-card";
import { GoogleAccountCard } from "@/components/modules/dashboard/provider/settings/google-account-card";
import { NotificationPreferencesCard } from "@/components/modules/dashboard/provider/settings/notification-preferences-card";
import { FadeUp, StaggerContainer } from "@/components/shared/motion/motion-wrapper";
import { getDemoUserSettings } from "@/data/settings/settings.data";

export default function SettingsPage() {
  const user = getDemoUserSettings();

  return (
    <div className="max-w-3xl space-y-8 pb-16">
      <FadeUp>
        <div>
          <h1 className="text-2xl font-semibold text-foodhub-maroon">Settings</h1>
          <p className="text-sm text-muted-foreground">
            Manage your account, security, and notification preferences.
          </p>
        </div>
      </FadeUp>

      <StaggerContainer className="space-y-6">
        <AccountStatusCard user={user} />
        <ChangePasswordCard />
        <GoogleAccountCard googleLinked={user.googleLinked} googleEmail={user.googleEmail} />
        <NotificationPreferencesCard initialPreferences={user.notificationPreferences} />
        <DangerZoneCard />
      </StaggerContainer>
    </div>
  );
}