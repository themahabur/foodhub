import { Check } from "lucide-react";

const SignupLeftPanel = () => {
  return (
    <div className="hidden lg:flex flex-col justify-between w-[42%] bg-foodhub-maroon relative overflow-hidden px-14 py-12">
      <div className="absolute -top-20 -right-20 w-80 h-80 rounded-full bg-white/5 pointer-events-none" />
      <div className="absolute top-1/2 -right-32 w-96 h-96 rounded-full bg-white/5 pointer-events-none" />
      <div className="absolute -bottom-20 left-10 w-64 h-64 rounded-full bg-black/10 pointer-events-none" />

      <div className="relative z-10">
        <span className="inline-flex items-center gap-2 bg-white/10 text-white text-xs font-semibold px-3 py-1.5 rounded-full">
          🇧🇩 Made for Bangladesh
        </span>
      </div>

      <div className="relative z-10 space-y-6">
        <div className="space-y-4">
          <p className="text-foodhub-yellow text-sm font-semibold uppercase tracking-widest">
            Join thousands of food lovers
          </p>
          <h2 className="text-white text-5xl font-black leading-[1.05]">
            Everything
            <br />
            tasty, one
            <br />
            account.
          </h2>
        </div>

        <ul className="space-y-4 pt-2">
          {[
            "Track your orders in real time",
            "Save favourite restaurants",
            "Exclusive deals & early access",
            "Fast re-order from history",
          ].map((perk) => (
            <li key={perk} className="flex items-center gap-3">
              <div className="w-6 h-6 rounded-full bg-foodhub-yellow/20 flex items-center justify-center shrink-0">
                <Check size={13} className="text-foodhub-yellow" />
              </div>
              <span className="text-white/70 text-sm">{perk}</span>
            </li>
          ))}
        </ul>
      </div>

      <p className="relative z-10 text-white/25 text-xs">
        © 2026 FoodHub Bangladesh
      </p>
    </div>
  );
};

export default SignupLeftPanel;
