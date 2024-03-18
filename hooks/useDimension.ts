"use client";

import { useEffect, useMemo, useState } from "react";

export type breakpointType = "sm" | "md" | "lg" | "xl" | "2xl" | undefined;
export type dimesionType = {
  breakpoint: breakpointType;
  sm: boolean;
  md: boolean;
  lg: boolean;
  xl: boolean;
  x2l: boolean;
};
function getBreakpoint(width: number) {
  switch (true) {
    case width <= 640:
      return "sm";
    case width > 640 && width <= 768:
      return "md";
    case width > 768 && width <= 1024:
      return "lg";
    case width > 1024 && width <= 1280:
      return "xl";
    case width > 1280:
      return "2xl";
    default:
      break;
  }
}

const useDimension = () => {
  const [width, setwidth] = useState<number>(window.innerWidth);

  useEffect(() => {
    let id: NodeJS.Timeout;

    function handleResize() {
      clearTimeout(id);
      id = setTimeout(() => {
        setwidth(window.innerWidth);
      }, 300);
    }

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const { breakpoint, sm, md, lg, xl, x2l }: dimesionType = useMemo(() => {
    const obj = {} as dimesionType;
    const breakpoint = getBreakpoint(width);
    obj.breakpoint = breakpoint;
    obj.sm = breakpoint === "sm";
    obj.md = breakpoint === "md";
    obj.lg = breakpoint === "lg";
    obj.xl = breakpoint === "xl";
    obj.x2l = breakpoint === "2xl";
    return obj;
  }, [width]);

  return { breakpoint, sm, md, lg, xl, x2l };
};

export default useDimension;
