
"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle2, Loader2 } from "lucide-react";
import { toast } from "sonner";

interface GoogleAccountCardProps {
  googleLinked: boolean;
  googleEmail: string | null;
}

export function GoogleAccountCard({ googleLinked, googleEmail }: GoogleAccountCardProps) {
  const [linked, setLinked] = useState(googleLinked);
  const [email, setEmail] = useState(googleEmail);
  const [loading, setLoading] = useState(false);

  async function handleToggle() {
    setLoading(true);
    await new Promise((r) => setTimeout(r, 700)); // demo only — swap for Better Auth Google link/unlink
    setLoading(false);

    if (linked) {
      setLinked(false);
      setEmail(null);
      toast.success("Google account disconnected.");
    } else {
      setLinked(true);
      setEmail("tania.akter@gmail.com");
      toast.success("Google account connected.");
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">Google Account</CardTitle>
        <CardDescription>Sign in faster by linking your Google account.</CardDescription>
      </CardHeader>
      <CardContent className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <svg viewBox="0 0 24 24" className="h-6 w-6 shrink-0">
            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.27-4.74 3.27-8.1z" />
            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.99.67-2.26 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84A11 11 0 0 0 12 23z" />
            <path fill="#FBBC05" d="M5.84 14.1A6.6 6.6 0 0 1 5.5 12c0-.73.13-1.44.34-2.1V7.06H2.18A11 11 0 0 0 1 12c0 1.77.43 3.45 1.18 4.94z" />
            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15A10.96 10.96 0 0 0 12 1a11 11 0 0 0-9.82 6.06l3.66 2.84C6.71 7.31 9.14 5.38 12 5.38z" />
          </svg>
          <div>
            {linked ? (
              <>
                <p className="flex items-center gap-1.5 text-sm font-medium">
                  <CheckCircle2 className="h-4 w-4 text-green-600" />
                  Connected
                </p>
                <p className="text-sm text-muted-foreground">{email}</p>
              </>
            ) : (
              <p className="text-sm text-muted-foreground">Not connected</p>
            )}
          </div>
        </div>
        <Button
          variant={linked ? "outline" : "default"}
          className={!linked ? "bg-foodhub-maroon hover:bg-foodhub-maroon/90" : ""}
          onClick={handleToggle}
          disabled={loading}
        >
          {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          {linked ? "Disconnect" : "Connect"}
        </Button>
      </CardContent>
    </Card>
  );
}