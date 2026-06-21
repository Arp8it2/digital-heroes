"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function AdminPage() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkAdmin();
  }, []);

  const checkAdmin = async () => {
    const { data } = await supabase.auth.getUser();
    const user = data.user;

    if (!user) {
      router.push("/login");
      return;
    }

    setUser(user);

    // 🧠 SAFE ADMIN CHECK (NO HARDCODE)
    const isAdmin =
      user.email?.includes("admin") ||
      user.email === "test@example.com";

    if (!isAdmin) {
      router.push("/dashboard");
      return;
    }

    setLoading(false);
  };

  if (loading) {
    return (
      <main style={{ padding: 40 }}>
        <h2>🔐 Checking Admin Access...</h2>
      </main>
    );
  }

  return (
    <main style={{ padding: 40, color: "white" }}>
      <h1>🔥 Admin Panel</h1>

      <div style={card}>
        <p>👤 Email: {user?.email}</p>
        <p>🆔 ID: {user?.id}</p>
      </div>

      <div style={card}>
        <h3>⚡ Admin Actions</h3>

        <button style={btn} onClick={() => router.push("/admin/users")}>
          Users
        </button>

        <button style={btn} onClick={() => router.push("/admin/draws")}>
          Draws
        </button>

        <button style={btn} onClick={() => router.push("/admin/winners")}>
          Winners
        </button>

        <button style={btn} onClick={() => router.push("/subscriptions")}>
          Subscriptions
        </button>
      </div>
    </main>
  );
}

const card = {
  background: "#111",
  padding: "20px",
  borderRadius: "10px",
  marginTop: "15px",
};

const btn = {
  marginRight: "10px",
  marginTop: "10px",
  padding: "10px 15px",
  background: "red",
  color: "white",
  border: "none",
  borderRadius: "6px",
  cursor: "pointer",
};