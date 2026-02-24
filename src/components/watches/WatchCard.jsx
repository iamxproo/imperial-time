import { useState } from "react";
import { useCart } from "../../context/CartContext";

const WatchCard = ({ watch }) => {
  const { addToCart } = useCart();
  const [isHovered, setIsHovered] = useState(false);

  const handleAddToCart = () => {
    addToCart(watch);
  };

  return (
    <div
      style={{
        ...styles.card,
        border: isHovered ? "2px solid #d4af37" : "1px solid rgba(212, 175, 55, 0.2)",
        boxShadow: isHovered
          ? "0 20px 60px rgba(212, 175, 55, 0.25)"
          : "0 10px 30px rgba(0, 0, 0, 0.4)",
        transform: isHovered ? "translateY(-8px)" : "translateY(0)",
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <style>{`
        @keyframes fadeInCard {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes shimmer {
          0%, 100% { opacity: 0.8; }
          50% { opacity: 1; }
        }

        .watch-card-container {
          animation: fadeInCard 0.6s ease-out;
        }

        .watch-image-glow {
          position: relative;
        }

        .watch-image-glow::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: radial-gradient(ellipse at center, rgba(212, 175, 55, 0.1) 0%, transparent 70%);
          opacity: 0;
          transition: opacity 0.3s ease;
          border-radius: 8px;
        }

        .watch-card-container:hover .watch-image-glow::before {
          opacity: 1;
        }
      `}</style>

      <div className="watch-card-container">
        <div style={{ ...styles.imgBox, position: "relative" }}>
          <div className="watch-image-glow" style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <img src={watch.image} alt={watch.name} style={{
              ...styles.img,
              transition: "all 0.3s ease",
              transform: isHovered ? "scale(1.1)" : "scale(1)",
              filter: isHovered ? "brightness(1.1)" : "brightness(1)",
            }} />
          </div>
          {/* Decorative Corner Elements */}
          <div style={{
            position: "absolute",
            top: "12px",
            right: "12px",
            fontSize: "16px",
            opacity: isHovered ? "1" : "0.5",
            transition: "all 0.3s ease",
          }}>
            ✨
          </div>
        </div>

        <div style={styles.info}>
          <h3 style={{
            fontSize: "18px",
            fontWeight: "700",
            color: "#ffffff",
            marginBottom: "8px",
            letterSpacing: "1px",
            transition: "color 0.3s ease",
            color: isHovered ? "#d4af37" : "#ffffff",
          }}>
            {watch.name}
          </h3>
          <p style={{
            fontSize: "16px",
            color: "#d4af37",
            marginBottom: "20px",
            fontWeight: "600",
            letterSpacing: "0.5px",
          }}>
            ₹ {watch.price.toLocaleString()}
          </p>

          <button
            onClick={handleAddToCart}
            style={{
              ...styles.btn,
              background: isHovered
                ? "linear-gradient(135deg, #d4af37 0%, #c9a961 100%)"
                : "transparent",
              color: isHovered ? "#0a0a0a" : "#d4af37",
              borderColor: "#d4af37",
              transform: isHovered ? "scale(1.05)" : "scale(1)",
              boxShadow: isHovered
                ? "0 8px 20px rgba(212, 175, 55, 0.3)"
                : "none",
            }}
          >
            Add to Collection
          </button>
        </div>
      </div>
    </div>
  );
};

const styles = {
  card: {
    background: "linear-gradient(135deg, rgba(42, 42, 42, 0.8) 0%, rgba(26, 26, 26, 0.8) 100%)",
    borderRadius: "12px",
    padding: "25px",
    transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
    cursor: "pointer",
  },
  imgBox: {
    height: "300px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
    marginBottom: "25px",
    background: "linear-gradient(135deg, rgba(212, 175, 55, 0.05) 0%, rgba(201, 169, 97, 0.03) 100%)",
    borderRadius: "8px",
    border: "1px solid rgba(212, 175, 55, 0.1)",
  },
  img: {
    maxHeight: "280px",
    maxWidth: "100%",
    objectFit: "contain",
  },
  info: {
    textAlign: "center",
  },
  btn: {
    marginTop: "12px",
    border: "2px solid #d4af37",
    padding: "12px 24px",
    cursor: "pointer",
    letterSpacing: "1.5px",
    fontSize: "13px",
    fontWeight: "700",
    borderRadius: "4px",
    transition: "all 0.3s ease",
    textTransform: "uppercase",
    width: "100%",
  },
};

export default WatchCard;