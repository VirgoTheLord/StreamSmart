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
        w-12 h-11
        rounded-md
        bg-[#0f0f0f]
        cursor-pointer
        [box-shadow:0_0_10px_-1px_#00000040]
        border border-black/50
        after:absolute after:content-[''] after:inset-0 after:border-[#2A2A2A]
       after:border-b-[3px] after:border-b-black/50
        hover:after:border-b-0 after:border-r-0 hover:after:border-t-black/50
        hover:after:[box-shadow:0_5px_15px_0_#00000070_inset]
        after:rounded-md overflow-hidden
        transition-transform hover:translate-y-1
        relative
        ${className}
      `}
      aria-label="Notifications"
    >
      {/* base bell (faint) */}
      <span className="relative inline-flex z-10">
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
