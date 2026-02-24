import { useState } from "react";
import watch11 from "../../assets/images/watch11.png";
import watch5 from "../../assets/images/watch5.png";
import watch8 from "../../assets/images/watch8.png";

const FeaturedWatches = () => {
  const [selectedWatch, setSelectedWatch] = useState(0);

  const watches = [
    {
      id: 1,
      name: "Omega Speedmaster",
      price: "₹ 16,50,000",
      description: "The epitome of luxury and precision",
      image: watch5,
      features: ["Chronograph Movement", "Water Resistant 300m", "Sapphire Crystal"],
    },
    {
      id: 2,
      name: "Patek Philippe Nautilus",
      price: "₹ 32,50,000",
      description: "Performance redefined with elegance",
      image: watch8,
      features: ["Perpetual Automatic", "Integrated Bracelet", "Platinum Case"],
    },
    {
      id: 3,
      name: "Cartier Ballon Bleu",
      price: "₹ 15,50,000",
      description: "Timeless design for discerning tastes",
      image: watch11,
      features: ["Classic Design", "Limited Quantity", "White Gold Plating"],
    },
  ];

  return (
    <section style={{
      padding: "120px 80px",
      background: "linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 100%)",
    }}>
      <style>{`
        @keyframes slideInLeft {
          from {
            opacity: 0;
            transform: translateX(-50px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes slideInRight {
          from {
            opacity: 0;
            transform: translateX(50px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        .watch-showcase-image {
          animation: slideInLeft 0.8s ease-out;
        }

        .watch-showcase-info {
          animation: slideInRight 0.8s ease-out;
        }
      `}</style>

      <div style={{ textAlign: "center", marginBottom: "80px" }}>
        <h2 style={{
          color: "#d4af37",
          fontSize: "48px",
          letterSpacing: "3px",
          marginBottom: "20px",
          textTransform: "uppercase",
          fontWeight: "700",
        }}>
          Featured Timepieces
        </h2>
        <p style={{
          color: "#b0b0b0",
          fontSize: "16px",
          maxWidth: "600px",
          margin: "0 auto",
          lineHeight: "1.8",
        }}>
          Handpicked masterpieces that define luxury and precision
        </p>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "60px", alignItems: "center" }}>
        {/* Image Showcase */}
        <div className="watch-showcase-image">
          <div
            style={{
              background: "linear-gradient(135deg, rgba(42, 42, 42, 0.8) 0%, rgba(26, 26, 26, 0.8) 100%)",
              border: "2px solid rgba(212, 175, 55, 0.3)",
              borderRadius: "8px",
              padding: "40px",
              height: "450px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 20px 60px rgba(0, 0, 0, 0.5)",
            }}
          >
            <img
              src={watches[selectedWatch].image}
              alt={watches[selectedWatch].name}
              style={{
                maxHeight: "350px",
                maxWidth: "100%",
                objectFit: "contain",
              }}
            />
          </div>
        </div>

        {/* Info Section */}
        <div className="watch-showcase-info">
          <h3 style={{
            fontSize: "36px",
            color: "#d4af37",
            marginBottom: "15px",
            fontWeight: "700",
            letterSpacing: "2px",
          }}>
            {watches[selectedWatch].name}
          </h3>

          <p style={{
            fontSize: "16px",
            color: "#c9a961",
            marginBottom: "20px",
            fontStyle: "italic",
          }}>
            {watches[selectedWatch].description}
          </p>

          <p style={{
            fontSize: "28px",
            color: "#d4af37",
            marginBottom: "30px",
            fontWeight: "700",
          }}>
            {watches[selectedWatch].price}
          </p>

          <div style={{ marginBottom: "30px" }}>
            <h4 style={{
              color: "#d4af37",
              marginBottom: "15px",
              fontSize: "14px",
              letterSpacing: "2px",
              textTransform: "uppercase",
            }}>
              Key Features
            </h4>
            <ul style={{ display: "grid", gap: "10px" }}>
              {watches[selectedWatch].features.map((feature, idx) => (
                <li
                  key={idx}
                  style={{
                    color: "#b0b0b0",
                    fontSize: "14px",
                    paddingLeft: "20px",
                    position: "relative",
                  }}
                >
                  <span style={{
                    position: "absolute",
                    left: 0,
                    color: "#d4af37",
                  }}>
                    ✓
                  </span>
                  {feature}
                </li>
              ))}
            </ul>
          </div>

          <button
            className="lux-btn"
            style={{ marginBottom: "30px", width: "100%", padding: "14px" }}
          >
            Add to Cart
          </button>

          {/* Watch Selector */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "15px" }}>
            {watches.map((watch, idx) => (
              <button
                key={watch.id}
                onClick={() => setSelectedWatch(idx)}
                style={{
                  padding: "15px",
                  background: selectedWatch === idx
                    ? "linear-gradient(135deg, #d4af37 0%, #c9a961 100%)"
                    : "rgba(42, 42, 42, 0.6)",
                  border: selectedWatch === idx
                    ? "2px solid #d4af37"
                    : "2px solid rgba(212, 175, 55, 0.2)",
                  color: selectedWatch === idx ? "#0a0a0a" : "#b0b0b0",
                  borderRadius: "4px",
                  cursor: "pointer",
                  fontSize: "12px",
                  fontWeight: "600",
                  letterSpacing: "1px",
                  transition: "all 0.3s ease",
                  textTransform: "uppercase",
                }}
                onMouseEnter={(e) => {
                  if (selectedWatch !== idx) {
                    e.target.style.borderColor = "#d4af37";
                    e.target.style.color = "#d4af37";
                  }
                }}
                onMouseLeave={(e) => {
                  if (selectedWatch !== idx) {
                    e.target.style.borderColor = "rgba(212, 175, 55, 0.2)";
                    e.target.style.color = "#b0b0b0";
                  }
                }}
              >
                {watch.name}
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedWatches;