import { createContext, useContext, useEffect, useState } from "react";

const CartContext = createContext(null);

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [toast, setToast] = useState(null); // { message, id }

  // Auto-clear toast after 2.5s
  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(null), 2500);
    return () => clearTimeout(t);
  }, [toast]);

  const addToCart = (watch) => {
    setCart((prev) => {
      const found = prev.find((item) => item.id === watch.id);
      if (found) {
        return prev.map((item) =>
          item.id === watch.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { ...watch, quantity: 1 }];
    });
    setToast({ message: `✅ ${watch.name} added to cart!`, id: Date.now() });
  };

  const removeFromCart = (id) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  const clearCart = () => {
    setCart([]);
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart, toast }}>
      {/* Global toast notification */}
      {toast && (
        <div style={{
          position: 'fixed', bottom: '30px', left: '50%', transform: 'translateX(-50%)',
          background: 'linear-gradient(135deg, #1a1a1a, #2a2a2a)',
          border: '1px solid #d4af37', color: '#d4af37',
          padding: '14px 28px', borderRadius: '8px', zIndex: 9999,
          fontSize: '15px', fontWeight: '600', letterSpacing: '0.5px',
          boxShadow: '0 8px 30px rgba(212,175,55,0.25)',
          animation: 'fadeInToast 0.3s ease',
          whiteSpace: 'nowrap',
        }}>
          {toast.message}
        </div>
      )}
      <style>{`@keyframes fadeInToast { from { opacity:0; transform: translateX(-50%) translateY(10px); } to { opacity:1; transform: translateX(-50%) translateY(0); } }`}</style>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used inside CartProvider");
  }
  return context;
};