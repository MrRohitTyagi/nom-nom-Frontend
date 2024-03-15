import { Variants } from "framer-motion";

export const headingVarient: Variants = {
  initial: { scale: 0, opacity: 0.2 },
  animate: {
    scale: 1,
    opacity: 1,
    transition: { duration: 0.5, type: "spring" },
  },
};
export const BannerImageVarient: Variants = {
  initial: { scale: 1.1 },
  animate: {
    scale: 1,
    transition: { duration: 0.5, type: "tween" },
  },
};
