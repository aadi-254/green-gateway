import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const stats = [
  { label: "Happy Customers", target: 12400 },
  { label: "Products Sold", target: 38000 },
  { label: "Countries", target: 42 },
  { label: "5-Star Reviews", target: 9800 },
];

const Counter = ({ target, triggered }: { target: number; triggered: boolean }) => {
  const [count, setCount] = useState(0);
  const ref = useRef<{ obj: { val: number } }>({ obj: { val: 0 } });

  useEffect(() => {
    if (!triggered) return;
    const obj = ref.current.obj;
    gsap.to(obj, {
      val: target,
      duration: 2,
      ease: "power2.out",
      onUpdate: () => setCount(Math.round(obj.val)),
    });
  }, [triggered, target]);

  return <>{count.toLocaleString()}</>;
};

const AboutSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [triggered, setTriggered] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top 75%",
        onEnter: () => setTriggered(true),
        once: true,
      });
      gsap.from(".about-text", {
        scrollTrigger: { trigger: sectionRef.current, start: "top 80%" },
        opacity: 0, y: 30, duration: 0.7, ease: "power3.out",
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="about" ref={sectionRef} className="py-20 bg-secondary">
      <div className="container mx-auto px-4">
        <div className="about-text max-w-2xl mx-auto text-center mb-16">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">About Verdant</h2>
          <p className="text-muted-foreground font-body leading-relaxed">
            Born from a love of thoughtful design, Verdant curates products that bring simplicity and joy to everyday life. We believe premium doesn't have to mean pretentious — just intentional.
          </p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <p className="font-display text-3xl md:text-4xl font-bold text-primary-dark">
                <Counter target={stat.target} triggered={triggered} />+
              </p>
              <p className="mt-2 text-sm text-muted-foreground font-body">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
