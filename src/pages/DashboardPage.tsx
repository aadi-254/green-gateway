import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { User, Package, Star } from "lucide-react";

const orders = [
  { id: "#1042", date: "Feb 20, 2026", total: 149.99, status: "Delivered" },
  { id: "#1038", date: "Feb 12, 2026", total: 89.99, status: "Delivered" },
  { id: "#1029", date: "Jan 30, 2026", total: 329.98, status: "Shipped" },
];

const DashboardPage = () => {
  return (
    <>
      <Navbar />
      <main className="min-h-[70vh] py-12">
        <div className="container mx-auto px-4 max-w-3xl">
          <h1 className="font-display text-3xl font-bold text-foreground mb-8">Dashboard</h1>

          {/* Profile Card */}
          <div className="bg-card rounded-2xl p-6 shadow-soft flex items-center gap-4 mb-8">
            <div className="w-14 h-14 rounded-full bg-primary/30 flex items-center justify-center">
              <User size={24} className="text-primary-dark" />
            </div>
            <div>
              <h2 className="font-display text-lg font-semibold text-foreground">Jane Doe</h2>
              <p className="text-sm text-muted-foreground font-body">jane@example.com</p>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 mb-8">
            {[
              { icon: Package, label: "Orders", value: "3" },
              { icon: Star, label: "Reviews", value: "2" },
              { icon: User, label: "Loyalty", value: "Gold" },
            ].map(({ icon: Icon, label, value }) => (
              <div key={label} className="bg-card rounded-2xl p-4 shadow-soft text-center">
                <Icon size={20} className="mx-auto text-primary-dark mb-2" />
                <p className="font-display text-lg font-bold text-foreground">{value}</p>
                <p className="text-xs text-muted-foreground font-body">{label}</p>
              </div>
            ))}
          </div>

          {/* Order History */}
          <h2 className="font-display text-xl font-bold text-foreground mb-4">Order History</h2>
          <div className="flex flex-col gap-3">
            {orders.map((order) => (
              <div key={order.id} className="flex items-center justify-between bg-card rounded-2xl p-4 shadow-soft">
                <div>
                  <p className="font-body font-semibold text-foreground">{order.id}</p>
                  <p className="text-xs text-muted-foreground font-body">{order.date}</p>
                </div>
                <div className="text-right">
                  <p className="font-body font-semibold text-foreground">${order.total.toFixed(2)}</p>
                  <p className="text-xs text-primary-dark font-body">{order.status}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default DashboardPage;
