import { useParams } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { watches } from "../services/watchService";

const WatchDetails = () => {
  const { id } = useParams();
  const { addToCart } = useCart();

  const watch = watches.find(w => w.id === Number(id));

  if (!watch) {
    return (
      <div className="page-container">
        <h1>Watch not found</h1>
      </div>
    );
  }

  return (
    <div className="page-container">
      <h1>{watch.name}</h1>
      <p style={{ color: "gold" }}>{watch.collection}</p>
      <p style={{ fontSize: "22px" }}>₹ {watch.price.toLocaleString()}</p>

      <p style={{ maxWidth: "600px", marginTop: "20px" }}>
        {watch.description}
      </p>

      <button
        className="lux-btn"
        style={{ marginTop: "30px" }}
        onClick={() => {
          addToCart(watch);
          alert("Added to cart ✅");
        }}
      >
        Add to Cart
      </button>
    </div>
  );
};

export default WatchDetails;