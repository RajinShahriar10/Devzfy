"use client";

import { useEffect } from "react";
import { motion, useMotionValue, useTransform, animate } from "framer-motion";

export function AnimatedCounter({ from = 0, to, suffix = "" }: { from?: number; to: number; suffix?: string }) {
  const count = useMotionValue(from);
  const rounded = useTransform(() => Math.round(count.get()));

  useEffect(() => {
    const controls = animate(count, to, { duration: 2, ease: "easeOut" });
    return controls.stop;
  }, [to, count]);

  return (
    <motion.span>
      {rounded}
      {suffix}
    </motion.span>
  );
}
