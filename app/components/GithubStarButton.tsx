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


  return (
    <button
      ref={btnRef}
      onClick={onClick}
      type="button"
      className={`
        relative isolate overflow-hidden
        flex items-center gap-2 
        rounded-sm px-9 py-3 
        bg-[#0f0f0f] cursor-pointer select-none
        group
        [box-shadow:0_0_10px_-1px_#00000040]
        border border-black/50
        after:absolute after:content-[''] after:inset-0 after:border-[#2A2A2A]
        after:border-b-[3px] after:border-b-black/50
        hover:after:border-b-0 after:border-r-0 hover:after:border-t-black/50
        hover:after:[box-shadow:0_5px_15px_0_#00000070_inset]
        after:rounded-sm
        transition-transform hover:translate-y-1
        ${className}
      `}
    >
      {/* diagonal fill bg */}
      <div
        ref={fillRef}
        className="absolute inset-0 rounded-sm bg-0f0f0f z-0 pointer-events-none"
      />

      {/* content (single layer) */}
      <div className="relative z-20 inline-flex items-center gap-2">
        <Github
          size={22}
          className="transition-colors duration-200 text-white group-hover:text-white"
        />
        <span className="font-space-grotesk text-sm font-semibold transition-colors duration-200 uppercase text-white group-hover:text-white">
          Star us
        </span>
      </div>
    </button>
  );
};

export default GithubStarButton;
