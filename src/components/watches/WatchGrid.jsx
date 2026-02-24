import WatchCard from "./WatchCard";

const WatchGrid = ({ watches }) => {
  return (
    <div style={styles.grid}>
      {watches.map((w) => (
        <WatchCard key={w.id} watch={w} />
      ))}
    </div>
  );
};

const styles = {
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: "40px",
    padding: "80px",
  },
};

export default WatchGrid;