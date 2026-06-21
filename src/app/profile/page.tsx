export default function Profile() {
  return (
    <main style={styles.main}>
      <h1>👤 Profile</h1>

      <p>User details will appear here</p>
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
};