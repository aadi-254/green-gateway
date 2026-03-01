import { useState, useCallback } from "react";
import DoorAnimation from "@/components/DoorAnimation";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/sections/HeroSection";
import ProductsSection from "@/components/sections/ProductsSection";
import AboutSection from "@/components/sections/AboutSection";
import TestimonialsSection from "@/components/sections/TestimonialsSection";
import NewsletterSection from "@/components/sections/NewsletterSection";
import Footer from "@/components/Footer";

const Index = () => {
  const [animationDone, setAnimationDone] = useState(false);
  const handleComplete = useCallback(() => setAnimationDone(true), []);

  return (
    <>
      {!animationDone && <DoorAnimation onComplete={handleComplete} />}
      <div className={animationDone ? "animate-fade-in" : "opacity-0"} style={{ animationDuration: "0.5s", animationFillMode: "forwards" }}>
        <Navbar />
        <HeroSection />
        <ProductsSection />
        <AboutSection />
        <TestimonialsSection />
        <NewsletterSection />
        <Footer />
      </div>
    </>
  );
};

export default Index;
