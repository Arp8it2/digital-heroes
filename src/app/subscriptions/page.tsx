"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export default function SubscriptionsPage() {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    getUser();
  }, []);

  const getUser = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    setUser(user);
  };

  const activate = async () => {
    if (!user) return;

    const start = new Date();
    const end = new Date();
    end.setDate(start.getDate() + 30);

    const { error } = await supabase.from("subscriptions").insert([
      {
        user_id: user.id,
        plan: "basic",
        status: "active",
        start_date: start,
        end_date: end,
      },
    ]);

    if (error) {
      alert(error.message);
      return;
    }

    alert("Subscription Activated 🚀");
  };

  return (
    <main style={{ padding: "40px", color: "white" }}>
      <h1>💳 Subscription</h1>

      <button
        onClick={activate}
        style={{
          padding: "10px 20px",
          background: "green",
          color: "white",
        }}
      >
        Activate 30 Days Plan
      </button>
    </main>
  );
}