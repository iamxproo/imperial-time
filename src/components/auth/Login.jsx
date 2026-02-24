import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = (e) => {
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
    // Simulate API call
    setTimeout(() => {
      try {
        login(email, password);
        navigate("/account");
      } catch (err) {
        setError("Login failed. Please try again.");
      } finally {
        setLoading(false);
      }
    }, 1000);
  };

  return (
    <div className="page-container" style={{ display: "flex", alignItems: "center", justifyContent: "center", minHeight: "100vh" }}>
      <div
        style={{
          background: "linear-gradient(135deg, rgba(42, 42, 42, 0.8) 0%, rgba(26, 26, 26, 0.8) 100%)",
          border: "2px solid rgba(212, 175, 55, 0.3)",
          borderRadius: "8px",
          padding: "50px",
          maxWidth: "500px",
          width: "100%",
          boxShadow: "0 20px 60px rgba(0, 0, 0, 0.5)",
        }}
      >
        <h1 style={{ fontSize: "36px", marginBottom: "10px", textAlign: "center", color: "#d4af37" }}>
          Login
        </h1>
        <p style={{ textAlign: "center", color: "#b0b0b0", marginBottom: "40px", fontSize: "14px" }}>
          Welcome back to Imperial Time
        </p>

        {error && (
          <div
            style={{
              background: "rgba(217, 83, 79, 0.2)",
              border: "1px solid #d9534f",
              color: "#ff6b6b",
              padding: "15px",
              borderRadius: "4px",
              marginBottom: "20px",
              fontSize: "14px",
            }}
          >
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} style={{ display: "grid", gap: "20px" }}>
          <div>
            <label
              style={{
                display: "block",
                color: "#d4af37",
                marginBottom: "8px",
                fontSize: "14px",
                fontWeight: "600",
                letterSpacing: "1px",
              }}
            >
              EMAIL ADDRESS
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              style={{
                width: "100%",
                padding: "14px",
                background: "rgba(42, 42, 42, 0.6)",
                border: "1px solid rgba(212, 175, 55, 0.3)",
                color: "white",
                borderRadius: "4px",
                fontSize: "14px",
                fontFamily: "inherit",
              }}
            />
          </div>

          <div>
            <label
              style={{
                display: "block",
                color: "#d4af37",
                marginBottom: "8px",
                fontSize: "14px",
                fontWeight: "600",
                letterSpacing: "1px",
              }}
            >
              PASSWORD
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              style={{
                width: "100%",
                padding: "14px",
                background: "rgba(42, 42, 42, 0.6)",
                border: "1px solid rgba(212, 175, 55, 0.3)",
                color: "white",
                borderRadius: "4px",
                fontSize: "14px",
                fontFamily: "inherit",
              }}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="lux-btn"
            style={{
              marginTop: "10px",
              width: "100%",
              padding: "14px",
              opacity: loading ? 0.7 : 1,
              cursor: loading ? "not-allowed" : "pointer",
            }}
          >
            {loading ? "Logging In..." : "Login"}
          </button>
        </form>

        <div style={{ marginTop: "30px", textAlign: "center", borderTop: "1px solid rgba(212, 175, 55, 0.2)", paddingTop: "30px" }}>
          <p style={{ color: "#b0b0b0", marginBottom: "15px" }}>
            Don't have an account?{" "}
            <Link
              to="/register"
              style={{
                color: "#d4af37",
                textDecoration: "none",
                fontWeight: "600",
                transition: "color 0.3s ease",
              }}
              onMouseEnter={(e) => (e.target.style.color = "#ffffff")}
              onMouseLeave={(e) => (e.target.style.color = "#d4af37")}
            >
              Register here
            </Link>
          </p>
        </div>

        <div style={{ marginTop: "20px", textAlign: "center" }}>
          <p style={{ color: "#888", fontSize: "12px", fontStyle: "italic" }}>
            Demo: Use any email and password (min 6 chars)
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
