import Link from "next/link";

const footerLinks = [
  { label: "About Us", href: "/about" },
  { label: "Careers", href: "/careers" },
  { label: "Terms", href: "/terms" },
  { label: "Privacy", href: "/privacy" },
];

export default function Footer() {
  return (
    <footer className="w-full border-t border-gray-100 bg-white">
      <div className="container mx-auto px-4 md:px-8 py-5 flex flex-col md:flex-row items-center justify-between gap-4">

        {/* Logo */}
        <Link href="/" className="flex items-center gap-1.5 shrink-0">
          <span className="text-xl">🍽️</span>
          <span className="font-bold text-gray-900 text-base">
            Food<span className="text-[#8B1A2B]">Hub</span>
          </span>
        </Link>

        {/* Nav links */}
        <nav className="flex items-center gap-6">
          {footerLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="text-sm text-gray-500 hover:text-[#8B1A2B] transition-colors duration-200"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Copyright */}
        <p className="text-xs text-gray-400 shrink-0">
          © {new Date().getFullYear()} FoodHub. All rights reserved.
        </p>

      </div>
    </footer>
  );
}