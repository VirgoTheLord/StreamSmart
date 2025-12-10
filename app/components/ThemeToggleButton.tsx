"use client";

import React, { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { Sun, Moon } from "lucide-react";

gsap.registerPlugin(useGSAP);

interface ThemeToggleButtonProps {
  className?: string;
  onClick?: () => void;
  isDark?: boolean; // optional externally controlled theme state
}

const ThemeToggleButton = ({
  className = "",
  onClick,
  isDark = false,
}: ThemeToggleButtonProps) => {
  const btnRef = useRef<HTMLButtonElement | null>(null);
  const fillRef = useRef<HTMLSpanElement | null>(null);

  useGSAP(() => {
    if (!btnRef.current || !fillRef.current) return;

    const btn = btnRef.current;
    const fill = fillRef.current;

    gsap.set(fill, {
      scaleX: 0,
      scaleY: 0,
      transformOrigin: "100% 0%",
    });

    const enter = () => {
      gsap.killTweensOf(fill);
      gsap.to(fill, {
        scaleX: 1,
        scaleY: 1,
        duration: 0.35,
        ease: "power3.out",
      });
    };

    const leave = () => {
      gsap.killTweensOf(fill);
      gsap.to(fill, {
        scaleX: 0,
        scaleY: 0,
        duration: 0.6,
        ease: "power3.inOut",
      });
    };

    btn.addEventListener("mouseenter", enter);
    btn.addEventListener("mouseleave", leave);

    return () => {
      btn.removeEventListener("mouseenter", enter);
      btn.removeEventListener("mouseleave", leave);
    };
  }, []);

  return (
    <button
      ref={btnRef}
      type="button"
      onClick={onClick}
      aria-label="Toggle theme"
      className={`
        flex items-center justify-center
        w-19 h-15
        rounded-md
        bg-black
        cursor-pointer
        ${className}
      `}
    >
      {/* Base Icon (faded) */}
      <span className="relative inline-flex">
        {isDark ? (
          <Moon className="w-8 h-8 text-white/50" />
        ) : (
          <Sun className="w-8 h-8 text-white/50" />
        )}

        {/* Filled reveal icon */}
        <span ref={fillRef} className="absolute inset-0 inline-flex">
          {isDark ? (
            <Moon className="w-8 h-8 text-white" />
          ) : (
            <Sun className="w-8 h-8 text-white" />
          )}
        </span>
      </span>
    </button>
  );
};

export default ThemeToggleButton;
