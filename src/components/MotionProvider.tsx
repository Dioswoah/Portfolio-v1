"use client";

import { MotionConfig } from "framer-motion";

// Respects prefers-reduced-motion for real visitors.
export function MotionProvider({ children }: { children: React.ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
