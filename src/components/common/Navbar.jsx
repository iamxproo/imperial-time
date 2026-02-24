import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useCart } from "../../context/CartContext";

const Navbar = () => {
  const { user, logout } = useAuth();
  const { cart } = useCart();
  const navigate = useNavigate();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const cartCount = cart.length;

  return (
    <nav
      className="lux-navbar"
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "16px 40px",
        background: isScrolled
          ? "rgba(10, 10, 10, 0.98)"
          : "rgba(10, 10, 10, 0.95)",
        backdropFilter: "blur(10px)",
        boxShadow: isScrolled
          ? "0 12px 40px rgba(212, 175, 55, 0.15)"
          : "0 8px 32px rgba(0, 0, 0, 0.3)",
        transition: "all 0.3s ease",
        position: "fixed",
        top: "0",
        left: "0",
        right: "0",
        zIndex: "1000",
      }}
    >
      <style>{`
        @keyframes glow {
          0%, 100% { text-shadow: 0 0 10px rgba(212, 175, 55, 0.3); }
          50% { text-shadow: 0 0 20px rgba(212, 175, 55, 0.6); }
        }

        @keyframes slideDown {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .navbar-logo {
          animation: slideDown 0.6s ease-out;
        }

        .nav-link-item {
          position: relative;
          animation: slideDown 0.6s ease-out;
        }

        .cart-badge {
          animation: glow 2s ease-in-out infinite;
        }
      `}</style>

      {/* Logo */}
      <Link to="/" style={{ textDecoration: "none" }}>
        <div className="navbar-logo" style={{
          fontSize: "24px",
          fontWeight: "700",
          letterSpacing: "4px",
          background: "linear-gradient(135deg, #d4af37 0%, #c9a961 100%)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundClip: "text",
          textTransform: "uppercase",
          transition: "all 0.3s ease",
          cursor: "pointer",
        }}
        onMouseEnter={(e) => {
          e.target.style.transform = "scale(1.05)";
        }}
        onMouseLeave={(e) => {
          e.target.style.transform = "scale(1)";
        }}>
          IMPERIAL TIME
        </div>
      </Link>

      {/* Desktop Navigation */}
      <div className="nav-links" style={{
        display: "flex",
        alignItems: "center",
        gap: "30px",
        flexWrap: "wrap",
      }}>
        {/* Navigation Links */}
        <Link to="/" style={{ textDecoration: "none" }}>
          <span className="nav-link-item" style={{
            color: "white",
            fontSize: "14px",
            fontWeight: "500",
            letterSpacing: "1px",
            position: "relative",
            transition: "all 0.3s ease",
            textTransform: "uppercase",
            cursor: "pointer",
            paddingBottom: "5px",
          }}
          onMouseEnter={(e) => {
            e.target.style.color = "#d4af37";
            e.target.style.borderBottom = "2px solid #d4af37";
          }}
          onMouseLeave={(e) => {
            e.target.style.color = "white";
            e.target.style.borderBottom = "none";
          }}>
            Home
          </span>
        </Link>

        <Link to="/collections" style={{ textDecoration: "none" }}>
          <span className="nav-link-item" style={{
            color: "white",
            fontSize: "14px",
            fontWeight: "500",
            letterSpacing: "1px",
            position: "relative",
            transition: "all 0.3s ease",
            textTransform: "uppercase",
            cursor: "pointer",
            paddingBottom: "5px",
          }}
          onMouseEnter={(e) => {
            e.target.style.color = "#d4af37";
            e.target.style.borderBottom = "2px solid #d4af37";
          }}
          onMouseLeave={(e) => {
            e.target.style.color = "white";
            e.target.style.borderBottom = "none";
          }}>
            Collections
          </span>
        </Link>

        <Link to="/reviews" style={{ textDecoration: "none" }}>
          <span className="nav-link-item" style={{
            color: "white",
            fontSize: "14px",
            fontWeight: "500",
            letterSpacing: "1px",
            position: "relative",
            transition: "all 0.3s ease",
            textTransform: "uppercase",
            cursor: "pointer",
            paddingBottom: "5px",
          }}
          onMouseEnter={(e) => {
            e.target.style.color = "#d4af37";
            e.target.style.borderBottom = "2px solid #d4af37";
          }}
          onMouseLeave={(e) => {
            e.target.style.color = "white";
            e.target.style.borderBottom = "none";
          }}>
            Reviews
          </span>
        </Link>

        {/* User Links */}
        {user ? (
          <>
            <div style={{
              display: "flex",
              alignItems: "center",
              gap: "15px",
              paddingLeft: "15px",
              borderLeft: "1px solid rgba(212, 175, 55, 0.2)",
            }}>
              <Link to="/account" style={{ textDecoration: "none" }}>
                <span className="nav-link-item" style={{
                  color: "white",
                  fontSize: "14px",
                  fontWeight: "500",
                  letterSpacing: "1px",
                  position: "relative",
                  transition: "all 0.3s ease",
                  textTransform: "uppercase",
                  cursor: "pointer",
                  paddingBottom: "5px",
                }}
                onMouseEnter={(e) => {
                  e.target.style.color = "#d4af37";
                  e.target.style.borderBottom = "2px solid #d4af37";
                }}
                onMouseLeave={(e) => {
                  e.target.style.color = "white";
                  e.target.style.borderBottom = "none";
                }}>
                  👤 Account
                </span>
              </Link>

              <button
                onClick={handleLogout}
                style={{
                  background: "linear-gradient(135deg, rgba(217, 83, 79, 0.1) 0%, rgba(192, 57, 43, 0.1) 100%)",
                  border: "1px solid rgba(217, 83, 79, 0.3)",
                  color: "#ff6b6b",
                  cursor: "pointer",
                  fontSize: "12px",
                  fontWeight: "600",
                  letterSpacing: "1px",
                  padding: "8px 16px",
                  borderRadius: "4px",
                  transition: "all 0.3s ease",
                  textTransform: "uppercase",
                }}
                onMouseEnter={(e) => {
                  e.target.style.background = "linear-gradient(135deg, rgba(217, 83, 79, 0.2) 0%, rgba(192, 57, 43, 0.2) 100%)";
                  e.target.style.borderColor = "#ff6b6b";
                  e.target.style.transform = "translateY(-2px)";
                }}
                onMouseLeave={(e) => {
                  e.target.style.background = "linear-gradient(135deg, rgba(217, 83, 79, 0.1) 0%, rgba(192, 57, 43, 0.1) 100%)";
                  e.target.style.borderColor = "rgba(217, 83, 79, 0.3)";
                  e.target.style.transform = "translateY(0)";
                }}
              >
                Logout
              </button>
            </div>
          </>
        ) : (
          <div style={{
            display: "flex",
            alignItems: "center",
            gap: "15px",
            paddingLeft: "15px",
            borderLeft: "1px solid rgba(212, 175, 55, 0.2)",
          }}>
            <Link to="/login" style={{ textDecoration: "none" }}>
              <button style={{
                background: "transparent",
                border: "1px solid #d4af37",
                color: "#d4af37",
                cursor: "pointer",
                fontSize: "12px",
                fontWeight: "600",
                letterSpacing: "1px",
                padding: "8px 16px",
                borderRadius: "4px",
                transition: "all 0.3s ease",
                textTransform: "uppercase",
              }}
              onMouseEnter={(e) => {
                e.target.style.background = "#d4af37";
                e.target.style.color = "#0a0a0a";
                e.target.style.transform = "translateY(-2px)";
              }}
              onMouseLeave={(e) => {
                e.target.style.background = "transparent";
                e.target.style.color = "#d4af37";
                e.target.style.transform = "translateY(0)";
              }}>
                Login
              </button>
            </Link>

            <Link to="/register" style={{ textDecoration: "none" }}>
              <button style={{
                background: "linear-gradient(135deg, #d4af37 0%, #c9a961 100%)",
                border: "none",
                color: "#0a0a0a",
                cursor: "pointer",
                fontSize: "12px",
                fontWeight: "600",
                letterSpacing: "1px",
                padding: "8px 16px",
                borderRadius: "4px",
                transition: "all 0.3s ease",
                textTransform: "uppercase",
                boxShadow: "0 4px 15px rgba(212, 175, 55, 0.2)",
              }}
              onMouseEnter={(e) => {
                e.target.style.boxShadow = "0 8px 25px rgba(212, 175, 55, 0.4)";
                e.target.style.transform = "translateY(-2px)";
              }}
              onMouseLeave={(e) => {
                e.target.style.boxShadow = "0 4px 15px rgba(212, 175, 55, 0.2)";
                e.target.style.transform = "translateY(0)";
              }}>
                Sign Up
              </button>
            </Link>
          </div>
        )}

        {/* Admin Link */}
        <Link to="/admin/login" style={{ textDecoration: "none" }}>
          <span className="nav-link-item" style={{
            color: "#d4af37",
            fontSize: "12px",
            fontWeight: "600",
            letterSpacing: "1px",
            position: "relative",
            transition: "all 0.3s ease",
            textTransform: "uppercase",
            cursor: "pointer",
            paddingBottom: "5px",
            opacity: "0.8",
          }}
          onMouseEnter={(e) => {
            e.target.style.color = "#fff";
            e.target.style.borderBottom = "2px solid #d4af37";
            e.target.style.opacity = "1";
          }}
          onMouseLeave={(e) => {
            e.target.style.color = "#d4af37";
            e.target.style.borderBottom = "none";
            e.target.style.opacity = "0.8";
          }}>
            ⚙️ Admin
          </span>
        </Link>

        {/* Cart Icon */}
        <Link to="/cart" style={{ textDecoration: "none", position: "relative" }}>
          <div style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "40px",
            height: "40px",
            background: "linear-gradient(135deg, rgba(212, 175, 55, 0.1) 0%, rgba(201, 169, 97, 0.1) 100%)",
            border: "1px solid rgba(212, 175, 55, 0.3)",
            borderRadius: "8px",
            cursor: "pointer",
            transition: "all 0.3s ease",
            fontSize: "18px",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = "linear-gradient(135deg, rgba(212, 175, 55, 0.2) 0%, rgba(201, 169, 97, 0.2) 100%)";
            e.currentTarget.style.borderColor = "#d4af37";
            e.currentTarget.style.transform = "scale(1.1)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = "linear-gradient(135deg, rgba(212, 175, 55, 0.1) 0%, rgba(201, 169, 97, 0.1) 100%)";
            e.currentTarget.style.borderColor = "rgba(212, 175, 55, 0.3)";
            e.currentTarget.style.transform = "scale(1)";
          }}>
            🛒

            {cartCount > 0 && (
              <div
                className="cart-badge"
                style={{
                  position: "absolute",
                  top: "-8px",
                  right: "-8px",
                  background: "linear-gradient(135deg, #ff6b6b 0%, #ff5252 100%)",
                  color: "white",
                  width: "24px",
                  height: "24px",
                  borderRadius: "50%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "11px",
                  fontWeight: "700",
                  border: "2px solid #0a0a0a",
                  boxShadow: "0 2px 8px rgba(255, 107, 107, 0.4)",
                }}
              >
                {cartCount}
              </div>
            )}
          </div>
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;