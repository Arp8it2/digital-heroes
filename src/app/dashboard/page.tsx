export default function Dashboard() {
  return (
    <main style={styles.main}>
      <h1>📊 Dashboard</h1>

      <div style={styles.card}>
        <h3>Scores</h3>
        <p>View your performance</p>
      </div>

      <div style={styles.card}>
        <h3>Subscription</h3>
        <p>Active / Inactive</p>
      </div>

      <div style={styles.card}>
        <h3>Draws</h3>
        <p>Monthly winner system</p>
      </div>
    </main>
  );
}

const styles = {
  main: {
    padding: "40px",
    minHeight: "100vh",
    background: "#0f172a",
    color: "white",
  },
  card: {
    marginTop: "15px",
    padding: "15px",
    background: "#1e293b",
    borderRadius: "8px",
  },
};