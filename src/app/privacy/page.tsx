export default function PrivacyPage() {
  return (
    <main style={styles.main}>
      <h1 style={styles.title}>🔒 Privacy Policy</h1>

      <p style={styles.text}>
        We respect your privacy. This platform collects only necessary data to
        provide golf scoring, draws, and charity contributions.
      </p>

      <h2 style={styles.subtitle}>1. Data We Collect</h2>
      <p style={styles.text}>
        We collect email, user activity, scores, and transaction data.
      </p>

      <h2 style={styles.subtitle}>2. How We Use Data</h2>
      <p style={styles.text}>
        Data is used for authentication, leaderboard, draws, and improving
        user experience.
      </p>

      <h2 style={styles.subtitle}>3. Data Security</h2>
      <p style={styles.text}>
        Your data is stored securely using Supabase and encrypted systems.
      </p>

      <h2 style={styles.subtitle}>4. Contact</h2>
      <p style={styles.text}>
        For privacy concerns, contact: support@golfcharity.com
      </p>
    </main>
  );
}

const styles: { [key: string]: React.CSSProperties } = {
  main: {
    padding: "40px",
    minHeight: "100vh",
    background: "#0f172a",
    color: "#fff",
    fontFamily: "sans-serif",
  },

  title: {
    fontSize: "28px",
    marginBottom: "20px",
  },

  subtitle: {
    marginTop: "20px",
    fontSize: "18px",
  },

  text: {
    fontSize: "14px",
    opacity: 0.9,
    lineHeight: "1.6",
  },
};