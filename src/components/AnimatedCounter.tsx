"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, animate } from "framer-motion";

export function AnimatedCounter({ from = 0, to, suffix = "" }: { from?: number; to: number; suffix?: string }) {
  const count = useMotionValue(from);
  const [display, setDisplay] = useState(from);

  useEffect(() => {
    const unsubscribe = count.on("change", (v) => setDisplay(Math.round(v)));
    const controls = animate(count, to, { duration: 2, ease: "easeOut" });
    return () => {
      unsubscribe();
      controls.stop();
    };
  }, [to, count]);

  return (
    <motion.span>
      {display}{suffix}
    </motion.span>
  );
}
