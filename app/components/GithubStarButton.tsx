"use client";

import React, { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { Github } from "lucide-react";

gsap.registerPlugin(useGSAP);

interface GithubStarButtonProps {
  className?: string;
  onClick?: () => void;
}

const GithubStarButton = ({
  className = "",
  onClick,
}: GithubStarButtonProps) => {
  const btnRef = useRef<HTMLButtonElement | null>(null);
  const fillRef = useRef<HTMLDivElement | null>(null);

  useGSAP(() => {
    if (!btnRef.current || !fillRef.current) return;

    const btn = btnRef.current;
    const fill = fillRef.current;

    // hide fill (diagonal) initially
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
        duration: 0.4,
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
      onClick={onClick}
      type="button"
      className={`
        overflow-hidden
        flex items-center gap-2 
        rounded-md px-9 py-5 
        bg-black cursor-pointer select-none
        group
        ${className}
      `}
    >
      {/* diagonal fill bg */}
      <div ref={fillRef} className="absolute inset-0 rounded-md bg-white z-0" />

      {/* content (single layer) */}
      <div className="relative z-10 inline-flex items-center gap-2">
        <Github
          size={24}
          className="transition-colors duration-200 text-white group-hover:text-black"
        />
        <span className="font-space-grotesk text-sm font-semibold transition-colors duration-200 uppercase text-white group-hover:text-black">
          Star us
        </span>
      </div>
    </button>
  );
};

export default GithubStarButton;
