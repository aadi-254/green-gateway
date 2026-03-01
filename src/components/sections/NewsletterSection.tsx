import { useState } from "react";
import { toast } from "sonner";

const NewsletterSection = () => {
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      toast.success("Thanks for subscribing!");
      setEmail("");
    }
  };

  return (
    <section className="py-20 bg-secondary">
      <div className="container mx-auto px-4 text-center max-w-lg">
        <h2 className="font-display text-3xl font-bold text-foreground mb-4">Stay in the Loop</h2>
        <p className="text-muted-foreground font-body mb-8">
          Get updates on new drops, exclusive offers, and curated picks.
        </p>
        <form onSubmit={handleSubmit} className="flex gap-3">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="your@email.com"
            className="flex-1 px-5 py-3 rounded-full bg-card border border-border text-foreground font-body text-sm focus:outline-none focus:ring-2 focus:ring-primary"
            required
          />
          <button
            type="submit"
            className="px-6 py-3 rounded-full bg-primary-dark text-background font-body font-medium hover:scale-105 transition-transform duration-200"
          >
            Subscribe
          </button>
        </form>
      </div>
    </section>
  );
};

export default NewsletterSection;
