"use client";

import { categories } from "@/data/navbar.data";
import { ArrowRight } from "lucide-react";
import { motion, Variants } from "motion/react";
import Link from "next/link";

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 24, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] as const },
  },
};

const headerVariants: Variants = {
  hidden: { opacity: 0, y: -16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" as const },
  },
};

export default function CategorySection() {
  return (
    <section className="w-full py-10 px-4 md:px-8 container mx-auto">
      {/* Header */}
      <motion.div
        className="flex items-center justify-between mb-6"
        variants={headerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.5 }}
      >
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
          Browse by Category
        </h2>
        <Link
          href="/categories"
          className="flex items-center gap-1 text-[#8B1A2B] font-medium text-sm hover:underline transition-all"
        >
          View all <ArrowRight className="w-4 h-4" />
        </Link>
      </motion.div>

      {/* Category Grid */}
      <motion.div
        className="grid grid-cols-3 sm:grid-cols-3 md:grid-cols-6 gap-3 md:gap-4"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        {categories.map((cat) => (
          <motion.div key={cat.id} variants={cardVariants}>
            <Link
              href={cat.href}
              className={`group flex flex-col items-center justify-center gap-3 p-4 md:p-5 rounded-2xl ${cat.bg} border border-transparent hover:border-[#8B1A2B]/20 hover:shadow-md transition-all duration-200 cursor-pointer`}
            >
              {/* Icon wrapper */}
              <motion.div
                className={`w-12 h-12 md:w-14 md:h-14 rounded-xl ${cat.iconBg} flex items-center justify-center text-2xl md:text-3xl`}
                whileHover={{ scale: 1.15, rotate: [0, -6, 6, 0] }}
                transition={{ duration: 0.35, ease: "easeInOut" }}
              >
                {cat.icon}
              </motion.div>
              {/* Label */}
              <span className="text-sm font-medium text-gray-700 group-hover:text-[#8B1A2B] transition-colors duration-200">
                {cat.name}
              </span>
            </Link>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}