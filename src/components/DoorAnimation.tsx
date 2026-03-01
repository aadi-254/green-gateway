import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import headphonesImg from "@/assets/products/headphones.jpg";

/**
 * DoorAnimation - GSAP-powered cinematic door opening animation
 * 
 * Flow:
 * 1. Loading bar fills up
 * 2. Door appears with animated blinking eyes and floating motion
 * 3. After delay, door opens with hinge animation
 * 4. Green glow emanates from inside, featured product slides out
 * 5. Everything fades away revealing the main site
 */
interface DoorAnimationProps {
  onComplete: () => void;
}

const DoorAnimation = ({ onComplete }: DoorAnimationProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const loadingBarRef = useRef<HTMLDivElement>(null);
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
        onComplete: () => setLoadingDone(true),
      });

      // Phase 2: Fade in door with floating motion
      tl.fromTo(
        doorFrameRef.current,
        { opacity: 0, scale: 0.9 },
        { opacity: 1, scale: 1, duration: 0.8, ease: "power3.out" },
        "+=0.3"
      );

      // Start floating animation on door
      tl.to(doorFrameRef.current, {
        y: -8,
        duration: 1.5,
        ease: "sine.inOut",
        yoyo: true,
        repeat: 1,
      });

      // Phase 3: Door opens - both panels swing open with hinge effect
      tl.to(doorLeftRef.current, {
        rotateY: -110,
        duration: 1.8,
        ease: "power3.inOut",
      }, "doorOpen");

      tl.to(doorRightRef.current, {
        rotateY: 110,
        duration: 1.8,
        ease: "power3.inOut",
      }, "doorOpen");

      // Hide eyes as door opens
      tl.to(eyesRef.current, {
        opacity: 0,
        duration: 0.3,
      }, "doorOpen");

      // Green glow expands
      tl.fromTo(
        glowRef.current,
        { opacity: 0, scale: 0.3 },
        { opacity: 1, scale: 2.5, duration: 1.5, ease: "power2.out" },
        "doorOpen+=0.3"
      );

      // Product slides out
      tl.fromTo(
        productRef.current,
        { opacity: 0, scale: 0.5, y: 40 },
        { opacity: 1, scale: 1, y: 0, duration: 1, ease: "back.out(1.4)" },
        "doorOpen+=0.6"
      );

      // Phase 4: Everything fades out, reveal website
      tl.to(containerRef.current, {
        opacity: 0,
        duration: 0.8,
        ease: "power2.inOut",
        delay: 0.8,
        onComplete,
      });
    }, containerRef);

    return () => ctx.revert();
  }, [onComplete]);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-50 flex items-center justify-center bg-background"
    >
      {/* Loading Bar */}
      {!loadingDone && (
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48">
          <div className="h-1 w-full rounded-full bg-muted overflow-hidden">
            <div
              ref={loadingBarRef}
              className="h-full w-0 rounded-full bg-primary-dark"
            />
          </div>
          <p className="mt-3 text-center text-sm text-muted-foreground font-body tracking-wide">
            Loading experience...
          </p>
        </div>
      )}

      {/* Green Glow (behind door) */}
      <div
        ref={glowRef}
        className="absolute w-64 h-64 rounded-full opacity-0"
        style={{
          background: "radial-gradient(circle, hsl(120 60% 80% / 0.6), hsl(120 40% 72% / 0.2), transparent 70%)",
        }}
      />

      {/* Door Frame */}
      <div
        ref={doorFrameRef}
        className="relative opacity-0"
        style={{ perspective: "1200px" }}
      >
        {/* Door structure */}
        <div className="relative w-48 h-72 sm:w-56 sm:h-80 md:w-64 md:h-96 rounded-t-[2rem] border-2 border-primary/30 overflow-hidden"
          style={{ transformStyle: "preserve-3d" }}
        >
          {/* Eyes on the door */}
          <div ref={eyesRef} className="absolute top-[30%] left-0 right-0 flex justify-center gap-8 z-10">
            <div className="w-5 h-7 rounded-full bg-primary-dark flex items-center justify-center animate-blink">
              <div className="w-2 h-2 rounded-full bg-background" />
            </div>
            <div className="w-5 h-7 rounded-full bg-primary-dark flex items-center justify-center animate-blink"
              style={{ animationDelay: "0.15s" }}
            >
              <div className="w-2 h-2 rounded-full bg-background" />
            </div>
          </div>

          {/* Left Door Panel */}
          <div
            ref={doorLeftRef}
            className="absolute left-0 top-0 w-1/2 h-full bg-primary/20 border-r border-primary/10"
            style={{ transformOrigin: "left center", backfaceVisibility: "hidden" }}
          >
            <div className="absolute right-3 top-1/2 -translate-y-1/2 w-2 h-8 rounded-full bg-primary-dark/40" />
            {/* Door panel details */}
            <div className="absolute inset-4 border border-primary/10 rounded-lg" />
          </div>

          {/* Right Door Panel */}
          <div
            ref={doorRightRef}
            className="absolute right-0 top-0 w-1/2 h-full bg-primary/20 border-l border-primary/10"
            style={{ transformOrigin: "right center", backfaceVisibility: "hidden" }}
          >
            <div className="absolute left-3 top-1/2 -translate-y-1/2 w-2 h-8 rounded-full bg-primary-dark/40" />
            <div className="absolute inset-4 border border-primary/10 rounded-lg" />
          </div>
        </div>

        {/* Door base */}
        <div className="w-full h-2 bg-primary/30 rounded-b-lg" />
      </div>

      {/* Featured Product (revealed after door opens) */}
      <div
        ref={productRef}
        className="absolute flex flex-col items-center opacity-0"
      >
        <div className="w-32 h-32 sm:w-40 sm:h-40 rounded-2xl overflow-hidden shadow-card">
          <img src={headphonesImg} alt="Featured Product" className="w-full h-full object-cover" />
        </div>
        <p className="mt-4 font-display text-xl text-foreground">Discover Premium</p>
      </div>
    </div>
  );
};

export default DoorAnimation;
