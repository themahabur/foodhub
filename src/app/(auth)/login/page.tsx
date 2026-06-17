import LoginLeftPanel from "@/components/modules/auth/login/LoginLeftPanel";
import LoginRightPanel from "@/components/modules/auth/login/LoginRightPanel";

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-foodhub-cream flex">
      {/* Left panel — brand */}
      <LoginLeftPanel />

      {/* Right panel — form */}
      <LoginRightPanel />
    </div>
  );
}
