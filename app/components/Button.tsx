"use client";
import React, { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ArrowUpRight } from "lucide-react";

gsap.registerPlugin(useGSAP);

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: "primary" | "secondary";
  className?: string;
}

const Button = ({
  children,
  onClick,
  variant = "primary",
  className = "",
}: ButtonProps) => {
  const btnRef = useRef<HTMLButtonElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);
  const arrowRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!btnRef.current || !overlayRef.current) return;

      const btn = btnRef.current;
      const overlay = overlayRef.current;
      const label = labelRef.current;
      const arrow = arrowRef.current;

      // start overlay hidden below
      gsap.set(overlay, { yPercent: 100 });
      gsap.set(label, { x: 0 });
      gsap.set(arrow, { x: 6, opacity: 0 });

      const enter = () => {
        gsap.killTweensOf([overlay, label, arrow]);

        gsap.to(overlay, {
          yPercent: 0,
          duration: 0.3,
          delay: 0.04,
          ease: "power3.out",
        });

        gsap.to(label, {
          x: 0, // subtle movement left
          duration: 0.25,
          delay: 0.02,
          ease: "power3.out",
        });

        gsap.to(arrow, {
          x: 0,
          opacity: 1,
          duration: 0.25,
          delay: 0.06,
          ease: "power3.out",
        });
      };

      const leave = () => {
        gsap.killTweensOf([overlay, label, arrow]);

        gsap.to(overlay, {
          yPercent: 100,
          duration: 0.5,
          delay: 0.04,
          ease: "power3.inOut",
        });

        gsap.to(label, {
          x: 0,
          duration: 0.5,
          delay: 0.02,
          ease: "power3.inOut",
        });

        gsap.to(arrow, {
          x: 6,
          opacity: 0,
          duration: 0.5,
          ease: "power3.inOut",
        });
      };

      btn.addEventListener("mouseenter", enter);
      btn.addEventListener("mouseleave", leave);

      return () => {
        btn.removeEventListener("mouseenter", enter);
        btn.removeEventListener("mouseleave", leave);
      };
    },
    { scope: btnRef }
  );

  const variants = {
    primary: "bg-red-700 text-white",
    secondary: "bg-gray-900 text-white",
  };

  const overlayVariants = {
    primary: "bg-white text-black",
    secondary: "bg-white text-black",
  };

  return (
    <button
      ref={btnRef}
      onClick={onClick}
      className={`relative overflow-hidden px-16 py-2.5 cursor-pointer rounded-sm font-space-grotesk font-extrabold text-sm uppercase shadow-md backdrop-blur-md ${variants[variant]} ${className}`}
    >
      {/* underlying label */}
      <span className="relative z-10">{children}</span>

      {/* fill overlay */}
      <div
        ref={overlayRef}
        className={`absolute inset-0 flex items-center justify-between px-10 ${overlayVariants[variant]} z-20 pointer-events-none`}
        style={{ willChange: "transform" }}
      >
        <span ref={labelRef} className="whitespace-nowrap">
          {children}
        </span>

        {/* icon container */}
        <div
          ref={arrowRef}
          className="w-6 h-6 flex items-center justify-center bg-black text-white rounded-sm"
        >
          <ArrowUpRight size={14} strokeWidth={2.2} />
        </div>
      </div>
    </button>
  );
};

export default Button;
