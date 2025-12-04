"use client";
import React, { useState, useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

const Navbar = () => {
  const [active, setActive] = useState("trending");
  const sliderRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const navItems = [
    { id: "trending", label: "Trending" },
    { id: "popular", label: "Popular" },
    { id: "toprated", label: "Top Rated" },
    { id: "upcoming", label: "Upcoming" },
  ];

  const activeIndex = navItems.findIndex((item) => item.id === active);

  useGSAP(
    () => {
      if (sliderRef.current) {
        const offsetPerItem = 25;
        const position = activeIndex * offsetPerItem + 0.125;

        gsap.to(sliderRef.current, {
          left: `calc(${position}% + ${activeIndex * 0.005}rem)`,
          duration: 0.6,
          ease: "power3.inOut",
        });
      }
    },
    { dependencies: [activeIndex], scope: containerRef }
  );

  return (
    <nav className="w-[1050px]">
      <div
        ref={containerRef}
        className="relative bg-white bg-opacity-90 backdrop-blur-md rounded-sm p-0.5 shadow-md flex"
      >
        <div
          ref={sliderRef}
          className="absolute top-0.5 bottom-0.5 left-0.5 bg-black rounded-sm pointer-events-none"
          style={{
            width: "calc(25% - 0.25rem)",
          }}
        />

        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActive(item.id)}
            className={`relative z-10 flex-1 py-2 px-6 rounded-sm font-space-grotesk font-extrabold text-sm transition-colors duration-300 uppercase ${
              active === item.id
                ? "text-white"
                : "text-black hover:text-gray-600"
            }`}
          >
            {item.label}
          </button>
        ))}
      </div>
    </nav>
  );
};

export default Navbar;
