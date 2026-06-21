import Link from "next/link";

export default function HomePage() {
  return (
    <main style={styles.main}>
      <h1>⛳ Golf Charity Platform</h1>

      <p style={{ color: "#cbd5e1", marginTop: "10px" }}>
        Play golf, submit scores, support charities & win monthly draws
      </p>

      <div style={styles.row}>
        <Link href="/signup">
          <button style={styles.btn}>Create Account</button>
        </Link>

        <Link href="/login">
          <button style={styles.btn}>Login</button>
        </Link>
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
  row: {
    marginTop: "30px",
    display: "flex",
    gap: "10px",
  },
  btn: {
    padding: "10px 15px",
    background: "#2563eb",
    color: "white",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
  },
};