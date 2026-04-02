import { useCart } from "../../context/CartContext";

const CartItem = ({ item }) => {
  const { removeFromCart } = useCart();

  // Resolve image: backend sends imageUrl, local cart items may have image
  const imgSrc = item.imageUrl || item.image || '';

  return (
    <div className="cart-item">
      <img
        src={imgSrc}
        alt={item.name}
        className="cart-img"
        onError={(e) => { e.target.style.display = 'none'; }}
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