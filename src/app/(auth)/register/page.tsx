import SignupLeftPanel from "@/components/modules/auth/register/SignupLeftPanel";
import SignupRightPanel from "@/components/modules/auth/register/SignupRightPanel";

export default function RegisterPage() {
  return (
    <div className="min-h-screen bg-foodhub-cream flex justify-center ">
      {/* Left panel — brand */}
      <SignupLeftPanel />

      {/* Right panel — form */}
      <SignupRightPanel />
      
    </div>
  );
}
