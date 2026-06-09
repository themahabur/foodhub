"use client";

import { motion, Variants } from "motion/react";

// ── Types ──────────────────────────────────────────────
type MotionDivProps = {
  children: React.ReactNode;
  className?: string;
  delay?: number;
};

// ── Reusable Variants ──────────────────────────────────
const fadeUpVariant = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, delay, ease: "easeOut" as const },
});

const fadeDownVariant = (delay = 0) => ({
  initial: { opacity: 0, y: -16 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5, delay, ease: "easeOut" as const },
});

const fadeInVariant = (delay = 0) => ({
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  transition: { duration: 0.5, delay, ease: "easeOut" as const },
});

const staggerContainerVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

const staggerItemVariants: Variants = {
  hidden: { opacity: 0, y: 24, scale: 0.95 },
  visible: {
    opacity: 1, y: 0, scale: 1,
    transition: { duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] as const },
  },
};

// ── Wrappers ───────────────────────────────────────────

/** উপর থেকে নিচে fade-in (badge, header) */
export function FadeDown({ children, className, delay = 0 }: MotionDivProps) {
  return (
    <motion.div className={className} {...fadeDownVariant(delay)}>
      {children}
    </motion.div>
  );
}

/** নিচ থেকে উপরে fade-in (paragraph, button, card) */
export function FadeUp({ children, className, delay = 0 }: MotionDivProps) {
  return (
    <motion.div className={className} {...fadeUpVariant(delay)}>
      {children}
    </motion.div>
  );
}

/** শুধু opacity fade (image, overlay) */
export function FadeIn({ children, className, delay = 0 }: MotionDivProps) {
  return (
    <motion.div className={className} {...fadeInVariant(delay)}>
      {children}
    </motion.div>
  );
}

/** scroll-এ trigger হয়, একবারই (section header) */
export function FadeUpOnScroll({ children, className, delay = 0 }: MotionDivProps) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 0.5, delay, ease: "easeOut" as const }}
    >
      {children}
    </motion.div>
  );
}

/** stagger grid container */
export function StaggerContainer({ children, className }: Omit<MotionDivProps, "delay">) {
  return (
    <motion.div
      className={className}
      variants={staggerContainerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
    >
      {children}
    </motion.div>
  );
}

/** stagger-এর ভেতরের প্রতিটা item */
export function StaggerItem({ children, className }: Omit<MotionDivProps, "delay">) {
  return (
    <motion.div className={className} variants={staggerItemVariants}>
      {children}
    </motion.div>
  );
}

/** hover-এ icon wiggle + scale */
export function WiggleOnHover({ children, className }: Omit<MotionDivProps, "delay">) {
  return (
    <motion.div
      className={className}
      whileHover={{ scale: 1.15, rotate: [0, -6, 6, 0] }}
      transition={{ duration: 0.35, ease: "easeInOut" as const }}
    >
      {children}
    </motion.div>
  );
}

/** float up-down animation (hero food images) */
export function FloatUpDown({
  children,
  className,
  delay = 0,
}: MotionDivProps) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1, y: [0, -12, 0] }}
      transition={{
        opacity: { duration: 0.5, delay },
        scale: { duration: 0.5, delay },
        y: { duration: 5, repeat: Infinity, ease: "easeInOut" as const, delay },
      }}
    >
      {children}
    </motion.div>
  );
}