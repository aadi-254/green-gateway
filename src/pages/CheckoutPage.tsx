import { useCart } from "@/context/CartContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

const CheckoutPage = () => {
  const { items, totalPrice, clearCart } = useCart();
  const navigate = useNavigate();

  const handleOrder = (e: React.FormEvent) => {
    e.preventDefault();
    clearCart();
    toast.success("Order placed successfully!");
    navigate("/dashboard");
  };

  return (
    <>
      <Navbar />
      <main className="min-h-[70vh] py-12">
        <div className="container mx-auto px-4 max-w-lg">
          <h1 className="font-display text-3xl font-bold text-foreground mb-8">Checkout</h1>
          {items.length === 0 ? (
            <p className="text-muted-foreground font-body">No items to checkout.</p>
          ) : (
            <form onSubmit={handleOrder} className="flex flex-col gap-4">
              <input placeholder="Full Name" required className="px-4 py-3 rounded-xl border border-border bg-card text-foreground font-body focus:outline-none focus:ring-2 focus:ring-primary" />
              <input placeholder="Email" type="email" required className="px-4 py-3 rounded-xl border border-border bg-card text-foreground font-body focus:outline-none focus:ring-2 focus:ring-primary" />
              <input placeholder="Address" required className="px-4 py-3 rounded-xl border border-border bg-card text-foreground font-body focus:outline-none focus:ring-2 focus:ring-primary" />
              <input placeholder="Card Number" required className="px-4 py-3 rounded-xl border border-border bg-card text-foreground font-body focus:outline-none focus:ring-2 focus:ring-primary" />
              <div className="mt-4 p-4 bg-secondary rounded-xl">
                <p className="font-body text-sm text-muted-foreground">{items.length} item(s)</p>
                <p className="font-display text-xl font-bold text-foreground mt-1">Total: ${totalPrice.toFixed(2)}</p>
              </div>
              <button type="submit" className="mt-4 px-8 py-3 rounded-full bg-primary-dark text-background font-body font-medium hover:opacity-90 transition-opacity">
                Place Order
              </button>
            </form>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
};

export default CheckoutPage;
