"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();

  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    getUser();

    const { data: listener } = supabase.auth.onAuthStateChange(
      () => {
        getUser();
      }
    );

    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);

  const getUser = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    setUser(user);
  };

  const logout = async () => {
    await supabase.auth.signOut();
    setUser(null);
    router.push("/login");
  };

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
    { href: "/contact", label: "Contact" },
    { href: "/help", label: "Help" },
    { href: "/privacy", label: "Privacy" },
    { href: "/terms", label: "Terms" },
    { href: "/admin", label: "Admin" },
  ];

  return (
    <nav style={styles.nav}>
      <div style={styles.logo}>🏌️ Digital Heroes</div>

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

        {/* AUTH SECTION */}
        <div style={{ marginLeft: "10px" }}>
          {user ? (
            <button onClick={logout} style={styles.logout}>
              Logout
            </button>
          ) : (
            <Link href="/login" style={styles.loginBtn}>
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}

const styles: any = {
  nav: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "15px 20px",
    background: "#0f172a",
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
    alignItems: "center",
  },

  link: {
    color: "white",
    padding: "6px 10px",
    borderRadius: "6px",
    textDecoration: "none",
    fontSize: "13px",
  },

  logout: {
    background: "red",
    color: "white",
    border: "none",
    padding: "6px 10px",
    borderRadius: "6px",
    cursor: "pointer",
  },

  loginBtn: {
    background: "green",
    color: "white",
    padding: "6px 10px",
    borderRadius: "6px",
    textDecoration: "none",
  },
};