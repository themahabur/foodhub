import React from "react";

const LoginLeftPanel = () => {
  return (
    <div className="hidden lg:flex flex-col justify-between w-[42%] bg-foodhub-maroon relative overflow-hidden px-14 py-12">
      {/* Decorative circles */}
      <div className="absolute -top-20 -right-20 w-80 h-80 rounded-full bg-white/5 pointer-events-none" />
      <div className="absolute top-1/2 -right-32 w-96 h-96 rounded-full bg-white/5 pointer-events-none" />
      <div className="absolute -bottom-20 left-10 w-64 h-64 rounded-full bg-black/10 pointer-events-none" />

      {/* Top badge */}
      <div className="relative z-10">
        <span className="inline-flex items-center gap-2 bg-white/10 text-white text-xs font-semibold px-3 py-1.5 rounded-full">
          🇧🇩 Made for Bangladesh
        </span>
      </div>

      {/* Center copy */}
      <div className="relative z-10 space-y-6">
        <div className="space-y-4">
          <p className="text-foodhub-yellow text-sm font-semibold uppercase tracking-widest">
            Your hunger, handled
          </p>
          <h2 className="text-white text-5xl font-black leading-[1.05]">
            Dhaka’s best
            <br />
            food, at your
            <br />
            door.
          </h2>
          <p className="text-white/60 text-sm leading-relaxed max-w-xs">
            From biryani to burgers — order from hundreds of local restaurants
            and get it fresh, fast.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 pt-2">
          {[
            { value: "500+", label: "Restaurants" },
            { value: "30min", label: "Avg delivery" },
            { value: "4.8★", label: "User rating" },
          ].map((s) => (
            <div
              key={s.label}
              className="bg-white/10 rounded-2xl p-4 text-center"
            >
              <p className="text-white text-lg font-black">{s.value}</p>
              <p className="text-white/50 text-xs mt-0.5">{s.label}</p>
            </div>
          ))}
        </div>
      </div>

      <p className="relative z-10 text-white/25 text-xs">
        © 2026 FoodHub Bangladesh
      </p>
    </div>
  );
};

export default LoginLeftPanel;
