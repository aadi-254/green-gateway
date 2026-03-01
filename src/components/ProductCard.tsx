import { Link } from "react-router-dom";
import { ShoppingCart } from "lucide-react";
import { Product } from "@/data/products";
import { useCart } from "@/context/CartContext";
import { toast } from "sonner";

const ProductCard = ({ product }: { product: Product }) => {
  const { addToCart } = useCart();

  const handleAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    addToCart(product);
    toast.success(`${product.name} added to cart`);
  };

  return (
    <Link
      to={`/product/${product.id}`}
      className="group block bg-card rounded-2xl overflow-hidden shadow-soft hover:shadow-card-hover transition-all duration-300 hover:-translate-y-1"
    >
      <div className="aspect-square overflow-hidden bg-secondary">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
      </div>
      <div className="p-4">
        <p className="text-xs text-muted-foreground font-body uppercase tracking-wider mb-1">{product.category}</p>
        <h3 className="font-display text-lg font-semibold text-foreground">{product.name}</h3>
        <div className="flex items-center justify-between mt-3">
          <span className="font-body text-lg font-bold text-primary-dark">${product.price.toFixed(2)}</span>
          <button
            onClick={handleAdd}
            className="p-2 rounded-full bg-primary hover:bg-primary-dark text-primary-foreground transition-colors duration-200"
            aria-label="Add to cart"
          >
            <ShoppingCart size={16} />
          </button>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
