import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [focusedField, setFocusedField] = useState(null);
  const navigate = useNavigate();
  const { register } = useAuth();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!formData.name || !formData.email || !formData.password || !formData.phone) {
      setError("Please fill in all fields");
      return;
    }

    if (!formData.email.includes("@")) {
      setError("Please enter a valid email");
      return;
    }

    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (formData.phone.length < 10) {
      setError("Please enter a valid phone number");
      return;
    }

    setLoading(true);
    try {
  const res = await register({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        password: formData.password,
        address: "",
        city: "",
        zipCode: "",
      });
  // Show success message then redirect to login for explicit sign-in
  alert('Registration successful. Please log in using your credentials.');
  navigate('/login');
    } catch (err) {
      setError(err.message || "Registration failed. Please try again.");
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
          0%, 100% { transform: translateY(0px) scale(1); opacity: 0.4; }
          50% { transform: translateY(-30px) scale(1.1); opacity: 0.6; }
        }
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        .reg-orb-1 {
          position: absolute; width: 350px; height: 350px; border-radius: 50%;
          background: radial-gradient(circle, rgba(212,175,55,0.12) 0%, transparent 70%);
          top: -100px; left: -100px; animation: floatOrb 8s ease-in-out infinite;
        }
        .reg-orb-2 {
          position: absolute; width: 280px; height: 280px; border-radius: 50%;
          background: radial-gradient(circle, rgba(212,175,55,0.08) 0%, transparent 70%);
          bottom: -80px; right: -80px; animation: floatOrb 10s ease-in-out infinite reverse;
        }
        .reg-orb-3 {
          position: absolute; width: 200px; height: 200px; border-radius: 50%;
          background: radial-gradient(circle, rgba(212,175,55,0.06) 0%, transparent 70%);
          top: 50%; right: 15%; animation: floatOrb 6s ease-in-out infinite 2s;
        }
        .reg-input {
          width: 100%;
          padding: 13px 14px 13px 42px;
          background: rgba(30, 30, 30, 0.8);
          border: 1px solid rgba(212, 175, 55, 0.25);
          color: white;
          border-radius: 6px;
          font-size: 14px;
          font-family: inherit;
          box-sizing: border-box;
          transition: border-color 0.3s ease, box-shadow 0.3s ease;
          outline: none;
        }
        .reg-input:focus {
          border-color: rgba(212, 175, 55, 0.7);
          box-shadow: 0 0 0 3px rgba(212, 175, 55, 0.1);
        }
        .reg-input::placeholder { color: #555; }
        .reg-input-wrap {
          position: relative;
        }
        .reg-input-icon {
          position: absolute;
          left: 14px;
          top: 50%;
          transform: translateY(-50%);
          font-size: 15px;
          pointer-events: none;
          opacity: 0.7;
        }
        .reg-toggle-btn {
          position: absolute;
          right: 12px;
          top: 50%;
          transform: translateY(-50%);
          background: none;
          border: none;
          cursor: pointer;
          font-size: 16px;
          padding: 2px;
          opacity: 0.7;
          transition: opacity 0.2s;
        }
        .reg-toggle-btn:hover { opacity: 1; }
        .reg-btn {
          width: 100%;
          padding: 14px;
          background: linear-gradient(135deg, #d4af37 0%, #b8962e 50%, #d4af37 100%);
          background-size: 200% auto;
          color: #0a0a0a;
          border: none;
          border-radius: 6px;
          font-size: 13px;
          font-weight: 700;
          letter-spacing: 2px;
          cursor: pointer;
          transition: background-position 0.4s ease, transform 0.2s ease, box-shadow 0.3s ease;
          text-transform: uppercase;
          margin-top: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
        }
        .reg-btn:hover:not(:disabled) {
          background-position: right center;
          transform: translateY(-1px);
          box-shadow: 0 6px 20px rgba(212, 175, 55, 0.4);
        }
        .reg-btn:disabled { opacity: 0.65; cursor: not-allowed; }
        .reg-spinner {
          width: 16px; height: 16px;
          border: 2px solid rgba(10,10,10,0.3);
          border-top-color: #0a0a0a;
          border-radius: 50%;
          animation: spin 0.7s linear infinite;
          display: inline-block;
        }
        .reg-login-btn {
          width: 100%;
          padding: 13px;
          background: transparent;
          border: 1px solid rgba(212, 175, 55, 0.35);
          color: #d4af37;
          border-radius: 6px;
          font-size: 13px;
          font-weight: 600;
          letter-spacing: 1.5px;
          cursor: pointer;
          transition: all 0.3s ease;
          text-transform: uppercase;
          text-decoration: none;
          display: block;
          text-align: center;
          margin-top: 14px;
        }
        .reg-login-btn:hover {
          background: rgba(212, 175, 55, 0.1);
          border-color: rgba(212, 175, 55, 0.6);
          color: #f0d060;
        }
      `}</style>

      <div className="reg-orb-1" />
      <div className="reg-orb-2" />
      <div className="reg-orb-3" />

      <div style={{
        position: "relative",
        zIndex: 1,
        background: "linear-gradient(145deg, rgba(22,22,22,0.95) 0%, rgba(15,15,15,0.98) 100%)",
        border: "1px solid rgba(212, 175, 55, 0.2)",
        borderRadius: "12px",
        padding: "40px 44px",
        maxWidth: "480px",
        width: "100%",
        boxShadow: "0 30px 80px rgba(0,0,0,0.7), inset 0 1px 0 rgba(212,175,55,0.1)",
        backdropFilter: "blur(20px)",
      }}>
        {/* Gold top accent */}
        <div style={{
          position: "absolute", top: 0, left: "20%", right: "20%", height: "2px",
          background: "linear-gradient(90deg, transparent, #d4af37, transparent)",
          borderRadius: "0 0 4px 4px",
        }} />

        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: "32px" }}>
          <div style={{ fontSize: "32px", marginBottom: "8px" }}>⌚</div>
          <p style={{ color: "#d4af37", fontSize: "11px", letterSpacing: "4px", fontWeight: "600", marginBottom: "10px" }}>
            IMPERIAL TIME
          </p>
          <h1 style={{ fontSize: "26px", fontWeight: "700", color: "#fff", margin: "0 0 6px 0", letterSpacing: "1px" }}>
            Create Account
          </h1>
          <p style={{ color: "#666", fontSize: "13px", margin: 0 }}>
            Join the Imperial Time collection
          </p>
        </div>

        {/* Error */}
        {error && (
          <div style={{
            background: "rgba(200, 50, 50, 0.12)",
            border: "1px solid rgba(200, 80, 80, 0.4)",
            color: "#ff7070",
            padding: "12px 16px",
            borderRadius: "6px",
            marginBottom: "20px",
            fontSize: "13px",
            display: "flex",
            alignItems: "center",
            gap: "8px",
          }}>
            <span>⚠️</span> {error}
          </div>
        )}

        <form onSubmit={handleSubmit} style={{ display: "grid", gap: "16px" }}>
          {/* Full Name */}
          <div>
            <label style={{ display: "block", color: "#a0905a", marginBottom: "7px", fontSize: "11px", fontWeight: "700", letterSpacing: "1.5px" }}>
              FULL NAME
            </label>
            <div className="reg-input-wrap">
              <span className="reg-input-icon">👤</span>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                onFocus={() => setFocusedField("name")}
                onBlur={() => setFocusedField(null)}
                placeholder="Enter your full name"
                className="reg-input"
              />
            </div>
          </div>

          {/* Email */}
          <div>
            <label style={{ display: "block", color: "#a0905a", marginBottom: "7px", fontSize: "11px", fontWeight: "700", letterSpacing: "1.5px" }}>
              EMAIL ADDRESS
            </label>
            <div className="reg-input-wrap">
              <span className="reg-input-icon">📧</span>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                onFocus={() => setFocusedField("email")}
                onBlur={() => setFocusedField(null)}
                placeholder="Enter your email"
                className="reg-input"
              />
            </div>
          </div>

          {/* Phone */}
          <div>
            <label style={{ display: "block", color: "#a0905a", marginBottom: "7px", fontSize: "11px", fontWeight: "700", letterSpacing: "1.5px" }}>
              PHONE NUMBER
            </label>
            <div className="reg-input-wrap">
              <span className="reg-input-icon">📱</span>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                onFocus={() => setFocusedField("phone")}
                onBlur={() => setFocusedField(null)}
                placeholder="Enter your phone number"
                className="reg-input"
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label style={{ display: "block", color: "#a0905a", marginBottom: "7px", fontSize: "11px", fontWeight: "700", letterSpacing: "1.5px" }}>
              PASSWORD
            </label>
            <div className="reg-input-wrap">
              <span className="reg-input-icon">🔒</span>
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleChange}
                onFocus={() => setFocusedField("password")}
                onBlur={() => setFocusedField(null)}
                placeholder="Create a password (min. 6 chars)"
                className="reg-input"
                style={{ paddingRight: "44px" }}
              />
              <button
                type="button"
                className="reg-toggle-btn"
                onClick={() => setShowPassword(!showPassword)}
                tabIndex={-1}
              >
                {showPassword ? "🙈" : "👁️"}
              </button>
            </div>
          </div>

          {/* Confirm Password */}
          <div>
            <label style={{ display: "block", color: "#a0905a", marginBottom: "7px", fontSize: "11px", fontWeight: "700", letterSpacing: "1.5px" }}>
              CONFIRM PASSWORD
            </label>
            <div className="reg-input-wrap">
              <span className="reg-input-icon">🔐</span>
              <input
                type={showConfirmPassword ? "text" : "password"}
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                onFocus={() => setFocusedField("confirmPassword")}
                onBlur={() => setFocusedField(null)}
                placeholder="Confirm your password"
                className="reg-input"
                style={{ paddingRight: "44px" }}
              />
              <button
                type="button"
                className="reg-toggle-btn"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                tabIndex={-1}
              >
                {showConfirmPassword ? "🙈" : "👁️"}
              </button>
            </div>
          </div>

          <button type="submit" disabled={loading} className="reg-btn">
            {loading ? (
              <><span className="reg-spinner" /> Creating Account...</>
            ) : (
              "Create Account ✦"
            )}
          </button>
        </form>

        <div style={{ marginTop: "20px", borderTop: "1px solid rgba(212,175,55,0.12)", paddingTop: "20px" }}>
          <Link to="/login" className="reg-login-btn">
            Already have an account? Sign In →
          </Link>
        </div>

        <p style={{ textAlign: "center", color: "#3a3a3a", fontSize: "11px", marginTop: "20px", letterSpacing: "0.5px" }}>
          🔐 Secured by Imperial Time · Luxury Since 2026
        </p>
      </div>
    </div>
  );
};

export default Register;
