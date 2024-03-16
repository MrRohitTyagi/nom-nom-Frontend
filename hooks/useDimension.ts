"use client";

import { useEffect, useState } from "react";

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
  const isMobileView: boolean = width <= 768;
  return { isMobileView };
};

export default useDimension;
