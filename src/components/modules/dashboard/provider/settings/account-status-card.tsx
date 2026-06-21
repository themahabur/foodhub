import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ShieldCheck, ShieldAlert, Clock } from "lucide-react";
import { UserSettings } from "@/data/settings/settings.data";


const statusConfig = {
  ACTIVE: { label: "Active", icon: ShieldCheck, className: "bg-green-100 text-green-700 border-green-200" },
  SUSPENDED: { label: "Suspended", icon: ShieldAlert, className: "bg-red-100 text-red-700 border-red-200" },
  PENDING_VERIFICATION: { label: "Pending Verification", icon: Clock, className: "bg-yellow-100 text-yellow-700 border-yellow-200" },
} as const;

export function AccountStatusCard({ user }: { user: UserSettings }) {
  const status = statusConfig[user.accountStatus];
  const StatusIcon = status.icon;
  const joined = new Date(user.joinedAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">Account Overview</CardTitle>
      </CardHeader>
      <CardContent className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <Avatar className="h-14 w-14">
            <AvatarImage src={user.avatarUrl} alt={user.name} />
            <AvatarFallback>{user.name.slice(0, 2).toUpperCase()}</AvatarFallback>
          </Avatar>
          <div>
            <p className="font-medium">{user.name}</p>
            <p className="text-sm text-muted-foreground">{user.email}</p>
            <p className="text-xs text-muted-foreground">Joined {joined}</p>
          </div>
        </div>
        <Badge variant="outline" className={`gap-1 ${status.className}`}>
          <StatusIcon className="h-3.5 w-3.5" />
          {status.label}
        </Badge>
      </CardContent>
    </Card>
  );
}