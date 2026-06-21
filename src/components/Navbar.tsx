"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();

  const isActive = (path: string) => pathname === path;

  return (
    <nav style={styles.nav}>
      <div style={styles.left}>
        <b>🏌️ Golf Charity</b>
      </div>

      <div style={styles.links}>
        <Link href="/" style={isActive("/") ? styles.active : styles.link}>
          Home
        </Link>

        <Link
          href="/dashboard"
          style={isActive("/dashboard") ? styles.active : styles.link}
        >
          Dashboard
        </Link>

        <Link
          href="/scores"
          style={isActive("/scores") ? styles.active : styles.link}
        >
          Scores
        </Link>

        <Link
          href="/draws"
          style={isActive("/draws") ? styles.active : styles.link}
        >
          Draws
        </Link>

        <Link
          href="/winners"
          style={isActive("/winners") ? styles.active : styles.link}
        >
          Winners
        </Link>

        <Link
          href="/charities"
          style={isActive("/charities") ? styles.active : styles.link}
        >
          Charities
        </Link>

        <Link
          href="/subscriptions"
          style={isActive("/subscriptions") ? styles.active : styles.link}
        >
          Subscription
        </Link>

        <Link
          href="/login"
          style={isActive("/login") ? styles.active : styles.link}
        >
          Login
        </Link>
      </div>
    </nav>
  );
}

const styles: { [key: string]: React.CSSProperties } = {
  nav: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "15px 20px",
    background: "#1e293b",
    color: "white",
    flexWrap: "wrap",
  },

  left: {
    fontSize: "18px",
  },

  links: {
    display: "flex",
    gap: "12px",
    flexWrap: "wrap",
  },

  link: {
    color: "#cbd5e1",
    textDecoration: "none",
    padding: "6px 10px",
    borderRadius: "6px",
  },

  active: {
    color: "white",
    background: "#2563eb",
    textDecoration: "none",
    padding: "6px 10px",
    borderRadius: "6px",
  },
};