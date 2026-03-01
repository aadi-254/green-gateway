import { useEffect, useRef } from "react";
import gsap from "gsap";
import { Link } from "react-router-dom";
import headphonesImg from "@/assets/products/headphones.jpg";

const HeroSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".hero-title", { opacity: 0, y: 40, duration: 0.8, ease: "power3.out" });
      gsap.from(".hero-sub", { opacity: 0, y: 30, duration: 0.8, delay: 0.2, ease: "power3.out" });
      gsap.from(".hero-btn", { opacity: 0, y: 20, duration: 0.6, delay: 0.4, ease: "power3.out" });
      gsap.from(".hero-image", { opacity: 0, scale: 0.9, duration: 1, delay: 0.3, ease: "power3.out" });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative py-20 md:py-32 overflow-hidden">
      <div className="absolute inset-0 bg-glow opacity-50 pointer-events-none" />
      <div className="container mx-auto px-4 flex flex-col md:flex-row items-center gap-12">
        <div className="flex-1 text-center md:text-left">
          <h1 className="hero-title font-display text-4xl sm:text-5xl md:text-6xl font-bold text-foreground leading-tight">
            Discover<br />
            <span className="text-gradient">Premium</span> Living
          </h1>
          <p className="hero-sub mt-6 text-lg text-muted-foreground font-body max-w-md mx-auto md:mx-0">
            Curated essentials designed for the modern minimalist. Quality that speaks for itself.
          </p>
          <Link
            to="/#products"
            className="hero-btn inline-block mt-8 px-8 py-3 rounded-full bg-primary-dark text-background font-body font-medium hover:opacity-90 transition-opacity"
          >
            Shop Now
          </Link>
        </div>
        <div className="flex-1 flex justify-center">
          <div className="hero-image relative">
            <div className="absolute -inset-8 bg-glow rounded-full blur-2xl" />
            <img
              src={headphonesImg}
              alt="Featured product"
              className="relative w-64 h-64 sm:w-80 sm:h-80 rounded-3xl object-cover shadow-card animate-float"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
