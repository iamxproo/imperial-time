import { useState } from "react";

const CORRECT_OTP = "2121";

const UPIPayment = ({ subtotal, tax, total, onPaymentSuccess, processing }) => {
  const [upiId, setUpiId] = useState("");
  const [step, setStep] = useState("upi"); // "upi" | "otp" | "processing"
  const [otp, setOtp] = useState("");
  const [otpError, setOtpError] = useState("");
  const [upiError, setUpiError] = useState("");

  const handleUpiSubmit = (e) => {
    e.preventDefault();
    if (!upiId.match(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9]+$/)) {
      setUpiError("Invalid UPI ID — format: name@upi");
      return;
    }
    setUpiError("");
    setStep("otp");
  };

  const handleOtpSubmit = (e) => {
    e.preventDefault();
    if (otp !== CORRECT_OTP) {
      setOtpError("Incorrect OTP. Please try again.");
      setOtp("");
      return;
    }
    setOtpError("");
    setStep("processing");
    setTimeout(() => {
      onPaymentSuccess({
        upiId,
        transactionId: `TXN${Date.now()}`,
        amount: total,
        timestamp: new Date().toISOString(),
      });
    }, 2500);
  };

  // ── Styles ────────────────────────────────────────────────
  const card = {
    background: "linear-gradient(145deg, #1a1a1a 0%, #111 100%)",
    border: "1px solid rgba(212,175,55,0.35)",
    borderRadius: "16px",
    padding: "28px 32px",
    maxWidth: "420px",
    margin: "0 auto",
    boxShadow: "0 20px 60px rgba(0,0,0,0.6)",
  };
  const label = { color: "#b0b0b0", fontSize: "11px", fontWeight: "700", letterSpacing: "1.5px", textTransform: "uppercase", marginBottom: "6px", display: "block" };
  const input = {
    width: "100%", padding: "11px 14px", background: "rgba(255,255,255,0.05)",
    border: "1px solid rgba(212,175,55,0.4)", borderRadius: "8px",
    color: "#fff", fontSize: "15px", outline: "none", boxSizing: "border-box",
    transition: "border 0.2s",
  };
  const btn = (disabled) => ({
    width: "100%", padding: "13px", marginTop: "18px",
    background: disabled ? "rgba(212,175,55,0.3)" : "linear-gradient(135deg,#d4af37,#c9a961)",
    border: "none", borderRadius: "10px",
    color: disabled ? "#888" : "#0a0a0a",
    fontWeight: "800", fontSize: "15px", letterSpacing: "1px",
    cursor: disabled ? "not-allowed" : "pointer",
    transition: "all 0.2s",
  });
  const divider = { borderTop: "1px solid rgba(212,175,55,0.15)", margin: "16px 0" };
  const row = { display: "flex", justifyContent: "space-between", fontSize: "13px", marginBottom: "8px", color: "#c0c0c0" };
  const totalRow = { display: "flex", justifyContent: "space-between", fontSize: "16px", fontWeight: "700", color: "#d4af37", marginTop: "4px" };

  // ── Summary block (shared) ────────────────────────────────
  const Summary = () => (
    <div style={{ background: "rgba(212,175,55,0.06)", borderRadius: "10px", padding: "14px 16px", marginBottom: "18px" }}>
      <div style={row}><span>Subtotal</span><span>₹ {subtotal.toLocaleString()}</span></div>
      <div style={row}><span>Tax (18%)</span><span>₹ {tax.toLocaleString()}</span></div>
      <div style={divider} />
      <div style={totalRow}><span>Total</span><span>₹ {total.toLocaleString()}</span></div>
    </div>
  );

  // ── Processing screen ─────────────────────────────────────
  if (step === "processing") {
    return (
      <div style={{ ...card, textAlign: "center", padding: "48px 32px" }}>
        <div style={{ fontSize: "52px", marginBottom: "16px", animation: "spin 1.2s linear infinite", display: "inline-block" }}>💫</div>
        <h3 style={{ color: "#d4af37", fontSize: "20px", marginBottom: "8px" }}>Processing Payment</h3>
        <p style={{ color: "#888", fontSize: "14px" }}>Please wait, verifying your transaction…</p>
        <style>{`@keyframes spin { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }`}</style>
      </div>
    );
  }

  // ── OTP screen ────────────────────────────────────────────
  if (step === "otp") {
    return (
      <div style={card}>
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: "20px" }}>
          <div style={{ fontSize: "36px", marginBottom: "8px" }}>🔐</div>
          <h3 style={{ color: "#d4af37", fontSize: "18px", margin: 0 }}>Verify Payment</h3>
          <p style={{ color: "#888", fontSize: "12px", marginTop: "4px" }}>OTP sent to your UPI registered mobile</p>
        </div>

        <div style={{ background: "rgba(212,175,55,0.08)", borderRadius: "8px", padding: "10px 14px", marginBottom: "16px", fontSize: "13px", color: "#c0c0c0" }}>
          Paying via <strong style={{ color: "#d4af37" }}>{upiId}</strong>
        </div>

        <Summary />

        <form onSubmit={handleOtpSubmit}>
          <label style={label}>Enter OTP</label>
          <input
            type="text"
            maxLength={6}
            value={otp}
            onChange={(e) => { setOtp(e.target.value.replace(/\D/g, "")); setOtpError(""); }}
            placeholder="• • • •"
            style={{ ...input, fontSize: "22px", letterSpacing: "10px", textAlign: "center" }}
            autoFocus
          />
          {otpError && <p style={{ color: "#ff6b6b", fontSize: "12px", marginTop: "6px" }}>{otpError}</p>}
          <p style={{ color: "#666", fontSize: "11px", marginTop: "6px" }}>🕐 OTP valid for 5 minutes</p>

          <button type="submit" disabled={otp.length < 4} style={btn(otp.length < 4)}>
            Verify &amp; Pay
          </button>
          <button type="button" onClick={() => { setStep("upi"); setOtp(""); setOtpError(""); }}
            style={{ width: "100%", padding: "10px", marginTop: "10px", background: "transparent", border: "1px solid rgba(212,175,55,0.3)", borderRadius: "8px", color: "#888", fontSize: "13px", cursor: "pointer" }}>
            ← Change UPI ID
          </button>
        </form>
      </div>
    );
  }

  // ── UPI ID screen ─────────────────────────────────────────
  return (
    <div style={card}>
      {/* Header */}
      <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "20px" }}>
        <div style={{ width: "42px", height: "42px", background: "linear-gradient(135deg,#d4af37,#c9a961)", borderRadius: "10px", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "20px" }}>💳</div>
        <div>
          <h3 style={{ color: "#fff", margin: 0, fontSize: "17px", fontWeight: "700" }}>UPI Payment</h3>
          <p style={{ color: "#888", margin: 0, fontSize: "12px" }}>Fast &amp; secure payment</p>
        </div>
      </div>

      <Summary />

      <form onSubmit={handleUpiSubmit}>
        <label style={label}>Your UPI ID</label>
        <input
          type="text"
          value={upiId}
          onChange={(e) => { setUpiId(e.target.value); setUpiError(""); }}
          placeholder="yourname@upi"
          style={input}
          disabled={processing}
          autoFocus
        />
        {upiError && <p style={{ color: "#ff6b6b", fontSize: "12px", marginTop: "6px" }}>{upiError}</p>}
        <p style={{ color: "#555", fontSize: "11px", marginTop: "5px" }}>e.g. name@okaxis &nbsp;|&nbsp; name@ybl &nbsp;|&nbsp; name@paytm</p>

        <div style={divider} />

        <div style={{ display: "flex", gap: "10px", marginBottom: "14px" }}>
          {["🔒 SSL Secure", "✅ Instant", "📱 UPI Verified"].map(t => (
            <span key={t} style={{ background: "rgba(212,175,55,0.1)", border: "1px solid rgba(212,175,55,0.25)", borderRadius: "20px", padding: "4px 10px", fontSize: "10px", color: "#d4af37", fontWeight: "600" }}>{t}</span>
          ))}
        </div>

        <button type="submit" disabled={processing || !upiId.trim()} style={btn(processing || !upiId.trim())}>
          {processing ? "Processing…" : "Send OTP →"}
        </button>
      </form>
    </div>
  );
};

export default UPIPayment;

