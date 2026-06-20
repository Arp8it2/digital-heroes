"use client";

import Link from "next/link";
import { supabase } from "@/lib/supabase";

export default function Navbar() {
  const handleLogout = async () => {
    await supabase.auth.signOut();

    window.location.href = "/login";
  };

  return (
    <nav
      style={{
        padding: "15px",
        borderBottom: "1px solid #ddd",
        display: "flex",
        gap: "15px",
        flexWrap: "wrap",
      }}
    >
      <Link href="/">Home</Link>

      <Link href="/signup">Signup</Link>

      <Link href="/login">Login</Link>

      <Link href="/dashboard">Dashboard</Link>

      <Link href="/scores">Scores</Link>

      <Link href="/charities">Charities</Link>

      <Link href="/draws">Draws</Link>

      <Link href="/contributions">Contributions</Link>

      <Link href="/subscriptions">Subscriptions</Link>

      <Link href="/profile">Profile</Link>

      <Link href="/winners">Winners</Link>

      <Link href="/admin">Admin</Link>

      <Link href="/admin/users">Users</Link>

      <Link href="/admin/charities">Manage Charities</Link>

      <Link href="/help">Help</Link>

      <Link href="/contact">Contact</Link>

      <Link href="/privacy">Privacy</Link>

      <Link href="/terms">Terms</Link>

      <button onClick={handleLogout}>
        Logout
      </button>
    </nav>
  );
}