const PromotionalSection = () => {
  const features = [
    {
      icon: "👑",
      title: "Luxury Craftsmanship",
      description: "Each timepiece is meticulously crafted with premium materials",
    },
    {
      icon: "🛡️",
      title: "Lifetime Warranty",
      description: "Complete protection and support for your precious investment",
    },
    {
      icon: "🚚",
      title: "Free Delivery",
      description: "Complimentary premium shipping worldwide with insurance",
    },
    {
      icon: "💎",
      title: "Exclusive Access",
      description: "VIP early access to limited edition collections",
    },
  ];

  return (
    <section style={{
      padding: "100px 80px",
      background: "linear-gradient(180deg, #0a0a0a 0%, #1a1a1a 50%, #0f0f0f 100%)",
      borderTop: "1px solid rgba(212, 175, 55, 0.15)",
    }}>
      <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .promo-card {
          animation: fadeInUp 0.6s ease-out;
        }

        .promo-card:nth-child(1) { animation-delay: 0.1s; }
        .promo-card:nth-child(2) { animation-delay: 0.2s; }
        .promo-card:nth-child(3) { animation-delay: 0.3s; }
        .promo-card:nth-child(4) { animation-delay: 0.4s; }

        .promo-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 20px 50px rgba(212, 175, 55, 0.2) !important;
        }
      `}</style>

      <div style={{ textAlign: "center", marginBottom: "60px" }}>
        <h2 style={{
          color: "#d4af37",
          fontSize: "44px",
          letterSpacing: "3px",
          marginBottom: "20px",
          textTransform: "uppercase",
          fontWeight: "700",
        }}>
          Why Choose Imperial Time
        </h2>
        <p style={{
          color: "#b0b0b0",
          fontSize: "16px",
          maxWidth: "700px",
          margin: "0 auto",
          lineHeight: "1.8",
        }}>
          Experience unparalleled luxury and service with every timepiece
        </p>
      </div>

      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
        gap: "30px",
        marginBottom: "60px",
      }}>
        {features.map((feature, idx) => (
          <div
            key={idx}
            className="promo-card"
            style={{
              background: "linear-gradient(135deg, rgba(212, 175, 55, 0.05) 0%, rgba(201, 169, 97, 0.03) 100%)",
              border: "1px solid rgba(212, 175, 55, 0.15)",
              borderRadius: "8px",
              padding: "35px 25px",
              textAlign: "center",
              transition: "all 0.3s ease",
              cursor: "pointer",
              boxShadow: "0 8px 24px rgba(0, 0, 0, 0.2)",
            }}
          >
            <div style={{
              fontSize: "48px",
              marginBottom: "15px",
            }}>
              {feature.icon}
            </div>
            <h3 style={{
              color: "#d4af37",
              fontSize: "18px",
              fontWeight: "700",
              marginBottom: "10px",
              letterSpacing: "1px",
              textTransform: "uppercase",
            }}>
              {feature.title}
            </h3>
            <p style={{
              color: "#b0b0b0",
              fontSize: "14px",
              lineHeight: "1.7",
            }}>
              {feature.description}
            </p>
          </div>
        ))}
      </div>

      {/* CTA Section */}
      <div style={{
        background: "linear-gradient(135deg, rgba(212, 175, 55, 0.1) 0%, rgba(201, 169, 97, 0.05) 100%)",
        border: "2px solid rgba(212, 175, 55, 0.25)",
        borderRadius: "12px",
        padding: "50px",
        textAlign: "center",
      }}>
        <h3 style={{
          color: "#d4af37",
          fontSize: "32px",
          fontWeight: "700",
          marginBottom: "15px",
          letterSpacing: "2px",
        }}>
          Ready to Own Timeless Luxury?
        </h3>
        <p style={{
          color: "#b0b0b0",
          fontSize: "16px",
          marginBottom: "30px",
          maxWidth: "600px",
          margin: "0 auto 30px",
          lineHeight: "1.8",
        }}>
          Explore our exquisite collection and discover the perfect timepiece that reflects your sophistication
        </p>
        <button
          style={{
            background: "linear-gradient(135deg, #d4af37 0%, #c9a961 100%)",
            border: "none",
            color: "#0a0a0a",
            padding: "14px 40px",
            fontSize: "14px",
            fontWeight: "700",
            letterSpacing: "2px",
            borderRadius: "4px",
            cursor: "pointer",
            transition: "all 0.3s ease",
            textTransform: "uppercase",
            boxShadow: "0 8px 25px rgba(212, 175, 55, 0.3)",
          }}
          onMouseEnter={(e) => {
            e.target.style.transform = "translateY(-3px)";
            e.target.style.boxShadow = "0 12px 35px rgba(212, 175, 55, 0.4)";
          }}
          onMouseLeave={(e) => {
            e.target.style.transform = "translateY(0)";
            e.target.style.boxShadow = "0 8px 25px rgba(212, 175, 55, 0.3)";
          }}
        >
          Explore Collections
        </button>
      </div>
    </section>
  );
};

export default PromotionalSection;
