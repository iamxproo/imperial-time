import { useState } from "react";

const BrandStory = () => {
  const [activeTab, setActiveTab] = useState(0);

  const storyTabs = [
    {
      title: "Our Heritage",
      content: "IMPERIAL TIME represents precision, craftsmanship, and timeless luxury. With over 25 years of heritage, we've built a reputation for excellence.",
    },
    {
      title: "Our Craftsmanship",
      content: "Each timepiece is meticulously handcrafted by master watchmakers using only the finest materials and cutting-edge technology.",
    },
    {
      title: "Our Promise",
      content: "We promise to deliver not just watches, but lasting legacies. Every piece reflects our commitment to quality and your dreams of luxury.",
    },
  ];

  return (
    <section style={{
      padding: "120px 80px",
      background: "linear-gradient(135deg, #1a1a1a 0%, #0a0a0a 100%)",
    }}>
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        .tab-content {
          animation: fadeIn 0.5s ease-in;
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
          Our Legacy
        </h2>
        <p style={{
          color: "#b0b0b0",
          fontSize: "16px",
          maxWidth: "600px",
          margin: "0 auto",
          lineHeight: "1.8",
        }}>
          Discover the story behind IMPERIAL TIME and why we're trusted by luxury watch enthusiasts worldwide
        </p>
      </div>

      {/* Tab Navigation */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(3, 1fr)",
        gap: "20px",
        marginBottom: "60px",
      }}>
        {storyTabs.map((tab, idx) => (
          <button
            key={idx}
            onClick={() => setActiveTab(idx)}
            style={{
              padding: "20px",
              background: activeTab === idx
                ? "linear-gradient(135deg, rgba(212, 175, 55, 0.2) 0%, rgba(201, 169, 97, 0.2) 100%)"
                : "rgba(42, 42, 42, 0.5)",
              border: activeTab === idx
                ? "2px solid #d4af37"
                : "2px solid rgba(212, 175, 55, 0.2)",
              color: activeTab === idx ? "#d4af37" : "#b0b0b0",
              cursor: "pointer",
              borderRadius: "8px",
              fontSize: "14px",
              fontWeight: "600",
              letterSpacing: "1px",
              transition: "all 0.3s ease",
              textTransform: "uppercase",
            }}
            onMouseEnter={(e) => {
              if (activeTab !== idx) {
                e.target.style.borderColor = "#d4af37";
                e.target.style.color = "#d4af37";
              }
            }}
            onMouseLeave={(e) => {
              if (activeTab !== idx) {
                e.target.style.borderColor = "rgba(212, 175, 55, 0.2)";
                e.target.style.color = "#b0b0b0";
              }
            }}
          >
            {tab.title}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div
        className="tab-content"
        style={{
          background: "linear-gradient(135deg, rgba(42, 42, 42, 0.8) 0%, rgba(26, 26, 26, 0.8) 100%)",
          border: "2px solid rgba(212, 175, 55, 0.3)",
          borderRadius: "8px",
          padding: "60px 50px",
          textAlign: "center",
          boxShadow: "0 20px 60px rgba(0, 0, 0, 0.5)",
        }}
      >
        <p style={{
          fontSize: "18px",
          color: "#b0b0b0",
          lineHeight: "1.8",
          maxWidth: "800px",
          margin: "0 auto",
          marginBottom: "40px",
        }}>
          {storyTabs[activeTab].content}
        </p>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "30px", marginTop: "40px" }}>
          {[
            { icon: "⚙️", title: "Precision", desc: "Every detail matters" },
            { icon: "✨", title: "Excellence", desc: "Only the best materials" },
            { icon: "💎", title: "Legacy", desc: "Built to last generations" },
          ].map((item, idx) => (
            <div key={idx} style={{
              padding: "20px",
              background: "rgba(212, 175, 55, 0.05)",
              borderRadius: "8px",
              border: "1px solid rgba(212, 175, 55, 0.2)",
            }}>
              <div style={{ fontSize: "40px", marginBottom: "15px" }}>{item.icon}</div>
              <h4 style={{ color: "#d4af37", marginBottom: "8px", fontSize: "16px" }}>{item.title}</h4>
              <p style={{ color: "#b0b0b0", fontSize: "13px" }}>{item.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Testimonials */}
      <div style={{ marginTop: "80px" }}>
        <h3 style={{
          color: "#d4af37",
          fontSize: "32px",
          letterSpacing: "2px",
          textAlign: "center",
          marginBottom: "50px",
          textTransform: "uppercase",
        }}>
          What Our Customers Say
        </h3>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "30px" }}>
          {[
            { author: "Rajesh Kumar", quote: "The best luxury watch purchase I've ever made. Imperial Time is truly exceptional!" },
            { author: "Priya Sharma", quote: "Exceptional craftsmanship and timeless design. Highly recommended for collectors." },
            { author: "Vikram Patel", quote: "Outstanding quality and customer service. This is luxury redefined!" },
          ].map((testimonial, idx) => (
            <div
              key={idx}
              style={{
                background: "linear-gradient(135deg, rgba(42, 42, 42, 0.6) 0%, rgba(26, 26, 26, 0.6) 100%)",
                border: "1px solid rgba(212, 175, 55, 0.2)",
                borderRadius: "8px",
                padding: "30px",
              }}
            >
              <p style={{ color: "#c9a961", marginBottom: "20px", fontSize: "16px", fontStyle: "italic", lineHeight: "1.8" }}>
                "{testimonial.quote}"
              </p>
              <p style={{ color: "#d4af37", fontWeight: "600", fontSize: "14px" }}>
                — {testimonial.author}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BrandStory;