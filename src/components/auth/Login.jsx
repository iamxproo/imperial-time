import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [focusedField, setFocusedField] = useState(null);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("Please fill in all fields");
      return;
    }

    if (!email.includes("@")) {
      setError("Please enter a valid email");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    setLoading(true);
    try {
      await login(email, password);
      navigate("/account");
    } catch (err) {
      setError(err.message || "Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      minHeight: "100vh",
      background: "linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 50%, #2a1a0a 100%)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: "20px",
      position: "relative",
      overflow: "hidden",
    }}>
      <style>{`
        @keyframes floatOrb {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(30px, -30px) scale(1.05); }
          66% { transform: translate(-20px, 20px) scale(0.95); }
        }
        @keyframes shimmer {
          0% { background-position: -200% center; }
          100% { background-position: 200% center; }
        }
        @keyframes fadeSlideUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
        .login-card {
          animation: fadeSlideUp 0.6s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .login-input {
          width: 100%;
          padding: 15px 18px;
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(212,175,55,0.2);
          color: #fff;
          border-radius: 10px;
          font-size: 14px;
          font-family: inherit;
          transition: all 0.3s ease;
          outline: none;
          box-sizing: border-box;
        }
        .login-input:focus {
          border-color: #d4af37;
          background: rgba(212,175,55,0.06);
          box-shadow: 0 0 0 3px rgba(212,175,55,0.1);
        }
        .login-input::placeholder { color: rgba(255,255,255,0.25); }
        .login-btn {
          width: 100%;
          padding: 15px;
          background: linear-gradient(135deg, #d4af37 0%, #f4e4c1 50%, #c9a961 100%);
          background-size: 200% auto;
          border: none;
          color: #0a0a0a;
          border-radius: 10px;
          font-size: 14px;
          font-weight: 800;
          letter-spacing: 2px;
          text-transform: uppercase;
          cursor: pointer;
          transition: all 0.3s ease;
          position: relative;
          overflow: hidden;
        }
        .login-btn:hover:not(:disabled) {
          background-position: right center;
          box-shadow: 0 8px 30px rgba(212,175,55,0.4);
          transform: translateY(-2px);
        }
        .login-btn:disabled {
          opacity: 0.7;
          cursor: not-allowed;
        }
        .spinner {
          width: 18px;
          height: 18px;
          border: 2px solid rgba(10,10,10,0.3);
          border-top-color: #0a0a0a;
          border-radius: 50%;
          animation: spin 0.7s linear infinite;
          display: inline-block;
          vertical-align: middle;
          margin-right: 8px;
        }
        .divider-line {
          flex: 1;
          height: 1px;
          background: rgba(212,175,55,0.15);
        }
        .social-hint {
          color: rgba(255,255,255,0.35);
          font-size: 11px;
          letter-spacing: 1px;
          text-transform: uppercase;
          padding: 0 12px;
          white-space: nowrap;
        }
      `}</style>

      {/* Background orbs */}
      <div style={{
        position: "fixed", top: "15%", left: "10%", width: "400px", height: "400px",
        borderRadius: "50%",
        background: "radial-gradient(circle, rgba(212,175,55,0.07) 0%, transparent 70%)",
        animation: "floatOrb 12s ease-in-out infinite", pointerEvents: "none",
      }} />
      <div style={{
        position: "fixed", bottom: "10%", right: "8%", width: "350px", height: "350px",
        borderRadius: "50%",
        background: "radial-gradient(circle, rgba(212,175,55,0.05) 0%, transparent 70%)",
        animation: "floatOrb 16s ease-in-out infinite reverse", pointerEvents: "none",
      }} />

      {/* Card */}
      <div className="login-card" style={{
        width: "100%",
        maxWidth: "460px",
        background: "linear-gradient(160deg, rgba(30,30,30,0.95) 0%, rgba(18,18,18,0.98) 100%)",
        border: "1px solid rgba(212,175,55,0.2)",
        borderRadius: "20px",
        padding: "50px 44px",
        boxShadow: "0 30px 80px rgba(0,0,0,0.6), 0 0 60px rgba(212,175,55,0.05), inset 0 1px 0 rgba(255,255,255,0.06)",
        position: "relative",
        zIndex: 1,
      }}>
        {/* Top gold accent line */}
        <div style={{
          position: "absolute", top: 0, left: "10%", right: "10%", height: "2px",
          background: "linear-gradient(90deg, transparent, #d4af37, #f4e4c1, #d4af37, transparent)",
          borderRadius: "0 0 4px 4px",
        }} />

        {/* Logo / Brand */}
        <div style={{ textAlign: "center", marginBottom: "36px" }}>
          <div style={{
            display: "inline-flex", alignItems: "center", justifyContent: "center",
            width: "64px", height: "64px", borderRadius: "16px",
            background: "linear-gradient(135deg, rgba(212,175,55,0.15), rgba(212,175,55,0.05))",
            border: "1px solid rgba(212,175,55,0.3)",
            marginBottom: "20px",
            fontSize: "28px",
          }}>⌚</div>
          <h1 style={{
            fontSize: "13px", fontWeight: "700", letterSpacing: "4px",
            textTransform: "uppercase", color: "#d4af37", marginBottom: "8px",
          }}>
            IMPERIAL TIME
          </h1>
          <h2 style={{
            fontSize: "26px", fontWeight: "700", color: "#ffffff",
            marginBottom: "8px", letterSpacing: "0.5px",
          }}>
            Welcome Back
          </h2>
          <p style={{ color: "rgba(255,255,255,0.4)", fontSize: "13px", letterSpacing: "0.3px" }}>
            Sign in to your luxury account
          </p>
        </div>

        {/* Error */}
        {error && (
          <div style={{
            background: "rgba(239,68,68,0.1)",
            border: "1px solid rgba(239,68,68,0.3)",
            borderRadius: "10px",
            padding: "13px 16px",
            marginBottom: "24px",
            display: "flex", alignItems: "center", gap: "10px",
          }}>
            <span style={{ fontSize: "16px" }}>⚠️</span>
            <span style={{ color: "#fca5a5", fontSize: "13px" }}>{error}</span>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit}>
          {/* Email */}
          <div style={{ marginBottom: "20px" }}>
            <label style={{
              display: "block", color: "rgba(255,255,255,0.6)",
              fontSize: "11px", fontWeight: "700", letterSpacing: "1.5px",
              textTransform: "uppercase", marginBottom: "8px",
            }}>
              Email Address
            </label>
            <div style={{ position: "relative" }}>
              <span style={{
                position: "absolute", left: "16px", top: "50%", transform: "translateY(-50%)",
                fontSize: "16px", opacity: 0.5, pointerEvents: "none",
              }}>📧</span>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onFocus={() => setFocusedField("email")}
                onBlur={() => setFocusedField(null)}
                placeholder="you@example.com"
                className="login-input"
                style={{ paddingLeft: "46px" }}
              />
            </div>
          </div>

          {/* Password */}
          <div style={{ marginBottom: "28px" }}>
            <label style={{
              display: "block", color: "rgba(255,255,255,0.6)",
              fontSize: "11px", fontWeight: "700", letterSpacing: "1.5px",
              textTransform: "uppercase", marginBottom: "8px",
            }}>
              Password
            </label>
            <div style={{ position: "relative" }}>
              <span style={{
                position: "absolute", left: "16px", top: "50%", transform: "translateY(-50%)",
                fontSize: "16px", opacity: 0.5, pointerEvents: "none",
              }}>🔒</span>
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onFocus={() => setFocusedField("password")}
                onBlur={() => setFocusedField(null)}
                placeholder="Enter your password"
                className="login-input"
                style={{ paddingLeft: "46px", paddingRight: "46px" }}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                style={{
                  position: "absolute", right: "14px", top: "50%", transform: "translateY(-50%)",
                  background: "none", border: "none", cursor: "pointer",
                  fontSize: "16px", opacity: 0.5, padding: "4px",
                  transition: "opacity 0.2s",
                }}
                onMouseEnter={(e) => e.currentTarget.style.opacity = 1}
                onMouseLeave={(e) => e.currentTarget.style.opacity = 0.5}
              >
                {showPassword ? "🙈" : "👁️"}
              </button>
            </div>
          </div>

          {/* Submit Button */}
          <button type="submit" disabled={loading} className="login-btn">
            {loading ? (
              <><span className="spinner" />Signing In...</>
            ) : (
              "Sign In →"
            )}
          </button>
        </form>

        {/* Divider */}
        <div style={{ display: "flex", alignItems: "center", margin: "28px 0" }}>
          <div className="divider-line" />
          <span className="social-hint">New here?</span>
          <div className="divider-line" />
        </div>

        {/* Register Link */}
        <Link to="/register" style={{ textDecoration: "none" }}>
          <div style={{
            width: "100%", padding: "13px",
            background: "transparent",
            border: "1px solid rgba(212,175,55,0.25)",
            borderRadius: "10px",
            textAlign: "center",
            color: "#d4af37",
            fontSize: "13px",
            fontWeight: "600",
            letterSpacing: "1px",
            cursor: "pointer",
            transition: "all 0.3s ease",
            boxSizing: "border-box",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = "rgba(212,175,55,0.08)";
            e.currentTarget.style.borderColor = "#d4af37";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = "transparent";
            e.currentTarget.style.borderColor = "rgba(212,175,55,0.25)";
          }}>
            Create New Account ✦
          </div>
        </Link>

        {/* Footer */}
        <p style={{
          textAlign: "center", color: "rgba(255,255,255,0.18)",
          fontSize: "11px", marginTop: "28px", letterSpacing: "0.5px",
        }}>
          🔐 Secured by Imperial Time &nbsp;·&nbsp; Luxury Since 2026
        </p>

        {/* Hidden admin access — subtle, low-key */}
        <p style={{ textAlign: "center", marginTop: "18px" }}>
          <Link
            to="/admin/login"
            style={{
              color: "rgba(255,255,255,0.12)",
              fontSize: "10px",
              textDecoration: "none",
              letterSpacing: "1px",
              transition: "color 0.3s ease",
            }}
            onMouseEnter={(e) => e.currentTarget.style.color = "rgba(212,175,55,0.45)"}
            onMouseLeave={(e) => e.currentTarget.style.color = "rgba(255,255,255,0.12)"}
          >
            system access
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
