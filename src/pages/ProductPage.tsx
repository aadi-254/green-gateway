import { useParams, Link } from "react-router-dom";
import { products } from "@/data/products";
import { useCart } from "@/context/CartContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ShoppingCart, ArrowLeft, Star } from "lucide-react";
import { toast } from "sonner";

const ProductPage = () => {
  const { id } = useParams();
  const { addToCart } = useCart();
  const product = products.find((p) => p.id === id);

  if (!product) {
    return (
      <>
        <Navbar />
        <div className="min-h-[70vh] flex items-center justify-center">
          <p className="text-muted-foreground font-body">Product not found.</p>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />
      <main className="py-12">
        <div className="container mx-auto px-4 max-w-4xl">
          <Link to="/" className="inline-flex items-center gap-2 text-muted-foreground font-body hover:text-foreground transition-colors mb-8">
            <ArrowLeft size={16} /> Back to shop
          </Link>
          <div className="flex flex-col md:flex-row gap-10">
            <div className="flex-1">
              <div className="bg-secondary rounded-3xl overflow-hidden shadow-card">
                <img src={product.image} alt={product.name} className="w-full aspect-square object-cover" />
              </div>
            </div>
            <div className="flex-1 flex flex-col justify-center">
              <p className="text-xs text-muted-foreground font-body uppercase tracking-wider mb-2">{product.category}</p>
              <h1 className="font-display text-3xl font-bold text-foreground mb-3">{product.name}</h1>
              <div className="flex items-center gap-1 mb-4">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} size={14} className={i < Math.round(product.rating) ? "fill-primary-dark text-primary-dark" : "text-muted"} />
                ))}
                <span className="ml-2 text-sm text-muted-foreground font-body">{product.rating}</span>
              </div>
              <p className="text-muted-foreground font-body leading-relaxed mb-6">{product.description}</p>
              <p className="font-display text-3xl font-bold text-primary-dark mb-8">${product.price.toFixed(2)}</p>
              <button
                onClick={() => { addToCart(product); toast.success(`${product.name} added to cart`); }}
                className="inline-flex items-center justify-center gap-2 px-8 py-3 rounded-full bg-primary-dark text-background font-body font-medium hover:opacity-90 transition-opacity w-full md:w-auto"
              >
                <ShoppingCart size={18} /> Add to Cart
              </button>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default ProductPage;
