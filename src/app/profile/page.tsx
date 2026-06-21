"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export default function ProfilePage() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getUser();
  }, []);

  const getUser = async () => {
    const { data } = await supabase.auth.getUser();

    console.log("USER DATA:", data);

    if (data?.user) {
      setUser(data.user);
    }

    setLoading(false);
  };

  if (loading) {
    return <h2 style={{ padding: 40 }}>Loading Profile...</h2>;
  }

  if (!user) {
    return <h2 style={{ padding: 40 }}>No user found ❌</h2>;
  }

  return (
    <main style={{ padding: 40, color: "white" }}>
      <h1>👤 Profile Page</h1>

      <div style={card}>
        <p><b>Email:</b> {user.email}</p>
        <p><b>User ID:</b> {user.id}</p>
        <p><b>Created:</b> {user.created_at}</p>
      </div>
    </main>
  );
}

const card = {
  background: "#111",
  padding: "20px",
  borderRadius: "10px",
  marginTop: "20px",
};