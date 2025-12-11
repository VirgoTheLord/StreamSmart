import React from "react";

type Props = {
  src: string; // path to image in public (e.g. /bg.jpg) or remote
  alt?: string;
  className?: string;
  tint?: string; // overlay tint color
  svgMaskPath?: string; // path to the SVG used as mask (default: \/Card.svg)
};

// SVGMaskedCard (full-page variant)
// - Uses CSS mask / -webkit-mask to clip a background image to the exact shape of an SVG.
// - Glass/frost effect removed (per your request).
// - Defaults to a full-viewport presentation (h-screen, w-full) but will respect any className you pass.

export default function SVGMaskedCard({
  src,
  alt = "",
  className = "",
  tint = "rgba(0,0,0,0.14)",
  svgMaskPath = "\/Card.svg",
}: Props) {
  // CSS mask styles. We keep mask-size 100% 100% so the SVG covers the element bounds.
  const maskStyle: React.CSSProperties = {
    WebkitMaskImage: `url(${svgMaskPath})`,
    maskImage: `url(${svgMaskPath})`,
    WebkitMaskRepeat: "no-repeat",
    maskRepeat: "no-repeat",
    WebkitMaskSize: "100% 100%",
    maskSize: "100% 100%",
    backgroundColor: "transparent",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
  };

  return (
    <div className={`relative w-full h-screen overflow-hidden ${className}`}>
      {/* masked background image */}
      <div
        className="absolute inset-0"
        style={{
          ...maskStyle,
          backgroundImage: `url(${src})`,
        }}
        role="img"
        aria-label={alt}
      />

      {/* sr-only fallback image for accessibility */}
      <img src={src} alt={alt} className="sr-only" />

      {/* optional tint overlay (keeps same mask so tint follows shape) */}
      {tint && (
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: tint,
            WebkitMaskImage: `url(${svgMaskPath})`,
            maskImage: `url(${svgMaskPath})`,
            WebkitMaskRepeat: "no-repeat",
            maskRepeat: "no-repeat",
            WebkitMaskSize: "100% 100%",
            maskSize: "100% 100%",
          }}
        />
      )}
    </div>
  );
}

/* USAGE NOTES
1) Put `edge.svg` and `bg.jpg` in your `public/` folder so they are available at `\/Card.svg` and `/bg.jpg`.
2) You're using this as a single full-page component — the component defaults to `h-screen w-full`, so drop it directly in a page.
3) If you prefer to size it using Tailwind props from the parent, pass `className` (e.g. `className="h-[80vh]"`).
4) Browser support: modern Chromium & Safari support CSS mask. If you need older-browser fallback, I can convert this to an inline SVG <clipPath> approach.
*/
