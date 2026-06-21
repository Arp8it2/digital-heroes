"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function Dashboard() {
  const router = useRouter();

  const [user, setUser] = useState<any>(null);
  const [sub, setSub] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    init();
  }, []);

  const init = async () => {
    const { data: userData } = await supabase.auth.getUser();
    const user = userData.user;

    if (!user) {
      router.push("/login");
      return;
    }

    setUser(user);

    const { data } = await supabase
      .from("subscriptions")
      .select("*")
      .eq("user_id", user.id)
      .eq("status", "active")
      .single();

    setSub(data);
    setLoading(false);
  };

  // ⚡ QUICK ACTIONS

  const joinDraw = async () => {
    if (!user) return;

    const { error } = await supabase.from("contributions").insert([
      {
        user_id: user.id,
        amount: 0,
        status: "joined",
      },
    ]);

    if (error) {
      alert(error.message);
    } else {
      alert("🎯 Joined Draw Successfully");
    }
  };

  const viewWinners = () => {
    router.push("/winners");
  };

  const upgradePlan = () => {
    router.push("/subscriptions");
  };

  if (loading) {
    return (
      <main style={{ padding: 40 }}>
        <h2>Loading Dashboard...</h2>
      </main>
    );
  }

  return (
    <main style={{ padding: 40, color: "white" }}>
      
      {/* USER CARD */}
      <div style={card}>
        <h2>👤 User Info</h2>
        <p>Email: {user?.email}</p>
        <p>ID: {user?.id}</p>
      </div>

      {/* SUBSCRIPTION */}
      <div style={card}>
        <h2>💳 Subscription</h2>
        <p>Plan: {sub?.plan}</p>
        <p>Status: {sub?.status}</p>
        <p>Ends: {sub?.end_date}</p>
      </div>

      {/* QUICK ACTIONS */}
      <div style={card}>
        <h2>⚡ Quick Actions</h2>

        <button style={btn} onClick={joinDraw}>
          Join Draw
        </button>

        <button style={btn} onClick={viewWinners}>
          View Winners
        </button>

        <button style={btn} onClick={upgradePlan}>
          Upgrade Plan
        </button>
      </div>

    </main>
  );
}

// 🎨 UI STYLES

const card = {
  background: "#111",
  padding: "20px",
  marginBottom: "15px",
  borderRadius: "10px",
};

const btn = {
  marginRight: "10px",
  padding: "10px 15px",
  background: "green",
  color: "white",
  border: "none",
  borderRadius: "6px",
  cursor: "pointer",
};