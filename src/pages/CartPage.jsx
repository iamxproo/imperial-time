import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

const CartPage = () => {
  const { cart, removeFromCart } = useCart();

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="page-container">
      <style>{`
        @keyframes slideInCart {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .cart-item-card {
          animation: slideInCart 0.5s ease-out;
        }

        @keyframes pulse {
          0%, 100% { box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5); }
          50% { box-shadow: 0 15px 50px rgba(212, 175, 55, 0.2); }
        }

        .empty-cart-icon {
          font-size: 80px;
          margin-bottom: 20px;
          animation: pulse 2s ease-in-out infinite;
        }
      `}</style>

      <div style={{ textAlign: "center", marginBottom: "60px" }}>
        <h1 style={{ marginBottom: "15px" }}>Your Shopping Cart</h1>
        <p style={{ color: "#b0b0b0", fontSize: "16px" }}>
          {cart.length === 0 ? "Your cart is empty" : `${cart.length} item${cart.length !== 1 ? 's' : ''} in your cart`}
        </p>
      </div>

      {cart.length === 0 ? (
        <div style={{
          textAlign: "center",
          padding: "80px 40px",
          background: "linear-gradient(135deg, rgba(42, 42, 42, 0.5) 0%, rgba(26, 26, 26, 0.5) 100%)",
          borderRadius: "8px",
          border: "2px solid rgba(212, 175, 55, 0.2)",
        }}>
          <div className="empty-cart-icon">🛒</div>
          <h2 style={{ color: "#d4af37", marginBottom: "15px" }}>Cart is Empty</h2>
          <p style={{ color: "#b0b0b0", marginBottom: "30px", fontSize: "16px" }}>
            Add premium timepieces to your collection
          </p>
          <Link to="/collections">
            <button className="lux-btn">
              Continue Shopping
            </button>
          </Link>
        </div>
      ) : (
        <>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "40px", marginBottom: "60px" }}>
            {cart.map((item, idx) => (
              <div
                key={item.id}
                className="cart-item-card"
                style={{
                  background: "linear-gradient(135deg, rgba(42, 42, 42, 0.8) 0%, rgba(26, 26, 26, 0.8) 100%)",
                  border: "2px solid rgba(212, 175, 55, 0.3)",
                  borderRadius: "8px",
                  padding: "20px",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  minHeight: "500px",
                  transition: "all 0.3s ease",
                  boxShadow: "0 10px 30px rgba(0, 0, 0, 0.5)",
                  animation: `slideInCart 0.5s ease-out ${idx * 0.1}s backwards`,
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = "#d4af37";
                  e.currentTarget.style.boxShadow = "0 20px 50px rgba(212, 175, 55, 0.3)";
                  e.currentTarget.style.transform = "translateY(-5px)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "rgba(212, 175, 55, 0.3)";
                  e.currentTarget.style.boxShadow = "0 10px 30px rgba(0, 0, 0, 0.5)";
                  e.currentTarget.style.transform = "translateY(0)";
                }}
              >
                <div>
                  {/* Badge */}
                  <div
                    style={{
                      display: "inline-block",
                      background: "#d4af37",
                      color: "#0a0a0a",
                      padding: "6px 12px",
                      borderRadius: "20px",
                      fontSize: "11px",
                      fontWeight: "600",
                      marginBottom: "15px",
                      letterSpacing: "1px",
                    }}
                  >
                    IN STOCK
                  </div>

                  <img
                    src={item.image}
                    alt={item.name}
                    style={{
                      width: "100%",
                      height: "220px",
                      objectFit: "contain",
                      marginBottom: "20px",
                      display: "block",
                      transition: "transform 0.3s ease",
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.transform = "scale(1.05)";
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.transform = "scale(1)";
                    }}
                  />

                  <h3 style={{
                    marginBottom: "15px",
                    color: "#ffffff",
                    fontSize: "18px",
                    fontWeight: "600",
                    lineHeight: "1.4",
                  }}>
                    {item.name}
                  </h3>

                  <div style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gap: "15px",
                    marginBottom: "15px",
                    padding: "15px",
                    background: "rgba(212, 175, 55, 0.05)",
                    borderRadius: "4px",
                    border: "1px solid rgba(212, 175, 55, 0.2)",
                  }}>
                    <div>
                      <p style={{ color: "#b0b0b0", fontSize: "12px", marginBottom: "5px" }}>QUANTITY</p>
                      <p style={{ color: "#d4af37", fontSize: "18px", fontWeight: "700" }}>
                        {item.quantity}
                      </p>
                    </div>
                    <div>
                      <p style={{ color: "#b0b0b0", fontSize: "12px", marginBottom: "5px" }}>UNIT PRICE</p>
                      <p style={{ color: "#d4af37", fontSize: "18px", fontWeight: "700" }}>
                        ₹ {(item.price / item.quantity).toLocaleString()}
                      </p>
                    </div>
                  </div>

                  <div style={{
                    padding: "15px",
                    background: "linear-gradient(135deg, rgba(212, 175, 55, 0.1) 0%, rgba(201, 169, 97, 0.1) 100%)",
                    borderRadius: "4px",
                    borderLeft: "3px solid #d4af37",
                  }}>
                    <p style={{ color: "#b0b0b0", fontSize: "12px", marginBottom: "5px", letterSpacing: "1px" }}>ITEM TOTAL</p>
                    <p style={{ color: "#d4af37", fontSize: "22px", fontWeight: "bold" }}>
                      ₹ {item.price.toLocaleString()}
                    </p>
                  </div>
                </div>

                <button
                  className="lux-btn"
                  onClick={() => removeFromCart(item.id)}
                  style={{
                    width: "100%",
                    padding: "12px",
                    marginTop: "20px",
                    background: "rgba(217, 83, 79, 0.1)",
                    border: "2px solid rgba(217, 83, 79, 0.4)",
                    color: "#ff6b6b",
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.background = "rgba(217, 83, 79, 0.3)";
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.background = "rgba(217, 83, 79, 0.1)";
                  }}
                >
                  Remove from Cart
                </button>
              </div>
            ))}
          </div>

          <div style={{
            background: "linear-gradient(135deg, rgba(42, 42, 42, 0.8) 0%, rgba(26, 26, 26, 0.8) 100%)",
            border: "2px solid rgba(212, 175, 55, 0.3)",
            borderRadius: "8px",
            padding: "40px",
            boxShadow: "0 20px 60px rgba(0, 0, 0, 0.5)",
          }}>
            <div style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: "30px",
              marginBottom: "40px",
              paddingBottom: "40px",
              borderBottom: "1px solid rgba(212, 175, 55, 0.2)",
            }}>
              <div>
                <p style={{ color: "#b0b0b0", fontSize: "12px", letterSpacing: "1px", marginBottom: "8px" }}>SUBTOTAL</p>
                <p style={{ color: "#d4af37", fontSize: "20px", fontWeight: "700" }}>
                  ₹ {total.toLocaleString()}
                </p>
              </div>
              <div>
                <p style={{ color: "#b0b0b0", fontSize: "12px", letterSpacing: "1px", marginBottom: "8px" }}>SHIPPING</p>
                <p style={{ color: "#d4af37", fontSize: "20px", fontWeight: "700" }}>
                  FREE
                </p>
              </div>
              <div>
                <p style={{ color: "#b0b0b0", fontSize: "12px", letterSpacing: "1px", marginBottom: "8px" }}>TAX (18%)</p>
                <p style={{ color: "#d4af37", fontSize: "20px", fontWeight: "700" }}>
                  ₹ {(total * 0.18).toLocaleString()}
                </p>
              </div>
            </div>

            <div style={{
              display: "grid",
              gridTemplateColumns: "1fr auto",
              alignItems: "center",
              gap: "30px",
              marginBottom: "30px",
              paddingBottom: "30px",
              borderBottom: "1px solid rgba(212, 175, 55, 0.2)",
            }}>
              <div></div>
              <div style={{ textAlign: "right" }}>
                <p style={{ color: "#b0b0b0", fontSize: "12px", letterSpacing: "1px", marginBottom: "8px" }}>GRAND TOTAL</p>
                <h2 style={{ margin: "0", color: "#d4af37", fontSize: "36px", fontWeight: "700" }}>
                  ₹ {(total + total * 0.18).toLocaleString()}
                </h2>
              </div>
            </div>

            <div style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "20px",
            }}>
              <Link to="/collections" style={{ textDecoration: "none" }}>
                <button
                  style={{
                    width: "100%",
                    padding: "14px",
                    background: "transparent",
                    border: "2px solid #d4af37",
                    color: "#d4af37",
                    borderRadius: "4px",
                    cursor: "pointer",
                    fontWeight: "700",
                    fontSize: "14px",
                    letterSpacing: "1px",
                    textTransform: "uppercase",
                    transition: "all 0.3s ease",
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.background = "#d4af37";
                    e.target.style.color = "#0a0a0a";
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.background = "transparent";
                    e.target.style.color = "#d4af37";
                  }}
                >
                  Continue Shopping
                </button>
              </Link>

              <Link to="/checkout" style={{ textDecoration: "none" }}>
                <button
                  className="lux-btn"
                  style={{
                    width: "100%",
                    padding: "14px",
                  }}
                >
                  Proceed to Checkout
                </button>
              </Link>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default CartPage;