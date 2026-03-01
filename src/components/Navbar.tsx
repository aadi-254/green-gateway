import { Link } from "react-router-dom";
import { ShoppingCart, User, Menu, X } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useState } from "react";

const Navbar = () => {
  const { totalItems } = useCart();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-40 bg-background/80 backdrop-blur-lg border-b border-border">
      <div className="container mx-auto flex items-center justify-between h-16 px-4">
        <Link to="/" className="font-display text-2xl font-bold text-foreground tracking-tight">
          Verdant
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          <Link to="/" className="text-sm font-body text-muted-foreground hover:text-foreground transition-colors">Home</Link>
          <a href="/#products" className="text-sm font-body text-muted-foreground hover:text-foreground transition-colors">Products</a>
          <a href="/#about" className="text-sm font-body text-muted-foreground hover:text-foreground transition-colors">About</a>
          <a href="/#testimonials" className="text-sm font-body text-muted-foreground hover:text-foreground transition-colors">Reviews</a>
        </div>

        <div className="flex items-center gap-3">
          <Link to="/dashboard" className="p-2 rounded-full hover:bg-accent transition-colors">
            <User size={20} className="text-foreground" />
          </Link>
          <Link to="/cart" className="relative p-2 rounded-full hover:bg-accent transition-colors">
            <ShoppingCart size={20} className="text-foreground" />
            {totalItems > 0 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-primary-dark text-background text-xs rounded-full flex items-center justify-center font-body font-bold">
                {totalItems}
              </span>
            )}
          </Link>
          <button
            className="md:hidden p-2 rounded-full hover:bg-accent transition-colors"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden border-t border-border bg-background p-4 flex flex-col gap-3">
          <Link to="/" onClick={() => setMobileOpen(false)} className="text-sm font-body text-muted-foreground py-2">Home</Link>
          <a href="/#products" onClick={() => setMobileOpen(false)} className="text-sm font-body text-muted-foreground py-2">Products</a>
          <a href="/#about" onClick={() => setMobileOpen(false)} className="text-sm font-body text-muted-foreground py-2">About</a>
          <a href="/#testimonials" onClick={() => setMobileOpen(false)} className="text-sm font-body text-muted-foreground py-2">Reviews</a>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
