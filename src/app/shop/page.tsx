"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingCart, X, Plus, Minus, Check, ArrowRight, ArrowLeft } from "lucide-react";

type Product = { id: string; name: string; price: number; category: string; desc: string; image: string };
type CartItem = Product & { quantity: number; size?: string };

const WHATSAPP_NUMBER = "919019465897";
const CATEGORIES = ["All", "T-Shirts", "Caps", "Keychains", "Accessories"];

const PRODUCTS: Product[] = [
  // T-Shirts
  { id: 't1', name: "Aatman Yodha Signature Tee", price: 1499, category: "T-Shirts", desc: "Heavyweight premium cotton. Minimalist front branding.", image: "/assets/cinematic_concert.png" },
  { id: 't2', name: "The Resonance Oversized Tee", price: 1999, category: "T-Shirts", desc: "Acid-wash finish with deep lore typography.", image: "/assets/cinematic_concert.png" },
  { id: 't3', name: "Sonic Architecture Tour Tee", price: 1299, category: "T-Shirts", desc: "Official 2026 Tour Dates printed on back.", image: "/assets/cinematic_concert.png" },
  { id: 't4', name: "Eco-Conscious Earth Tee", price: 1599, category: "T-Shirts", desc: "100% Recycled materials. Earth-tone dye.", image: "/assets/cinematic_concert.png" },
  { id: 't5', name: "The Vault Exclusive Hoodie", price: 3499, category: "T-Shirts", desc: "Ultra-heavyweight 400gsm winter hoodie.", image: "/assets/cinematic_concert.png" },
  
  // Caps
  { id: 'c1', name: "Signature Orange Logo Cap", price: 999, category: "Caps", desc: "Classic dad hat fit. Embroidered.", image: "/assets/vintage_mic.png" },
  { id: 'c2', name: "Sonic Flatbrim Snapback", price: 1199, category: "Caps", desc: "Premium structure with metallic underbrim.", image: "/assets/vintage_mic.png" },
  { id: 'c3', name: "The Ethos Beanie", price: 899, category: "Caps", desc: "Winter essential. Ribbed knit.", image: "/assets/vintage_mic.png" },
  { id: 'c4', name: "Tour Visor (Limited Edition)", price: 799, category: "Caps", desc: "Breathable mesh. Perfect for festivals.", image: "/assets/vintage_mic.png" },
  { id: 'c5', name: "Distressed Canvas Cap", price: 1299, category: "Caps", desc: "Vintage washed canvas with heavy distressing.", image: "/assets/vintage_mic.png" },

  // Keychains
  { id: 'k1', name: "Matte Black Logo Keychain", price: 499, category: "Keychains", desc: "Heavy zinc alloy. Stealth aesthetic.", image: "/assets/song-poster.jpeg" },
  { id: 'k2', name: "Neon Orange Acrylic Tag", price: 399, category: "Keychains", desc: "Glows under blacklight. Concert ready.", image: "/assets/song-poster.jpeg" },
  { id: 'k3', name: "Guitar Pick Metal Drive", price: 599, category: "Keychains", desc: "Functional pick. Engraved with 'Aatman'.", image: "/assets/song-poster.jpeg" },
  { id: 'k4', name: "The Genesis Medallion", price: 799, category: "Keychains", desc: "Premium stamped metal coin keychain.", image: "/assets/song-poster.jpeg" },
  { id: 'k5', name: "Tour Lanyard + Clip", price: 699, category: "Keychains", desc: "Heavy duty woven lanyard with carabiner.", image: "/assets/song-poster.jpeg" },

  // Accessories
  { id: 'a1', name: "Aatman Yodha Signed Poster", price: 799, category: "Accessories", desc: "A3 High-gloss print. Hand-signed.", image: "/assets/song-poster.jpeg" },
  { id: 'a2', name: "Vinyl Record - Parts of Yourself", price: 2999, category: "Accessories", desc: "180g Audiophile pressing. Limited to 500.", image: "/assets/song-poster.jpeg" },
  { id: 'a3', name: "Encounter Tote Bag", price: 899, category: "Accessories", desc: "Heavy canvas. Eco-friendly shopping.", image: "/assets/song-poster.jpeg" },
  { id: 'a4', name: "Studio Grade Earplugs", price: 1499, category: "Accessories", desc: "Protect your hearing at the shows.", image: "/assets/song-poster.jpeg" },
  { id: 'a5', name: "Resonance Slipmat", price: 999, category: "Accessories", desc: "Premium felt slipmat for your turntable.", image: "/assets/song-poster.jpeg" },
  { id: 'a6', name: "The Ethos Sticker Pack", price: 299, category: "Accessories", desc: "10 high-quality Die-cut vinyl stickers.", image: "/assets/song-poster.jpeg" },
];

