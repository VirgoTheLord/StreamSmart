"use client";

import React, { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

interface PlayButtonProps {
  className?: string;
  onClick?: () => void;
}

const PlayButton = ({ className = "", onClick }: PlayButtonProps) => {
  const btnRef = useRef<HTMLButtonElement | null>(null);
  const fillRef = useRef<SVGGElement | null>(null);

  useGSAP(() => {
    if (!btnRef.current || !fillRef.current) return;

    const btn = btnRef.current;
    const fill = fillRef.current;

    // start with fill "hidden" by scaling from the top-left (diagonal reveal)
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
        duration: 0.25,
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
      className={`[box-shadow:0_0_5px_-1px_#00000040] border border-black/50 after:absolute after:content-[''] after:inset-0 after:border-[#2A2A2A] bg-[#202020] flex items-center justify-center after:border-b-[3px] after:border-b-black/50 hover:after:border-b-0 after:border-r-0 hover:after:border-t-black/50 hover:after:[box-shadow:0_5px_15px_0_#00000070_inset] rounded-br-4xl rounded-lg overflow-hidden after:rounded-br-4xl after:rounded-lg w-25 h-19 transition-transform hover:translate-y-1 cursor-pointer ${className}`}
    >
      <svg
        className="w-12 h-12 text-white relative z-10 pointer-events-none"
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        {/* base outline */}
        <path
          d="M8 5v14l11-7z"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinejoin="round"
        />

        {/* filled version that reveals diagonally */}
        <g ref={fillRef} style={{ willChange: "transform" }}>
          <path d="M8 5v14l11-7z" fill="currentColor" />
        </g>
      </svg>
    </button>
  );
};

export default PlayButton;
