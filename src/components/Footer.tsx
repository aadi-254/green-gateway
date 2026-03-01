import { Link } from "react-router-dom";

const Footer = () => (
  <footer className="py-10 border-t border-border">
    <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4">
      <Link to="/" className="font-display text-xl font-bold text-foreground">Verdant</Link>
      <p className="text-sm text-muted-foreground font-body">© 2026 Verdant. All rights reserved.</p>
    </div>
  </footer>
);

export default Footer;
