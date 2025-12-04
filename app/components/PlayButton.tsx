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
      className={`w-25 h-19 bg-black rounded-br-4xl rounded-lg flex justify-center items-center cursor-pointer ${className}`}
    >
      <svg
        className="w-12 h-12 text-white"
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
        <g ref={fillRef}>
          <path d="M8 5v14l11-7z" fill="currentColor" />
        </g>
      </svg>
    </button>
  );
};

export default PlayButton;
