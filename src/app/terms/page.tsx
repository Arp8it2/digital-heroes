export default function TermsPage() {
  return (
    <main style={styles.main}>
      <h1 style={styles.title}>📄 Terms & Conditions</h1>

      <p style={styles.text}>
        By using this platform, you agree to the following terms and conditions.
      </p>

      <h2 style={styles.subtitle}>1. Eligibility</h2>
      <p style={styles.text}>
        Users must be 18+ or have permission to use the platform.
      </p>

      <h2 style={styles.subtitle}>2. Usage Rules</h2>
      <p style={styles.text}>
        You agree not to misuse the platform, manipulate scores, or attempt fraud.
      </p>

      <h2 style={styles.subtitle}>3. Payments</h2>
      <p style={styles.text}>
        All payments are processed securely through third-party payment providers.
      </p>

      <h2 style={styles.subtitle}>4. Draw System</h2>
      <p style={styles.text}>
        Winners are selected based on the defined random or algorithmic system.
      </p>

      <h2 style={styles.subtitle}>5. Changes</h2>
      <p style={styles.text}>
        We may update these terms at any time without prior notice.
      </p>

      <h2 style={styles.subtitle}>Contact</h2>
      <p style={styles.text}>
        For queries: support@golfcharity.com
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