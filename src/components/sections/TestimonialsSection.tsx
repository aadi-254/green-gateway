import { useRef, useEffect, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const testimonials = [
  { name: "Alex M.", text: "The quality is incredible. Every product feels premium without the markup.", rating: 5 },
  { name: "Sarah K.", text: "Verdant changed how I think about everyday essentials. Minimal, beautiful, functional.", rating: 5 },
  { name: "James L.", text: "Fast shipping, gorgeous packaging, and products that actually last. 10/10.", rating: 5 },
  { name: "Priya R.", text: "I've replaced most of my daily items with Verdant picks. No regrets whatsoever.", rating: 4 },
  { name: "Tom W.", text: "The backpack is my favorite purchase this year. Sleek and super practical.", rating: 5 },
];

const TestimonialsSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(sectionRef.current, {
        scrollTrigger: { trigger: sectionRef.current, start: "top 80%" },
        opacity: 0, y: 30, duration: 0.7,
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const slide = (dir: number) => {
    setCurrent((prev) => (prev + dir + testimonials.length) % testimonials.length);
  };

  return (
    <section id="testimonials" ref={sectionRef} className="py-20">
      <div className="container mx-auto px-4">
        <h2 className="font-display text-3xl md:text-4xl font-bold text-center text-foreground mb-12">
          What Our Customers Say
        </h2>
        <div className="relative max-w-2xl mx-auto">
          <div ref={trackRef} className="overflow-hidden">
            <div
              className="flex transition-transform duration-500 ease-out"
              style={{ transform: `translateX(-${current * 100}%)` }}
            >
              {testimonials.map((t, i) => (
                <div key={i} className="w-full flex-shrink-0 px-4">
                  <div className="bg-card rounded-2xl p-8 shadow-soft text-center">
                    <div className="flex justify-center gap-1 mb-4">
                      {Array.from({ length: 5 }).map((_, s) => (
                        <Star key={s} size={16} className={s < t.rating ? "fill-primary-dark text-primary-dark" : "text-muted"} />
                      ))}
                    </div>
                    <p className="font-body text-foreground leading-relaxed italic">"{t.text}"</p>
                    <p className="mt-4 font-display font-semibold text-foreground">{t.name}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <button
            onClick={() => slide(-1)}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 p-2 rounded-full bg-card shadow-soft hover:shadow-card-hover transition-shadow"
          >
            <ChevronLeft size={20} className="text-foreground" />
          </button>
          <button
            onClick={() => slide(1)}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 p-2 rounded-full bg-card shadow-soft hover:shadow-card-hover transition-shadow"
          >
            <ChevronRight size={20} className="text-foreground" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
