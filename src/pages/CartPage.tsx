import { useCart } from "@/context/CartContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Link } from "react-router-dom";
import { Minus, Plus, Trash2 } from "lucide-react";

const CartPage = () => {
  const { items, removeFromCart, updateQuantity, totalPrice } = useCart();

  return (
    <>
      <Navbar />
      <main className="min-h-[70vh] py-12">
        <div className="container mx-auto px-4 max-w-3xl">
          <h1 className="font-display text-3xl font-bold text-foreground mb-8">Your Cart</h1>
          {items.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-muted-foreground font-body mb-4">Your cart is empty</p>
              <Link to="/" className="text-primary-dark font-body underline">Continue Shopping</Link>
            </div>
          ) : (
            <>
              <div className="flex flex-col gap-4">
                {items.map(({ product, quantity }) => (
                  <div key={product.id} className="flex items-center gap-4 bg-card rounded-2xl p-4 shadow-soft">
                    <img src={product.image} alt={product.name} className="w-20 h-20 rounded-xl object-cover" />
                    <div className="flex-1">
                      <h3 className="font-display font-semibold text-foreground">{product.name}</h3>
                      <p className="text-sm text-muted-foreground font-body">${product.price.toFixed(2)}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <button onClick={() => updateQuantity(product.id, quantity - 1)} className="p-1 rounded-full hover:bg-accent transition-colors">
                        <Minus size={16} className="text-foreground" />
                      </button>
                      <span className="w-8 text-center font-body text-foreground">{quantity}</span>
                      <button onClick={() => updateQuantity(product.id, quantity + 1)} className="p-1 rounded-full hover:bg-accent transition-colors">
                        <Plus size={16} className="text-foreground" />
                      </button>
                    </div>
                    <button onClick={() => removeFromCart(product.id)} className="p-2 rounded-full hover:bg-destructive/10 transition-colors">
                      <Trash2 size={16} className="text-destructive" />
                    </button>
                  </div>
                ))}
              </div>
              <div className="mt-8 flex items-center justify-between">
                <p className="font-display text-xl font-bold text-foreground">Total: ${totalPrice.toFixed(2)}</p>
                <Link
                  to="/checkout"
                  className="px-8 py-3 rounded-full bg-primary-dark text-background font-body font-medium hover:opacity-90 transition-opacity"
                >
                  Checkout
                </Link>
              </div>
            </>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
};

export default CartPage;
