const Reviews = () => {
  const reviews = [
    {
      id: 1,
      name: "Rajesh Kapoor",
      title: "CEO, Luxury Ventures",
      rating: 5,
      review: "Exceptional craftsmanship and outstanding customer service. My Rolex Submariner has exceeded all expectations. A truly premium experience.",
      image: "👨‍💼",
    },
    {
      id: 2,
      name: "Priya Sharma",
      title: "Fashion Influencer",
      rating: 5,
      review: "The elegance and precision of Imperial Time watches is unmatched. Every piece is a work of art. Highly recommend for watch enthusiasts!",
      image: "👩‍🎨",
    },
    {
      id: 3,
      name: "Arun Patel",
      title: "Entrepreneur",
      rating: 5,
      review: "Bought multiple pieces from Imperial Time. The quality, authenticity, and delivery service are world-class. Truly premium!",
      image: "👨‍💼",
    },
    {
      id: 4,
      name: "Neha Verma",
      title: "Luxury Collector",
      rating: 5,
      review: "Impeccable attention to detail. Every interaction with Imperial Time feels like a VIP experience. Worth every rupee!",
      image: "👩‍💼",
    },
    {
      id: 5,
      name: "Vikram Singh",
      title: "Watch Collector",
      rating: 5,
      review: "The most reliable source for authentic luxury watches. Their knowledge and passion for horology is evident in every transaction.",
      image: "👨‍💻",
    },
    {
      id: 6,
      name: "Ananya Gupta",
      title: "Business Executive",
      rating: 5,
      review: "From selection to delivery, everything was perfect. My Daytona is a masterpiece. Imperial Time truly redefines luxury!",
      image: "👩‍💼",
    },
  ];

  const stats = [
    { label: "Happy Customers", value: "1000+" },
    { label: "5-Star Reviews", value: "950+" },
    { label: "Years of Excellence", value: "25+" },
    { label: "Authentic Pieces", value: "500+" },
  ];

  return (
    <div style={{ paddingTop: "40px" }}>
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

        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateX(-20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        .review-card {
          animation: fadeInUp 0.6s ease-out;
        }

        .stat-box {
          animation: slideIn 0.6s ease-out;
        }

        .star {
          color: #d4af37;
          font-size: 18px;
          letter-spacing: 2px;
        }
      `}</style>

      {/* Hero Section */}
      <section style={{
        padding: "100px 80px",
        background: "linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 100%)",
        textAlign: "center",
        borderBottom: "1px solid rgba(212, 175, 55, 0.2)",
      }}>
        <div style={{ marginBottom: "30px" }}>
          <span style={{
            color: "#d4af37",
            fontSize: "14px",
            letterSpacing: "3px",
            textTransform: "uppercase",
            fontWeight: "600",
          }}>
            ✨ CUSTOMER TESTIMONIALS ✨
          </span>
        </div>
        <h1 style={{
          fontSize: "52px",
          fontWeight: "700",
          letterSpacing: "3px",
          marginBottom: "20px",
          background: "linear-gradient(135deg, #d4af37 0%, #ffffff 50%, #c9a961 100%)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundClip: "text",
          textTransform: "uppercase",
        }}>
          What Our Clients Say
        </h1>
        <p style={{
          color: "#b0b0b0",
          fontSize: "16px",
          maxWidth: "700px",
          margin: "0 auto",
          lineHeight: "1.8",
        }}>
          Thousands of satisfied customers worldwide trust Imperial Time for their most precious timepieces
        </p>
      </section>

      {/* Stats Section */}
      <section style={{
        padding: "80px",
        background: "linear-gradient(135deg, rgba(212, 175, 55, 0.08) 0%, rgba(201, 169, 97, 0.04) 100%)",
        borderBottom: "1px solid rgba(212, 175, 55, 0.15)",
      }}>
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
          gap: "40px",
        }}>
          {stats.map((stat, idx) => (
            <div
              key={idx}
              className="stat-box"
              style={{
                background: "linear-gradient(135deg, rgba(42, 42, 42, 0.8) 0%, rgba(26, 26, 26, 0.8) 100%)",
                border: "1px solid rgba(212, 175, 55, 0.2)",
                borderRadius: "8px",
                padding: "40px",
                textAlign: "center",
                transition: "all 0.3s ease",
                cursor: "pointer",
                animationDelay: `${idx * 0.1}s`,
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "#d4af37";
                e.currentTarget.style.boxShadow = "0 10px 30px rgba(212, 175, 55, 0.15)";
                e.currentTarget.style.transform = "translateY(-5px)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "rgba(212, 175, 55, 0.2)";
                e.currentTarget.style.boxShadow = "none";
                e.currentTarget.style.transform = "translateY(0)";
              }}
            >
              <div style={{
                fontSize: "36px",
                fontWeight: "700",
                color: "#d4af37",
                marginBottom: "10px",
              }}>
                {stat.value}
              </div>
              <div style={{
                fontSize: "14px",
                color: "#b0b0b0",
                letterSpacing: "1px",
                textTransform: "uppercase",
              }}>
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Reviews Grid */}
      <section style={{
        padding: "100px 80px",
        background: "linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 100%)",
      }}>
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(340px, 1fr))",
          gap: "40px",
        }}>
          {reviews.map((review, idx) => (
            <div
              key={review.id}
              className="review-card"
              style={{
                background: "linear-gradient(135deg, rgba(42, 42, 42, 0.8) 0%, rgba(26, 26, 26, 0.8) 100%)",
                border: "2px solid rgba(212, 175, 55, 0.2)",
                borderRadius: "12px",
                padding: "40px",
                transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
                cursor: "pointer",
                animationDelay: `${idx * 0.08}s`,
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "#d4af37";
                e.currentTarget.style.boxShadow = "0 20px 60px rgba(212, 175, 55, 0.25)";
                e.currentTarget.style.transform = "translateY(-8px)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "rgba(212, 175, 55, 0.2)";
                e.currentTarget.style.boxShadow = "none";
                e.currentTarget.style.transform = "translateY(0)";
              }}
            >
              {/* Rating Stars */}
              <div style={{ marginBottom: "20px" }}>
                <div className="star">
                  {"★".repeat(review.rating)}
                </div>
              </div>

              {/* Review Text */}
              <p style={{
                color: "#b0b0b0",
                fontSize: "15px",
                lineHeight: "1.8",
                marginBottom: "25px",
                fontStyle: "italic",
                minHeight: "80px",
              }}>
                "{review.review}"
              </p>

              {/* Divider */}
              <div style={{
                height: "1px",
                background: "linear-gradient(90deg, transparent 0%, rgba(212, 175, 55, 0.3) 50%, transparent 100%)",
                marginBottom: "25px",
              }} />

              {/* Author Info */}
              <div style={{ display: "flex", alignItems: "center", gap: "15px" }}>
                <div style={{
                  fontSize: "40px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: "50px",
                  height: "50px",
                  background: "linear-gradient(135deg, rgba(212, 175, 55, 0.15) 0%, rgba(201, 169, 97, 0.1) 100%)",
                  borderRadius: "8px",
                  border: "1px solid rgba(212, 175, 55, 0.2)",
                }}>
                  {review.image}
                </div>
                <div>
                  <h4 style={{
                    color: "#d4af37",
                    fontSize: "15px",
                    fontWeight: "700",
                    marginBottom: "4px",
                    letterSpacing: "0.5px",
                  }}>
                    {review.name}
                  </h4>
                  <p style={{
                    color: "#888",
                    fontSize: "12px",
                    letterSpacing: "0.5px",
                    textTransform: "uppercase",
                  }}>
                    {review.title}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section style={{
        padding: "80px",
        background: "linear-gradient(135deg, rgba(212, 175, 55, 0.08) 0%, rgba(201, 169, 97, 0.04) 100%)",
        border: "1px solid rgba(212, 175, 55, 0.15)",
        borderRadius: "12px",
        textAlign: "center",
        margin: "80px 80px",
      }}>
        <h2 style={{
          color: "#d4af37",
          fontSize: "36px",
          fontWeight: "700",
          marginBottom: "15px",
          letterSpacing: "2px",
          textTransform: "uppercase",
        }}>
          Join Our Community
        </h2>
        <p style={{
          color: "#b0b0b0",
          fontSize: "16px",
          marginBottom: "30px",
          maxWidth: "600px",
          margin: "0 auto 30px",
          lineHeight: "1.8",
        }}>
          Experience the Imperial Time difference. Join thousands of satisfied customers who have discovered luxury timepieces
        </p>
        <button style={{
          background: "linear-gradient(135deg, #d4af37 0%, #c9a961 100%)",
          border: "none",
          color: "#0a0a0a",
          padding: "16px 50px",
          fontSize: "14px",
          fontWeight: "700",
          letterSpacing: "2px",
          borderRadius: "4px",
          cursor: "pointer",
          textTransform: "uppercase",
          transition: "all 0.3s ease",
          boxShadow: "0 10px 30px rgba(212, 175, 55, 0.25)",
        }}
        onMouseEnter={(e) => {
          e.target.style.transform = "translateY(-3px)";
          e.target.style.boxShadow = "0 15px 40px rgba(212, 175, 55, 0.35)";
        }}
        onMouseLeave={(e) => {
          e.target.style.transform = "translateY(0)";
          e.target.style.boxShadow = "0 10px 30px rgba(212, 175, 55, 0.25)";
        }}>
          Explore Collections
        </button>
      </section>
    </div>
  );
};

export default Reviews;
