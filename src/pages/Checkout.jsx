import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";

const Checkout = () => {
  const { cart, clearCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [orderDetails, setOrderDetails] = useState({
    name: user?.name || "",
    email: user?.email || "",
    phone: user?.phone || "",
    address: "",
  });

  // Load Razorpay script
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    document.body.appendChild(script);
    return () => document.body.removeChild(script);
  }, []);

  // Calculate totals
  const subtotal = cart.reduce((sum, item) => sum + (item.price * (item.quantity || 1)), 0);
  const tax = subtotal * 0.18;
  const total = subtotal + tax;

  const handlePayment = async (e) => {
    e.preventDefault();
    
    if (!orderDetails.name || !orderDetails.email || !orderDetails.phone || !orderDetails.address) {
      alert("Please fill all details");
      return;
    }

    setLoading(true);

    try {
      // Create order on backend (mock for now)
      const orderId = `ORDER_${Date.now()}`;
      
      const options = {
        key: "rzp_test_1DP5owbHnPAFZF", // Test key (public)
        amount: Math.round(total * 100), // Amount in paise
        currency: "INR",
        name: "IMPERIAL TIME",
        description: `Order ${orderId}`,
        order_id: orderId,
        prefill: {
          name: orderDetails.name,
          email: orderDetails.email,
          contact: orderDetails.phone,
        },
        notes: {
          address: orderDetails.address,
          items: cart.length,
        },
        handler: function (response) {
          // Payment successful
          handlePaymentSuccess(response, orderId);
        },
        modal: {
          ondismiss: function () {
            setLoading(false);
            alert("Payment cancelled");
          },
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error) {
      console.error("Payment error:", error);
      alert("Error initiating payment");
      setLoading(false);
    }
  };

  const handlePaymentSuccess = (response, orderId) => {
    // Store order details
    const orderData = {
      orderId: orderId,
      razorpayOrderId: response.razorpay_order_id,
      razorpayPaymentId: response.razorpay_payment_id,
      razorpaySignature: response.razorpay_signature,
      customerDetails: orderDetails,
      items: cart,
      total: total,
      tax: tax,
      subtotal: subtotal,
      status: "confirmed",
      date: new Date().toLocaleString(),
    };

    // Save to localStorage
    const orders = JSON.parse(localStorage.getItem("orders")) || [];
    orders.push(orderData);
    localStorage.setItem("orders", JSON.stringify(orders));

    // Clear cart
    clearCart();
    setLoading(false);

    // Redirect to success page
    navigate("/order-success", { state: { order: orderData } });
  };

  if (cart.length === 0) {
    return (
      <div style={{ padding: "100px 80px", textAlign: "center" }}>
        <h2 style={{ color: "#d4af37", marginBottom: "20px" }}>Your Cart is Empty</h2>
        <p style={{ color: "#b0b0b0", marginBottom: "30px" }}>Add items before checkout</p>
        <button
          onClick={() => navigate("/collections")}
          style={{
            background: "linear-gradient(135deg, #d4af37 0%, #c9a961 100%)",
            border: "none",
            color: "#0a0a0a",
            padding: "12px 30px",
            fontSize: "14px",
            fontWeight: "700",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          Continue Shopping
        </button>
      </div>
    );
  }

  return (
    <div style={{ padding: "60px 80px", minHeight: "80vh" }}>
      <style>{`
        .checkout-container {
          display: grid;
          gridTemplateColumns: 1fr 1fr;
          gap: 60px;
          maxWidth: 1200px;
          margin: 0 auto;
        }

        @media (max-width: 768px) {
          .checkout-container {
            gridTemplateColumns: 1fr;
          }
        }

        .form-group {
          marginBottom: 20px;
        }

        .form-group label {
          display: block;
          marginBottom: 8px;
          color: #d4af37;
          fontWeight: 700;
          fontSize: 13px;
          letterSpacing: 1px;
          textTransform: uppercase;
        }

        .form-group input,
        .form-group textarea {
          width: 100%;
          padding: 12px;
          background: rgba(42, 42, 42, 0.8);
          border: 1px solid rgba(212, 175, 55, 0.2);
          color: #ffffff;
          borderRadius: 4px;
          fontSize: 14px;
          fontFamily: inherit;
          transition: all 0.3s ease;
        }

        .form-group input:focus,
        .form-group textarea:focus {
          outline: none;
          borderColor: #d4af37;
          boxShadow: 0 0 10px rgba(212, 175, 55, 0.2);
        }
      `}</style>

      <h1 style={{ marginBottom: "40px", textAlign: "center" }}>
        <span style={{
          background: "linear-gradient(135deg, #d4af37 0%, #ffffff 50%, #c9a961 100%)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundClip: "text",
          fontSize: "48px",
          fontWeight: "700",
          letterSpacing: "2px",
        }}>
          SECURE CHECKOUT
        </span>
      </h1>

      <div className="checkout-container">
        {/* Checkout Form */}
        <div>
          <h2 style={{ color: "#d4af37", marginBottom: "30px", fontSize: "24px" }}>
            Delivery Details
          </h2>
          <form onSubmit={handlePayment}>
            <div className="form-group">
              <label>Full Name *</label>
              <input
                type="text"
                value={orderDetails.name}
                onChange={(e) => setOrderDetails({ ...orderDetails, name: e.target.value })}
                placeholder="Enter your name"
                required
              />
            </div>

            <div className="form-group">
              <label>Email Address *</label>
              <input
                type="email"
                value={orderDetails.email}
                onChange={(e) => setOrderDetails({ ...orderDetails, email: e.target.value })}
                placeholder="Enter your email"
                required
              />
            </div>

            <div className="form-group">
              <label>Phone Number *</label>
              <input
                type="tel"
                value={orderDetails.phone}
                onChange={(e) => setOrderDetails({ ...orderDetails, phone: e.target.value })}
                placeholder="Enter your phone number"
                required
              />
            </div>

            <div className="form-group">
              <label>Delivery Address *</label>
              <textarea
                value={orderDetails.address}
                onChange={(e) => setOrderDetails({ ...orderDetails, address: e.target.value })}
                placeholder="Enter your full delivery address"
                rows="4"
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              style={{
                width: "100%",
                background: loading ? "rgba(212, 175, 55, 0.5)" : "linear-gradient(135deg, #d4af37 0%, #c9a961 100%)",
                border: "none",
                color: "#0a0a0a",
                padding: "16px",
                fontSize: "16px",
                fontWeight: "700",
                borderRadius: "4px",
                cursor: loading ? "not-allowed" : "pointer",
                transition: "all 0.3s ease",
                textTransform: "uppercase",
                letterSpacing: "2px",
              }}
              onMouseEnter={(e) => {
                if (!loading) {
                  e.target.style.transform = "translateY(-2px)";
                  e.target.style.boxShadow = "0 10px 30px rgba(212, 175, 55, 0.3)";
                }
              }}
              onMouseLeave={(e) => {
                if (!loading) {
                  e.target.style.transform = "translateY(0)";
                  e.target.style.boxShadow = "none";
                }
              }}
            >
              {loading ? "Processing..." : "Proceed to Payment"}
            </button>

            <p style={{ color: "#888", fontSize: "12px", marginTop: "15px", textAlign: "center" }}>
              🔒 Secure payment powered by Razorpay
            </p>
          </form>
        </div>

        {/* Order Summary */}
        <div>
          <div style={{
            background: "linear-gradient(135deg, rgba(42, 42, 42, 0.8) 0%, rgba(26, 26, 26, 0.8) 100%)",
            border: "1px solid rgba(212, 175, 55, 0.2)",
            borderRadius: "8px",
            padding: "30px",
            position: "sticky",
            top: "100px",
          }}>
            <h2 style={{ color: "#d4af37", marginBottom: "30px", fontSize: "20px" }}>
              Order Summary
            </h2>

            <div style={{ marginBottom: "30px", maxHeight: "300px", overflowY: "auto" }}>
              {cart.map((item, idx) => (
                <div key={idx} style={{
                  display: "flex",
                  justifyContent: "space-between",
                  paddingBottom: "15px",
                  borderBottom: "1px solid rgba(212, 175, 55, 0.1)",
                  marginBottom: "15px",
                }}>
                  <div>
                    <p style={{ color: "#ffffff", marginBottom: "5px" }}>
                      {item.name}
                    </p>
                    <p style={{ color: "#888", fontSize: "12px" }}>
                      Qty: {item.quantity || 1}
                    </p>
                  </div>
                  <p style={{ color: "#d4af37", fontWeight: "700" }}>
                    ₹ {(item.price * (item.quantity || 1)).toLocaleString()}
                  </p>
                </div>
              ))}
            </div>

            <div style={{ borderTop: "2px solid rgba(212, 175, 55, 0.2)", paddingTop: "20px" }}>
              <div style={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: "12px",
                color: "#b0b0b0",
              }}>
                <span>Subtotal:</span>
                <span>₹ {subtotal.toLocaleString()}</span>
              </div>
              <div style={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: "20px",
                color: "#b0b0b0",
              }}>
                <span>Tax (18%):</span>
                <span>₹ {Math.round(tax).toLocaleString()}</span>
              </div>
              <div style={{
                display: "flex",
                justifyContent: "space-between",
                fontSize: "18px",
                fontWeight: "700",
                color: "#d4af37",
                paddingTop: "15px",
                borderTop: "1px solid rgba(212, 175, 55, 0.2)",
              }}>
                <span>Total:</span>
                <span>₹ {Math.round(total).toLocaleString()}</span>
              </div>
            </div>

            <div style={{
              background: "rgba(212, 175, 55, 0.1)",
              border: "1px solid rgba(212, 175, 55, 0.2)",
              borderRadius: "4px",
              padding: "15px",
              marginTop: "20px",
            }}>
              <p style={{ color: "#d4af37", fontSize: "12px", fontWeight: "700", marginBottom: "8px" }}>
                🧪 TEST MODE
              </p>
              <p style={{ color: "#b0b0b0", fontSize: "11px", lineHeight: "1.6" }}>
                <strong>Card Details for Testing:</strong><br/>
                Card: 4111 1111 1111 1111<br/>
                Expiry: Any future date<br/>
                CVV: Any 3 digits
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;