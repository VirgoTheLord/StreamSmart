"use client";

import React, { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { Bell } from "lucide-react";

gsap.registerPlugin(useGSAP);

interface NotificationsButtonProps {
  className?: string;
  onClick?: () => void;
}

const NotificationsButton = ({
  className = "",
  onClick,
}: NotificationsButtonProps) => {
  const btnRef = useRef<HTMLButtonElement | null>(null);
  const fillRef = useRef<HTMLSpanElement | null>(null);

  useGSAP(() => {
    if (!btnRef.current || !fillRef.current) return;

    const btn = btnRef.current;
    const fill = fillRef.current;

    // start with filled bell "hidden" via scale from top-left (diagonal reveal)
    gsap.set(fill, {
      scaleX: 0,
      scaleY: 0,
      transformOrigin: "0% 0%", // top-left corner
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
      className={`
        flex items-center justify-center
        w-12 h-10
        rounded-md
        bg-black
        cursor-pointer
        ${className}
      `}
      aria-label="Notifications"
    >
      {/* base bell (faint) */}
      <span className="relative inline-flex">
        <Bell className="w-6 h-6 text-white/50" />

        {/* filled bell that reveals diagonally */}
        <span ref={fillRef} className="absolute inset-0 inline-flex">
          <Bell className="w-6 h-6 text-white" />
        </span>
      </span>
    </button>
  );
};

export default NotificationsButton;