export default function Shop() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState("All");
  const [addedItem, setAddedItem] = useState<string | null>(null);

  const filteredProducts = activeCategory === "All" 
    ? PRODUCTS 
    : PRODUCTS.filter(p => p.category === activeCategory);

  const cartTotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  const cartItemCount = cart.reduce((count, item) => count + item.quantity, 0);

  const addToCart = (product: Product) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item);
      }
      return [...prev, { ...product, quantity: 1 }];
    });
    
    setAddedItem(product.id);
    setTimeout(() => setAddedItem(null), 1500);
  };

  const updateQuantity = (id: string, delta: number) => {
    setCart(prev => prev.map(item => {
      if (item.id === id) {
        const newQuantity = Math.max(0, item.quantity + delta);
        return { ...item, quantity: newQuantity };
      }
      return item;
    }).filter(item => item.quantity > 0));
  };

  const handleCheckout = () => {
    if (cart.length === 0) return;
    
    const orderId = `AY-${Math.floor(100000 + Math.random() * 900000)}`;
    
    let message = `*NEW ORDER: THE VAULT*\nOrder ID: #${orderId}\n\n*Items:*\n`;
    
    cart.forEach(item => {
      message += `- ${item.quantity}x ${item.name} (₹${item.price * item.quantity})\n`;
    });
    
    message += `\n*TOTAL:* ₹${cartTotal}\n\n`;
    message += `I would like to proceed with the payment for this order. Please send the payment details.`;
    
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`;
    
    window.open(whatsappUrl, "_blank");
  };

  return (
    <main className="min-h-screen bg-[#050505] text-white overflow-x-hidden selection:bg-brand-orange selection:text-white">
      {/* Navbar Integration */}
      <header className="fixed top-0 w-full z-[50] flex justify-between items-center px-6 md:px-12 py-6 bg-gradient-to-b from-black/90 via-black/40 to-transparent backdrop-blur-sm">
        <a href="/" className="font-cinzel text-xl md:text-2xl font-bold tracking-[0.2em] text-white hover:text-brand-orange transition-colors silver-diamond flex items-center gap-2">
           <ArrowLeft className="w-5 h-5" /> AATMAN YODHA
        </a>
        <div className="flex items-center gap-6">
           <button 
             onClick={() => setIsCartOpen(true)}
             className="relative p-2 hover:text-brand-orange transition-colors group"
           >
              <ShoppingCart className="w-6 h-6" />
              {cartItemCount > 0 && (
                 <span className="absolute top-0 right-0 bg-brand-orange text-white text-[10px] w-4 h-4 flex items-center justify-center rounded-full font-bold shadow-[0_0_10px_rgba(231,81,20,0.8)]">
                    {cartItemCount}
                 </span>
              )}
           </button>
        </div>
      </header>

      {/* Hero */}
      <section className="relative pt-40 pb-20 px-6 md:px-12 flex flex-col items-center justify-center min-h-[40vh] border-b border-white/5">
         <div className="absolute inset-0 bg-brand-orange/5 mix-blend-screen pointer-events-none" />
         <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-brand-orange/10 rounded-full blur-[120px] pointer-events-none" />
         <h1 className="font-cinzel text-6xl md:text-[8rem] uppercase leading-none tracking-widest encounter-text mt-8">The Vault</h1>
         <p className="font-dmsans text-white/50 tracking-[0.4em] uppercase text-xs md:text-sm mt-6 text-center max-w-xl">
            Official Aatman Yodha Merchandise. Premium Artifacts. Ships Globally.
         </p>
      </section>

      {/* Categories */}
      <section className="sticky top-[88px] z-[40] bg-[#050505]/80 backdrop-blur-xl border-b border-white/10 px-6 py-4 flex overflow-x-auto no-scrollbar gap-4 md:justify-center">
         {CATEGORIES.map(cat => (
            <button 
               key={cat}
               onClick={() => setActiveCategory(cat)}
               className={`font-dmsans text-xs md:text-sm uppercase tracking-widest px-6 py-2 rounded-full whitespace-nowrap transition-all duration-300 ${activeCategory === cat ? 'bg-brand-orange text-white shadow-[0_0_15px_rgba(231,81,20,0.4)]' : 'bg-white/5 text-white/50 hover:text-white hover:bg-white/10'}`}
            >
               {cat}
            </button>
         ))}
      </section>

      {/* Grid */}
      <section className="px-6 md:px-12 py-20 max-w-[120rem] mx-auto min-h-screen">
         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 md:gap-12">
            <AnimatePresence mode="popLayout">
               {filteredProducts.map(product => (
                  <motion.div 
                     layout
                     initial={{ opacity: 0, scale: 0.9 }}
                     animate={{ opacity: 1, scale: 1 }}
                     exit={{ opacity: 0, scale: 0.9 }}
                     transition={{ duration: 0.4 }}
                     key={product.id}
                     className="group relative bg-[#0a0a0a] rounded-2xl border border-white/5 overflow-hidden hover:border-brand-orange/30 transition-all duration-500 shadow-2xl"
                  >
                     <div className="aspect-square w-full relative overflow-hidden bg-black flex items-center justify-center">
                        <div className="absolute inset-0 bg-brand-orange/0 group-hover:bg-brand-orange/10 transition-colors duration-700 z-10 pointer-events-none" />
                        <img src={product.image} className="absolute inset-0 w-full h-full object-cover opacity-20 filter grayscale group-hover:grayscale-0 group-hover:scale-110 group-hover:opacity-40 transition-all duration-700 pointer-events-none" alt="" />
                        <h3 className="relative z-20 font-cinzel text-xl md:text-3xl text-center text-white/80 group-hover:text-white px-8 drop-shadow-2xl transition-colors">{product.category.toUpperCase()}</h3>
                     </div>
                     <div className="p-6 md:p-8">
                        <div className="flex justify-between items-start gap-4 mb-4">
                           <h3 className="font-cinzel text-xl text-white group-hover:text-brand-orange transition-colors">{product.name}</h3>
                           <p className="font-dmsans font-bold text-white whitespace-nowrap">₹{product.price}</p>
                        </div>
                        <p className="font-dmsans text-sm text-white/40 mb-8 min-h-[40px] leading-relaxed">{product.desc}</p>
                        <button 
                           onClick={() => addToCart(product)}
                           className="w-full py-4 bg-white/5 hover:bg-brand-orange text-white font-dmsans text-xs uppercase tracking-widest rounded-xl transition-all duration-300 flex items-center justify-center gap-2 group/btn border border-white/10 hover:border-transparent"
                        >
                           {addedItem === product.id ? (
                              <><Check className="w-4 h-4" /> ADDED TO CART</>
                           ) : (
                              <><Plus className="w-4 h-4" /> ADD TO CART</>
                           )}
                        </button>
                     </div>
                  </motion.div>
               ))}
            </AnimatePresence>
         </div>
      </section>

      {/* Cart Drawer */}
      <AnimatePresence>
         {isCartOpen && (
            <div className="fixed inset-0 z-[999] flex justify-end">
               <motion.div 
                  initial={{ opacity: 0 }} 
                  animate={{ opacity: 1 }} 
                  exit={{ opacity: 0 }} 
                  onClick={() => setIsCartOpen(false)}
                  className="absolute inset-0 bg-black/80 backdrop-blur-sm cursor-none"
               />
               <motion.div 
                  initial={{ x: "100%" }}
                  animate={{ x: 0 }}
                  exit={{ x: "100%" }}
                  transition={{ type: "spring", damping: 25, stiffness: 200 }}
                  className="relative w-full md:w-[500px] h-full bg-[#0a0a0a] border-l border-white/10 p-6 md:p-8 flex flex-col shadow-[-20px_0_50px_rgba(0,0,0,0.8)]"
               >
                  <div className="flex justify-between items-center mb-10 pb-6 border-b border-white/10">
                     <h2 className="font-cinzel text-2xl text-white tracking-widest uppercase">Your Cart</h2>
                     <button onClick={() => setIsCartOpen(false)} className="p-2 hover:bg-white/10 rounded-full transition-colors text-white/50 hover:text-white">
                        <X className="w-6 h-6" />
                     </button>
                  </div>

                  <div className="flex-1 overflow-y-auto no-scrollbar flex flex-col gap-6">
                     {cart.length === 0 ? (
                        <div className="h-full flex flex-col items-center justify-center opacity-30">
                           <ShoppingCart className="w-20 h-20 mb-6" />
                           <p className="font-dmsans uppercase tracking-widest text-sm">Your cart is empty</p>
                        </div>
                     ) : (
                        cart.map(item => (
                           <div key={item.id} className="flex gap-4 items-center bg-white/5 p-4 rounded-2xl border border-white/5">
                              <div className="w-20 h-20 bg-black rounded-xl overflow-hidden relative flex-shrink-0 flex items-center justify-center">
                                 <img src={item.image} className="absolute inset-0 w-full h-full object-cover opacity-20 grayscale" alt="" />
                              </div>
                              <div className="flex-1">
                                 <p className="font-cinzel text-sm text-white mb-1">{item.name}</p>
                                 <p className="font-dmsans text-brand-orange text-sm font-bold">₹{item.price}</p>
                              </div>
                              <div className="flex items-center gap-3 bg-black rounded-lg p-1 border border-white/10">
                                 <button onClick={() => updateQuantity(item.id, -1)} className="w-8 h-8 flex items-center justify-center text-white/50 hover:text-white hover:bg-white/10 rounded-md transition-colors"><Minus className="w-3 h-3" /></button>
                                 <span className="font-dmsans text-sm w-4 text-center">{item.quantity}</span>
                                 <button onClick={() => updateQuantity(item.id, 1)} className="w-8 h-8 flex items-center justify-center text-white/50 hover:text-white hover:bg-white/10 rounded-md transition-colors"><Plus className="w-3 h-3" /></button>
                              </div>
                           </div>
                        ))
                     )}
                  </div>

                  {cart.length > 0 && (
                     <div className="mt-8 pt-8 border-t border-white/10 flex flex-col gap-6">
                        <div className="flex justify-between items-end">
                           <p className="font-dmsans text-white/50 uppercase tracking-widest text-sm">Total</p>
                           <p className="font-cinzel text-4xl text-white group-hover:text-brand-orange">₹{cartTotal}</p>
                        </div>
                        <button 
                           onClick={handleCheckout}
                           className="w-full py-5 bg-brand-orange hover:bg-brand-orange/80 text-white font-dmsans text-xs md:text-sm uppercase tracking-[0.3em] font-bold rounded-xl transition-all duration-300 flex items-center justify-center gap-3 shadow-[0_0_20px_rgba(231,81,20,0.3)] hover:shadow-[0_0_30px_rgba(231,81,20,0.6)]"
                        >
                           Buy on WhatsApp <ArrowRight className="w-5 h-5" />
                        </button>
                        <p className="font-dmsans text-[10px] text-white/30 text-center tracking-widest uppercase">Secure Professional Checkout via WhatsApp API</p>
                     </div>
                  )}
               </motion.div>
            </div>
         )}
      </AnimatePresence>
    </main>
  );
}
