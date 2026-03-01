import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import headphonesImg from "@/assets/products/headphones.jpg";

/**
 * DoorAnimation - Full-screen GSAP cinematic door opening
 * The door fills the entire viewport so the user feels like they're entering it.
 */
interface DoorAnimationProps {
  onComplete: () => void;
}

const DoorAnimation = ({ onComplete }: DoorAnimationProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const loadingBarRef = useRef<HTMLDivElement>(null);
  const loadingWrapRef = useRef<HTMLDivElement>(null);
  const doorLeftRef = useRef<HTMLDivElement>(null);
  const doorRightRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const productRef = useRef<HTMLDivElement>(null);
  const eyesRef = useRef<HTMLDivElement>(null);
  const doorFrameRef = useRef<HTMLDivElement>(null);
  const [loadingDone, setLoadingDone] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline();

      // Phase 1: Loading bar
      tl.to(loadingBarRef.current, {
        width: "100%",
        duration: 1.5,
        ease: "power2.inOut",
      });

      // Fade out loading bar
      tl.to(loadingWrapRef.current, {
        opacity: 0,
        duration: 0.4,
        onComplete: () => setLoadingDone(true),
      });

      // Phase 2: Door fades in (already full screen)
      tl.fromTo(
        doorFrameRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.8, ease: "power3.out" },
        "+=0.1"
      );

      // Subtle breathing/floating on the eyes
      tl.to(eyesRef.current, {
        y: -5,
        duration: 1.2,
        ease: "sine.inOut",
        yoyo: true,
        repeat: 1,
      });

      // Phase 3: Doors swing open — full-screen panels reveal the glow
      tl.to(doorLeftRef.current, {
        rotateY: -95,
        duration: 2,
        ease: "power3.inOut",
      }, "doorOpen");

      tl.to(doorRightRef.current, {
        rotateY: 95,
        duration: 2,
        ease: "power3.inOut",
      }, "doorOpen");

      // Eyes fade as doors open
      tl.to(eyesRef.current, {
        opacity: 0,
        duration: 0.4,
      }, "doorOpen");

      // Green glow fills screen
      tl.fromTo(
        glowRef.current,
        { opacity: 0, scale: 0.5 },
        { opacity: 1, scale: 3, duration: 1.8, ease: "power2.out" },
        "doorOpen+=0.4"
      );

      // Product emerges
      tl.fromTo(
        productRef.current,
        { opacity: 0, scale: 0.6, y: 60 },
        { opacity: 1, scale: 1, y: 0, duration: 1.2, ease: "back.out(1.4)" },
        "doorOpen+=0.8"
      );

      // Phase 4: Everything fades, reveal site
      tl.to(containerRef.current, {
        opacity: 0,
        duration: 0.8,
        ease: "power2.inOut",
        delay: 1,
        onComplete,
      });
    }, containerRef);

    return () => ctx.revert();
  }, [onComplete]);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-50 flex items-center justify-center bg-background overflow-hidden"
    >
      {/* Loading Bar */}
      <div ref={loadingWrapRef} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 z-20">
        <div className="h-1 w-full rounded-full bg-muted overflow-hidden">
          <div ref={loadingBarRef} className="h-full w-0 rounded-full bg-primary-dark" />
        </div>
        <p className="mt-3 text-center text-sm text-muted-foreground font-body tracking-wide">
          Loading experience...
        </p>
      </div>

      {/* Green Glow (behind door, fills screen) */}
      <div
        ref={glowRef}
        className="absolute w-[100vw] h-[100vh] rounded-full opacity-0 pointer-events-none"
        style={{
          background: "radial-gradient(circle, hsl(120 60% 80% / 0.7), hsl(120 50% 72% / 0.3), transparent 70%)",
        }}
      />

      {/* Full-screen Door Frame */}
      <div
        ref={doorFrameRef}
        className="absolute inset-0 opacity-0"
        style={{ perspective: "1500px" }}
      >
        {/* Door surface with seam down the center */}
        <div className="absolute inset-0" style={{ transformStyle: "preserve-3d" }}>

          {/* Eyes — centered on the door */}
          <div ref={eyesRef} className="absolute top-[32%] left-0 right-0 flex justify-center gap-16 md:gap-24 z-10">
            <div className="w-8 h-12 md:w-10 md:h-16 rounded-full bg-primary-dark/80 flex items-center justify-center animate-blink">
              <div className="w-3 h-3 md:w-4 md:h-4 rounded-full bg-background" />
            </div>
            <div
              className="w-8 h-12 md:w-10 md:h-16 rounded-full bg-primary-dark/80 flex items-center justify-center animate-blink"
              style={{ animationDelay: "0.15s" }}
            >
              <div className="w-3 h-3 md:w-4 md:h-4 rounded-full bg-background" />
            </div>
          </div>

          {/* Left Door Panel — full left half of screen */}
          <div
            ref={doorLeftRef}
            className="absolute left-0 top-0 w-1/2 h-full bg-secondary border-r border-border"
            style={{ transformOrigin: "left center", backfaceVisibility: "hidden" }}
          >
            {/* Handle */}
            <div className="absolute right-6 md:right-10 top-1/2 -translate-y-1/2 w-2 h-16 md:h-24 rounded-full bg-primary-dark/30" />
            {/* Panel inset detail */}
            <div className="absolute inset-6 md:inset-12 border border-primary/10 rounded-2xl" />
            <div className="absolute inset-10 md:inset-20 border border-primary/5 rounded-xl" />
          </div>

          {/* Right Door Panel — full right half of screen */}
          <div
            ref={doorRightRef}
            className="absolute right-0 top-0 w-1/2 h-full bg-secondary border-l border-border"
            style={{ transformOrigin: "right center", backfaceVisibility: "hidden" }}
          >
            {/* Handle */}
            <div className="absolute left-6 md:left-10 top-1/2 -translate-y-1/2 w-2 h-16 md:h-24 rounded-full bg-primary-dark/30" />
            {/* Panel inset detail */}
            <div className="absolute inset-6 md:inset-12 border border-primary/10 rounded-2xl" />
            <div className="absolute inset-10 md:inset-20 border border-primary/5 rounded-xl" />
          </div>
        </div>
      </div>

      {/* Featured Product (revealed after door opens) */}
      <div ref={productRef} className="absolute flex flex-col items-center opacity-0 z-10">
        <div className="w-44 h-44 sm:w-56 sm:h-56 md:w-64 md:h-64 rounded-3xl overflow-hidden shadow-card">
          <img src={headphonesImg} alt="Featured Product" className="w-full h-full object-cover" />
        </div>
        <p className="mt-6 font-display text-2xl md:text-3xl text-foreground font-bold">Discover Premium</p>
        <p className="mt-2 text-muted-foreground font-body">Welcome to Verdant</p>
      </div>
    </div>
  );
};

export default DoorAnimation;
