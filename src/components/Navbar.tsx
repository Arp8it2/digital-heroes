"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();

  const links = [
    { href: "/", label: "Home" },
    { href: "/dashboard", label: "Dashboard" },
    { href: "/scores", label: "Scores" },
    { href: "/draws", label: "Draws" },
    { href: "/winners", label: "Winners" },
    { href: "/charities", label: "Charities" },
    { href: "/subscriptions", label: "Subscriptions" },
    { href: "/contributions", label: "Contributions" },
    { href: "/profile", label: "Profile" },
    { href: "/login", label: "Login" },
    { href: "/signup", label: "Signup" },
    { href: "/contact", label: "Contact" },
    { href: "/help", label: "Help" },
    { href: "/privacy", label: "Privacy" },
    { href: "/terms", label: "Terms" },
    { href: "/admin", label: "Admin" },
  ];

  return (
    <nav style={styles.nav}>
      <div style={styles.logo}>🏌️ Golf Charity</div>

      <div style={styles.links}>
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            style={{
              ...styles.link,
              background:
                pathname === link.href ? "#2563eb" : "transparent",
            }}
          >
            {link.label}
          </Link>
        ))}
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

  logo: {
    fontWeight: "bold",
    fontSize: "18px",
  },

  links: {
    display: "flex",
    gap: "10px",
    flexWrap: "wrap",
  },

  link: {
    color: "white",
    padding: "6px 10px",
    borderRadius: "6px",
    textDecoration: "none",
    fontSize: "13px",
  },
};