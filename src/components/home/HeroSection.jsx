import { Link } from "react-router-dom";

const HeroSection = () => {
  return (
    <section className="hero-section">
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
        
        @keyframes floatAnimation {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-20px);
          }
        }

        .hero-content {
          animation: fadeInUp 1s ease-out;
          z-index: 10;
          position: relative;
        }

        .hero-accent {
          animation: floatAnimation 3s ease-in-out infinite;
          position: absolute;
          font-size: 120px;
          opacity: 0.05;
          z-index: 1;
        }
      `}</style>

      <div className="hero-content">
        <div style={{ marginBottom: "30px", textAlign: "center" }}>
          <div style={{
            fontSize: "28px",
            color: "#d4af37",
            marginBottom: "15px",
            letterSpacing: "2px",
            fontWeight: "700",
            animation: "floatAnimation 4s ease-in-out infinite",
          }}>
            ॐ श्री गणेशाय नमः
          </div>
          <span style={{ 
            color: "#d4af37",
            fontSize: "16px",
            letterSpacing: "3px",
            textTransform: "uppercase",
            fontWeight: "600"
          }}>
            Welcome to Luxury
          </span>
        </div>
        
        <h1 style={{ marginBottom: "15px" }}>IMPERIAL TIME</h1>
        
        <p style={{ 
          fontSize: "24px",
          color: "#c9a961",
          letterSpacing: "2px",
          marginBottom: "40px",
          fontStyle: "italic",
          fontWeight: "300"
        }}>
          Where Time Becomes Legacy
        </p>

        <p style={{
          fontSize: "16px",
          color: "#b0b0b0",
          marginBottom: "40px",
          maxWidth: "600px",
          margin: "0 auto 40px",
          lineHeight: "1.8"
        }}>
          Discover exquisite timepieces crafted with precision and elegance. Every watch tells a story of heritage, innovation, and timeless sophistication.
        </p>

        <div style={{ display: "flex", gap: "20px", justifyContent: "center", flexWrap: "wrap" }}>
          <Link to="/collections">
            <button className="lux-btn">
              Explore Collection
            </button>
          </Link>
          <button 
            className="lux-btn"
            style={{
              background: "transparent",
              border: "2px solid #d4af37",
              color: "#d4af37"
            }}
            onMouseEnter={(e) => {
              e.target.style.background = "#d4af37";
              e.target.style.color = "#0a0a0a";
            }}
            onMouseLeave={(e) => {
              e.target.style.background = "transparent";
              e.target.style.color = "#d4af37";
            }}
          >
            Learn More
          </button>
        </div>

        <div style={{ marginTop: "80px", display: "flex", justifyContent: "center", gap: "60px" }}>
          {[
            { number: "50+", label: "Luxury Collections" },
            { number: "1000+", label: "Happy Customers" },
            { number: "25+", label: "Years Heritage" },
          ].map((stat, idx) => (
            <div key={idx} style={{ textAlign: "center" }}>
              <p style={{ fontSize: "32px", color: "#d4af37", fontWeight: "700", marginBottom: "8px" }}>
                {stat.number}
              </p>
              <p style={{ fontSize: "13px", color: "#b0b0b0", letterSpacing: "1px" }}>
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className="hero-accent">◆</div>
    </section>
  );
};

export default HeroSection;