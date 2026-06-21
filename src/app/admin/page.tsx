export default function Admin() {
  return (
    <main style={styles.main}>
      <h1>⚙ Admin Panel</h1>

      <div style={styles.card}>
        <p>Manage Users</p>
      </div>

      <div style={styles.card}>
        <p>Manage Draws</p>
      </div>

      <div style={styles.card}>
        <p>Manage Winners</p>
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