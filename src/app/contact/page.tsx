export default function ContactPage() {
  return (
    <main style={styles.main}>
      <h1>📩 Contact</h1>

      <p>Email: support@golfcharity.com</p>
      <p>Phone: +91 6387716657</p>
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