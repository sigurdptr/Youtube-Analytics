"use client";

import clsx from "clsx";
import { useEffect, useRef, useState } from "react";

interface FadeInProps {
  children: React.ReactNode;
  threshold?: number;
  duration?: number;
}

export default function FadeIn({ children, threshold = 0.1, duration = 0 }: FadeInProps) {
  const [isVisible, setIsVisible] = useState(false);
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            setIsVisible(true);
          }, duration);
        }
      },
      {threshold: threshold}
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => {
      if (elementRef.current) {
        observer.unobserve(elementRef.current);
      }
    };
  }, [duration]);

  return (
    <div
      ref={elementRef}
      className={clsx(
        "transition-all duration-700 ease-out",
        (isVisible)
          ? "opacity-100 translate-y-0"
          : "opacity-0 translate-y-8"
      )}
    >
      {children}
    </div>
  );
}