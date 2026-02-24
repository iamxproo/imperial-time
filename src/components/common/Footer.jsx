import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer style={styles.footer}>
      <style>{`
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .footer-section {
          animation: slideUp 0.6s ease-out;
        }

        .footer-link {
          transition: all 0.3s ease;
          cursor: pointer;
          text-decoration: none;
        }

        .footer-link:hover {
          color: #d4af37 !important;
          text-decoration: underline;
        }
      `}</style>

      <div style={{ maxWidth: "1200px", width: "100%", margin: "0 auto" }}>
        {/* Main Footer Grid */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
          gap: "50px",
          padding: "60px 80px 40px",
          borderBottom: "1px solid rgba(212, 175, 55, 0.15)",
        }}>
          {/* Brand Section */}
          <div className="footer-section" style={{ animationDelay: "0s" }}>
            <h3 style={{
              color: "#d4af37",
              fontSize: "18px",
              fontWeight: "700",
              marginBottom: "15px",
              letterSpacing: "2px",
              textTransform: "uppercase",
            }}>
              IMPERIAL TIME
            </h3>
            <p style={{
              color: "#b0b0b0",
              fontSize: "13px",
              lineHeight: "1.8",
              marginBottom: "10px",
            }}>
              Luxury Watch House
            </p>
            <p style={{
              color: "#888",
              fontSize: "12px",
              lineHeight: "1.8",
            }}>
              Discover exquisite timepieces crafted with precision and elegance.
            </p>
          </div>

          {/* Quick Links */}
          <div className="footer-section" style={{ animationDelay: "0.1s" }}>
            <h4 style={{
              color: "#d4af37",
              fontSize: "14px",
              fontWeight: "700",
              marginBottom: "15px",
              letterSpacing: "1px",
              textTransform: "uppercase",
            }}>
              Quick Links
            </h4>
            <ul style={{ listStyle: "none", gap: "10px", display: "flex", flexDirection: "column" }}>
              <li>
                <Link to="/collections" className="footer-link" style={{ color: "#b0b0b0", fontSize: "13px" }}>
                  → Collections
                </Link>
              </li>
              <li>
                <Link to="/reviews" className="footer-link" style={{ color: "#b0b0b0", fontSize: "13px" }}>
                  → Reviews
                </Link>
              </li>
              <li>
                <a href="#about" className="footer-link" style={{ color: "#b0b0b0", fontSize: "13px" }}>
                  → About Us
                </a>
              </li>
              <li>
                <a href="mailto:samarthkarale21@gmail.com" className="footer-link" style={{ color: "#b0b0b0", fontSize: "13px" }}>
                  → Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Customer Service */}
          <div className="footer-section" style={{ animationDelay: "0.2s" }}>
            <h4 style={{
              color: "#d4af37",
              fontSize: "14px",
              fontWeight: "700",
              marginBottom: "15px",
              letterSpacing: "1px",
              textTransform: "uppercase",
            }}>
              Customer Service
            </h4>
            <ul style={{ listStyle: "none", gap: "10px", display: "flex", flexDirection: "column" }}>
              <li>
                <a href="#shipping" className="footer-link" style={{ color: "#b0b0b0", fontSize: "13px" }}>
                  → Shipping & Returns
                </a>
              </li>
              <li>
                <a href="#warranty" className="footer-link" style={{ color: "#b0b0b0", fontSize: "13px" }}>
                  → Warranty
                </a>
              </li>
              <li>
                <a href="#faq" className="footer-link" style={{ color: "#b0b0b0", fontSize: "13px" }}>
                  → FAQ
                </a>
              </li>
              <li>
                <a href="tel:9022983993" className="footer-link" style={{ color: "#b0b0b0", fontSize: "13px" }}>
                  → Support
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="footer-section" style={{ animationDelay: "0.3s" }}>
            <h4 style={{
              color: "#d4af37",
              fontSize: "14px",
              fontWeight: "700",
              marginBottom: "15px",
              letterSpacing: "1px",
              textTransform: "uppercase",
            }}>
              Contact Us
            </h4>
            <ul style={{ listStyle: "none", gap: "12px", display: "flex", flexDirection: "column" }}>
              <li style={{ color: "#b0b0b0", fontSize: "13px" }}>
                📧 <a href="mailto:samarthkarale21@gmail.com" style={{ color: "#d4af37", textDecoration: "none" }}>samarthkarale21@gmail.com</a>
              </li>
              <li style={{ color: "#b0b0b0", fontSize: "13px" }}>
                📱 <a href="tel:9022983993" style={{ color: "#d4af37", textDecoration: "none" }}>+91 9022983993</a>
              </li>
              <li style={{ color: "#b0b0b0", fontSize: "13px" }}>
                🕐 24/7 Customer Support
              </li>
            </ul>
          </div>
        </div>

        {/* Developer Credits */}
        <div style={{
          background: "linear-gradient(135deg, rgba(212, 175, 55, 0.05) 0%, rgba(201, 169, 97, 0.02) 100%)",
          padding: "30px 80px",
          borderBottom: "1px solid rgba(212, 175, 55, 0.1)",
        }}>
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: "30px",
            alignItems: "center",
          }}>
            <div style={{
              background: "linear-gradient(135deg, rgba(42, 42, 42, 0.8) 0%, rgba(26, 26, 26, 0.8) 100%)",
              border: "1px solid rgba(212, 175, 55, 0.2)",
              borderRadius: "8px",
              padding: "20px",
              transition: "all 0.3s ease",
              cursor: "pointer",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = "#d4af37";
              e.currentTarget.style.boxShadow = "0 8px 20px rgba(212, 175, 55, 0.15)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = "rgba(212, 175, 55, 0.2)";
              e.currentTarget.style.boxShadow = "none";
            }}>
              <div style={{
                color: "#d4af37",
                fontSize: "12px",
                fontWeight: "700",
                letterSpacing: "1px",
                textTransform: "uppercase",
                marginBottom: "8px",
              }}>
                🚀 Project Development
              </div>
              <div style={{
                color: "#ffffff",
                fontSize: "14px",
                fontWeight: "700",
                marginBottom: "5px",
              }}>
                Samarth Karale
              </div>
              <div style={{
                color: "#b0b0b0",
                fontSize: "12px",
              }}>
                Full Stack Developer
              </div>
            </div>

            <div style={{
              background: "linear-gradient(135deg, rgba(42, 42, 42, 0.8) 0%, rgba(26, 26, 26, 0.8) 100%)",
              border: "1px solid rgba(212, 175, 55, 0.2)",
              borderRadius: "8px",
              padding: "20px",
              transition: "all 0.3s ease",
              cursor: "pointer",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = "#d4af37";
              e.currentTarget.style.boxShadow = "0 8px 20px rgba(212, 175, 55, 0.15)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = "rgba(212, 175, 55, 0.2)";
              e.currentTarget.style.boxShadow = "none";
            }}>
              <div style={{
                color: "#d4af37",
                fontSize: "12px",
                fontWeight: "700",
                letterSpacing: "1px",
                textTransform: "uppercase",
                marginBottom: "8px",
              }}>
                📧 Email
              </div>
              <a href="mailto:samarthkarale21@gmail.com" style={{
                color: "#ffffff",
                fontSize: "13px",
                fontWeight: "600",
                textDecoration: "none",
                display: "block",
                marginBottom: "5px",
              }}>
                samarthkarale21@gmail.com
              </a>
              <div style={{
                color: "#b0b0b0",
                fontSize: "11px",
              }}>
                Get in touch for inquiries
              </div>
            </div>

            <div style={{
              background: "linear-gradient(135deg, rgba(42, 42, 42, 0.8) 0%, rgba(26, 26, 26, 0.8) 100%)",
              border: "1px solid rgba(212, 175, 55, 0.2)",
              borderRadius: "8px",
              padding: "20px",
              transition: "all 0.3s ease",
              cursor: "pointer",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = "#d4af37";
              e.currentTarget.style.boxShadow = "0 8px 20px rgba(212, 175, 55, 0.15)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = "rgba(212, 175, 55, 0.2)";
              e.currentTarget.style.boxShadow = "none";
            }}>
              <div style={{
                color: "#d4af37",
                fontSize: "12px",
                fontWeight: "700",
                letterSpacing: "1px",
                textTransform: "uppercase",
                marginBottom: "8px",
              }}>
                📱 Mobile
              </div>
              <a href="tel:9022983993" style={{
                color: "#ffffff",
                fontSize: "14px",
                fontWeight: "700",
                textDecoration: "none",
                display: "block",
                marginBottom: "5px",
              }}>
                +91 9022983993
              </a>
              <div style={{
                color: "#b0b0b0",
                fontSize: "11px",
              }}>
                Available for consultation
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Footer */}
        <div style={{
          padding: "30px 80px",
          textAlign: "center",
          borderTop: "1px solid rgba(212, 175, 55, 0.1)",
        }}>
          <p style={{
            color: "#888",
            fontSize: "12px",
            letterSpacing: "1px",
            marginBottom: "10px",
          }}>
            © 2026 IMPERIAL TIME. All Rights Reserved. | Designed & Developed by <span style={{ color: "#d4af37", fontWeight: "700" }}>Samarth Karale</span>
          </p>
          <p style={{
            color: "#666",
            fontSize: "11px",
            letterSpacing: "0.5px",
          }}>
            Luxury Watch House | Premium Timepieces | Crafted Excellence
          </p>
        </div>
      </div>
    </footer>
  );
};

const styles = {
  footer: {
    marginTop: "100px",
    background: "linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 100%)",
    borderTop: "1px solid rgba(212, 175, 55, 0.2)",
    color: "#777",
    letterSpacing: "2px",
    fontSize: "12px",
  }
};

export default Footer;