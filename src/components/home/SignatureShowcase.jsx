import { Link } from "react-router-dom";
import watch14 from "../../assets/images/watch14.png";
import watch15 from "../../assets/images/watch15.png";
import watch16 from "../../assets/images/watch16.png";
import watch17 from "../../assets/images/watch17.png";
import watch18 from "../../assets/images/watch18.png";
import watch19 from "../../assets/images/watch19.png";

const SignatureShowcase = () => {
  const highlights = [
    { value: "4.9/5", label: "Client Rating", icon: "⭐" },
    { value: "98%", label: "On-Time Delivery", icon: "🚀" },
    { value: "16+", label: "Premium Models", icon: "⌚" },
    { value: "24/7", label: "Luxury Support", icon: "💎" },
  ];

  const gallery = [
    { img: watch14, name: "Zenith Chronomaster", price: "₹31,000", tag: "Bestseller" },
    { img: watch15, name: "Breitling Navitimer", price: "₹36,500", tag: "New Arrival" },
    { img: watch16, name: "Grand Seiko", price: "₹43,000", tag: "Limited" },
    { img: watch17, name: "Signature I", price: "₹38,000", tag: "Exclusive" },
    { img: watch18, name: "Signature II", price: "₹42,000", tag: "Featured" },
    { img: watch19, name: "Signature III", price: "₹45,000", tag: "Premium" },
  ];

  return (
    <section style={{
      padding: "100px 80px",
      background: "linear-gradient(180deg, #0a0a0a 0%, #111 50%, #0a0a0a 100%)",
      borderTop: "1px solid rgba(212,175,55,0.12)",
      borderBottom: "1px solid rgba(212,175,55,0.12)",
    }}>
      <style>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(28px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .sig-card { animation: fadeUp 0.55s ease-out both; position: relative; overflow: hidden; border-radius: 14px; cursor: pointer; }
        .sig-card img { transition: transform 0.5s ease; }
        .sig-card:hover img { transform: scale(1.07); }
        .sig-card .overlay { 
          position: absolute; bottom: 0; left: 0; right: 0;
          background: linear-gradient(0deg, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.4) 60%, transparent 100%);
          padding: 20px 18px 16px;
          transform: translateY(6px);
          transition: transform 0.3s ease;
        }
        .sig-card:hover .overlay { transform: translateY(0); }
        .sig-card .tag-badge {
          position: absolute; top: 14px; right: 14px;
          background: linear-gradient(135deg, #d4af37, #c9a961);
          color: #0a0a0a; padding: 4px 12px; border-radius: 20px;
          font-size: 10px; font-weight: 800; letter-spacing: 1px; text-transform: uppercase;
        }
        .stat-card {
          background: rgba(212,175,55,0.05);
          border: 1px solid rgba(212,175,55,0.2);
          border-radius: 12px;
          padding: 28px 20px;
          text-align: center;
          transition: all 0.3s ease;
          cursor: default;
        }
        .stat-card:hover {
          background: rgba(212,175,55,0.1);
          border-color: rgba(212,175,55,0.5);
          transform: translateY(-4px);
          box-shadow: 0 12px 30px rgba(212,175,55,0.15);
        }
      `}</style>

      {/* Header */}
      <div style={{ textAlign: "center", marginBottom: "64px" }}>
        <p style={{ color: "#c9a961", letterSpacing: "3px", textTransform: "uppercase", fontSize: "12px", fontWeight: "700", marginBottom: "14px" }}>
          ✦ &nbsp;Signature Series&nbsp; ✦
        </p>
        <h2 style={{ fontSize: "48px", color: "#fff", letterSpacing: "2px", textTransform: "uppercase", marginBottom: "16px", fontWeight: "800" }}>
          Curated <span style={{ color: "#d4af37" }}>Luxury</span> Showcase
        </h2>
        <p style={{ color: "#888", fontSize: "16px", maxWidth: "600px", margin: "0 auto", lineHeight: "1.8" }}>
          Handpicked masterpieces — where horology meets artistry
        </p>
        <div style={{ width: "60px", height: "2px", background: "linear-gradient(90deg,transparent,#d4af37,transparent)", margin: "24px auto 0" }} />
      </div>

      {/* Asymmetric Magazine Grid */}
      <div style={{ display: "grid", gridTemplateColumns: "1.4fr 1fr 1fr", gridTemplateRows: "320px 320px", gap: "16px", marginBottom: "60px" }}>

        {/* Big card — spans 2 rows */}
        <div className="sig-card" style={{ gridRow: "1 / 3", border: "1px solid rgba(212,175,55,0.25)", animationDelay: "0s" }}>
          <img src={gallery[0].img} alt={gallery[0].name} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
          <div className="tag-badge">{gallery[0].tag}</div>
          <div className="overlay">
            <p style={{ color: "#d4af37", fontSize: "11px", letterSpacing: "2px", textTransform: "uppercase", marginBottom: "4px" }}>Featured Piece</p>
            <p style={{ color: "#fff", fontSize: "18px", fontWeight: "700", marginBottom: "4px" }}>{gallery[0].name}</p>
            <p style={{ color: "#c9a961", fontSize: "16px", fontWeight: "600" }}>{gallery[0].price}</p>
          </div>
        </div>

        {/* Top middle */}
        <div className="sig-card" style={{ border: "1px solid rgba(212,175,55,0.2)", animationDelay: "0.08s" }}>
          <img src={gallery[1].img} alt={gallery[1].name} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
          <div className="tag-badge">{gallery[1].tag}</div>
          <div className="overlay">
            <p style={{ color: "#fff", fontSize: "15px", fontWeight: "700", marginBottom: "2px" }}>{gallery[1].name}</p>
            <p style={{ color: "#c9a961", fontSize: "13px" }}>{gallery[1].price}</p>
          </div>
        </div>

        {/* Top right */}
        <div className="sig-card" style={{ border: "1px solid rgba(212,175,55,0.2)", animationDelay: "0.16s" }}>
          <img src={gallery[2].img} alt={gallery[2].name} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
          <div className="tag-badge">{gallery[2].tag}</div>
          <div className="overlay">
            <p style={{ color: "#fff", fontSize: "15px", fontWeight: "700", marginBottom: "2px" }}>{gallery[2].name}</p>
            <p style={{ color: "#c9a961", fontSize: "13px" }}>{gallery[2].price}</p>
          </div>
        </div>

        {/* Bottom middle */}
        <div className="sig-card" style={{ border: "1px solid rgba(212,175,55,0.2)", animationDelay: "0.24s" }}>
          <img src={gallery[3].img} alt={gallery[3].name} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
          <div className="tag-badge">{gallery[3].tag}</div>
          <div className="overlay">
            <p style={{ color: "#fff", fontSize: "15px", fontWeight: "700", marginBottom: "2px" }}>{gallery[3].name}</p>
            <p style={{ color: "#c9a961", fontSize: "13px" }}>{gallery[3].price}</p>
          </div>
        </div>

        {/* Bottom right */}
        <div className="sig-card" style={{ border: "1px solid rgba(212,175,55,0.2)", animationDelay: "0.32s" }}>
          <img src={gallery[4].img} alt={gallery[4].name} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
          <div className="tag-badge">{gallery[4].tag}</div>
          <div className="overlay">
            <p style={{ color: "#fff", fontSize: "15px", fontWeight: "700", marginBottom: "2px" }}>{gallery[4].name}</p>
            <p style={{ color: "#c9a961", fontSize: "13px" }}>{gallery[4].price}</p>
          </div>
        </div>
      </div>

      {/* Stats Row */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: "16px", marginBottom: "48px" }}>
        {highlights.map((item, idx) => (
          <div key={idx} className="stat-card" style={{ animationDelay: `${0.4 + idx * 0.08}s` }}>
            <div style={{ fontSize: "28px", marginBottom: "10px" }}>{item.icon}</div>
            <p style={{ color: "#d4af37", fontSize: "32px", fontWeight: "800", marginBottom: "6px", lineHeight: 1 }}>{item.value}</p>
            <p style={{ color: "#888", fontSize: "11px", letterSpacing: "1.5px", textTransform: "uppercase" }}>{item.label}</p>
          </div>
        ))}
      </div>

      {/* CTA */}
      <div style={{ textAlign: "center" }}>
        <Link to="/collections">
          <button
            style={{
              background: "linear-gradient(135deg,#d4af37,#c9a961)",
              border: "none", color: "#0a0a0a",
              padding: "15px 44px", borderRadius: "4px",
              fontWeight: "800", letterSpacing: "2px",
              cursor: "pointer", textTransform: "uppercase",
              fontSize: "13px", transition: "all 0.3s ease",
              boxShadow: "0 4px 20px rgba(212,175,55,0.3)",
            }}
            onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-3px)"; e.currentTarget.style.boxShadow = "0 12px 32px rgba(212,175,55,0.45)"; }}
            onMouseLeave={(e) => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "0 4px 20px rgba(212,175,55,0.3)"; }}
          >
            Explore Full Collection →
          </button>
        </Link>
      </div>
    </section>
  );
};

export default SignatureShowcase;
