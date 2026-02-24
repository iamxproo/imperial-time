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
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { register } = useAuth();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
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
    // Simulate API call
    setTimeout(() => {
      try {
        register({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          address: "",
          city: "",
          zipCode: "",
        });
        navigate("/account");
      } catch (err) {
        setError("Registration failed. Please try again.");
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
          Register
        </h1>
        <p style={{ textAlign: "center", color: "#b0b0b0", marginBottom: "40px", fontSize: "14px" }}>
          Join Imperial Time and get exclusive access
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
              FULL NAME
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your full name"
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
              EMAIL ADDRESS
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
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
              PHONE NUMBER
            </label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Enter your phone number"
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
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Create a password"
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
              CONFIRM PASSWORD
            </label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Confirm your password"
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
            {loading ? "Registering..." : "Register"}
          </button>
        </form>

        <div style={{ marginTop: "30px", textAlign: "center", borderTop: "1px solid rgba(212, 175, 55, 0.2)", paddingTop: "30px" }}>
          <p style={{ color: "#b0b0b0" }}>
            Already have an account?{" "}
            <Link
              to="/login"
              style={{
                color: "#d4af37",
                textDecoration: "none",
                fontWeight: "600",
                transition: "color 0.3s ease",
              }}
              onMouseEnter={(e) => (e.target.style.color = "#ffffff")}
              onMouseLeave={(e) => (e.target.style.color = "#d4af37")}
            >
              Login here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
