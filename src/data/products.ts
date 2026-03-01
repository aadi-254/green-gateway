import headphonesImg from "@/assets/products/headphones.jpg";
import smartwatchImg from "@/assets/products/smartwatch.jpg";
import sneakersImg from "@/assets/products/sneakers.jpg";
import backpackImg from "@/assets/products/backpack.jpg";
import smartlampImg from "@/assets/products/smartlamp.jpg";
import speakerImg from "@/assets/products/speaker.jpg";
import hoodieImg from "@/assets/products/hoodie.jpg";
import mouseImg from "@/assets/products/mouse.jpg";

export interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  description: string;
  category: string;
  rating: number;
  featured?: boolean;
}

export const products: Product[] = [
  {
    id: "1",
    name: "Wireless Headphones",
    price: 149.99,
    image: headphonesImg,
    description: "Premium noise-cancelling wireless headphones with 30-hour battery life and studio-quality sound.",
    category: "Audio",
    rating: 4.8,
    featured: true,
  },
  {
    id: "2",
    name: "Smart Watch",
    price: 299.99,
    image: smartwatchImg,
    description: "Elegant smart watch with health monitoring, GPS, and a stunning AMOLED display.",
    category: "Wearables",
    rating: 4.7,
  },
  {
    id: "3",
    name: "Minimal Sneakers",
    price: 89.99,
    image: sneakersImg,
    description: "Handcrafted minimal sneakers with premium leather and ultra-comfortable soles.",
    category: "Footwear",
    rating: 4.6,
  },
  {
    id: "4",
    name: "Minimal Backpack",
    price: 129.99,
    image: backpackImg,
    description: "Water-resistant backpack with laptop compartment and ergonomic design.",
    category: "Accessories",
    rating: 4.5,
  },
  {
    id: "5",
    name: "Smart Lamp",
    price: 79.99,
    image: smartlampImg,
    description: "App-controlled desk lamp with adjustable color temperature and brightness.",
    category: "Home",
    rating: 4.4,
  },
  {
    id: "6",
    name: "Bluetooth Speaker",
    price: 69.99,
    image: speakerImg,
    description: "Portable speaker with 360° sound, waterproof design, and 20-hour playtime.",
    category: "Audio",
    rating: 4.6,
  },
  {
    id: "7",
    name: "Essential Hoodie",
    price: 59.99,
    image: hoodieImg,
    description: "Premium cotton hoodie with a relaxed fit and minimalist design.",
    category: "Apparel",
    rating: 4.3,
  },
  {
    id: "8",
    name: "Gaming Mouse",
    price: 49.99,
    image: mouseImg,
    description: "High-precision gaming mouse with customizable buttons and RGB lighting.",
    category: "Gaming",
    rating: 4.7,
  },
];
