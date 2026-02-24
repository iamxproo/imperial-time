import { useCart } from "../../context/CartContext";

const CartItem = ({ item }) => {
  const { removeFromCart } = useCart();

  return (
    <div className="cart-item">
      <img
        src={item.image}
        alt={item.name}
        className="cart-img"
      />

      <div className="cart-info">
        <h3>{item.name}</h3>
        <p>₹ {item.price.toLocaleString()}</p>
        <p>Qty: {item.quantity}</p>

        <button onClick={() => removeFromCart(item.id)}>
          Remove
        </button>
      </div>
    </div>
  );
};

export default CartItem;