import { useState } from "react";

const CollectionSection = () => {
  const [hoveredCard, setHoveredCard] = useState(null);

  const collections = [
    {
      id: 1,
      name: "Classic",
      description: "Timeless elegance for every occasion",
      icon: "⌚",
    },
    {
      id: 2,
      name: "Sport",
      description: "Performance meets precision",
      icon: "⚡",
    },
    {
      id: 3,
      name: "Luxury",
      description: "Exclusive and extraordinary pieces",
      icon: "👑",
    },
    {
      id: 4,
      name: "Limited Edition",
      description: "Rare collectibles for connoisseurs",
      icon: "💎",
    },
  ];

  return (
    <section style={{ 
      padding: "120px 80px",
      background: "linear-gradient(135deg, rgba(10, 10, 10, 0.5) 0%, rgba(26, 26, 26, 0.5) 100%)",
    }}>
      <style>{`
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .collection-card {
          animation: slideUp 0.6s ease-out;
        }
      `}</style>

      <div style={{ textAlign: "center", marginBottom: "80px" }}>
        <h2 style={{ 
          color: "#d4af37",
          fontSize: "48px",
          letterSpacing: "3px",
          marginBottom: "20px",
          textTransform: "uppercase",
          fontWeight: "700"
        }}>
          Our Collections
        </h2>
        <p style={{ 
          color: "#b0b0b0",
          fontSize: "16px",
          maxWidth: "600px",
          margin: "0 auto",
          lineHeight: "1.8"
        }}>
          Explore our curated selection of premium timepieces, each crafted to perfection
        </p>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "30px" }}>
        {collections.map((collection, idx) => (
          <div
            key={collection.id}
            className="collection-card"
            style={{
              height: "300px",
              background: "linear-gradient(135deg, rgba(42, 42, 42, 0.8) 0%, rgba(26, 26, 26, 0.8) 100%)",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              letterSpacing: "2px",
              border: "2px solid rgba(212, 175, 55, 0.3)",
              cursor: "pointer",
              transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
              borderRadius: "8px",
              position: "relative",
              overflow: "hidden",
              boxShadow: "0 10px 30px rgba(0, 0, 0, 0.5)",
              animation: `slideUp 0.6s ease-out ${idx * 0.1}s backwards`,
            }}
            onMouseEnter={() => setHoveredCard(collection.id)}
            onMouseLeave={() => setHoveredCard(null)}
          >
            <div
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: "radial-gradient(circle, rgba(212, 175, 55, 0.1) 0%, transparent 70%)",
                opacity: hoveredCard === collection.id ? 1 : 0,
                transition: "opacity 0.4s ease",
              }}
            />

            <div
              style={{
                position: "relative",
                zIndex: 2,
                textAlign: "center",
              }}
            >
              <div
                style={{
                  fontSize: "60px",
                  marginBottom: "20px",
                  transform: hoveredCard === collection.id ? "scale(1.2)" : "scale(1)",
                  transition: "transform 0.4s ease",
                }}
              >
                {collection.icon}
              </div>

              <h3
                style={{
                  color: "#d4af37",
                  fontSize: "22px",
                  marginBottom: "12px",
                  fontWeight: "600",
                  letterSpacing: "2px",
                }}
              >
                {collection.name}
              </h3>

              <p
                style={{
                  color: "#b0b0b0",
                  fontSize: "13px",
                  opacity: hoveredCard === collection.id ? 1 : 0.6,
                  transition: "opacity 0.4s ease",
                  minHeight: "30px",
                }}
              >
                {collection.description}
              </p>
            </div>

            {hoveredCard === collection.id && (
              <div
                style={{
                  position: "absolute",
                  bottom: "20px",
                  padding: "8px 16px",
                  background: "#d4af37",
                  color: "#0a0a0a",
                  borderRadius: "4px",
                  fontSize: "12px",
                  fontWeight: "600",
                  letterSpacing: "1px",
                  cursor: "pointer",
                  animation: "fadeIn 0.3s ease",
                }}
              >
                EXPLORE
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};

export default CollectionSection;