import "./globals.css";

export const metadata = {
  title: "Golf Charity Platform",
  description: "Play golf, support charities, and win monthly draws",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <div style={styles.wrapper}>
          <nav style={styles.nav}>
            <a href="/">Home</a>
            <a href="/dashboard">Dashboard</a>
            <a href="/scores">Scores</a>
            <a href="/draws">Draws</a>
            <a href="/winners">Winners</a>
            <a href="/charities">Charities</a>
            <a href="/subscriptions">Subscriptions</a>
            <a href="/login">Login</a>
          </nav>

          <main style={styles.main}>{children}</main>
        </div>
      </body>
    </html>
  );
}

const styles: { [key: string]: React.CSSProperties } = {
  wrapper: {
    minHeight: "100vh",
    background: "#0f172a",
    color: "white",
  },

  nav: {
    display: "flex",
    gap: "15px",
    padding: "15px 20px",
    background: "#1e293b",
    flexWrap: "wrap",
  },

  main: {
    padding: "20px",
  },
};