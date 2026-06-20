"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export default function AdminPage() {
  const [loading, setLoading] = useState(true);
  const [allowed, setAllowed] = useState(false);

  const [stats, setStats] = useState({
    users: 0,
    scores: 0,
    entries: 0,
    winners: 0,
  });

  useEffect(() => {
    checkAdmin();
  }, []);

  const checkAdmin = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      setLoading(false);
      return;
    }

    const { data: profile } = await supabase
      .from("profiles")
      .select("role")
      .eq("id", user.id)
      .single();

    if (profile?.role !== "admin") {
      setLoading(false);
      return;
    }

    setAllowed(true);

    const [
      usersResult,
      scoresResult,
      entriesResult,
      winnersResult,
    ] = await Promise.all([
      supabase
        .from("profiles")
        .select("*", { count: "exact", head: true }),

      supabase
        .from("scores")
        .select("*", { count: "exact", head: true }),

      supabase
        .from("draw_entries")
        .select("*", { count: "exact", head: true }),

      supabase
        .from("winners")
        .select("*", { count: "exact", head: true }),
    ]);

    setStats({
      users: usersResult.count || 0,
      scores: scoresResult.count || 0,
      entries: entriesResult.count || 0,
      winners: winnersResult.count || 0,
    });

    setLoading(false);
  };

  if (loading) {
    return (
      <main style={{ padding: "40px" }}>
        <h1>Loading...</h1>
      </main>
    );
  }

  if (!allowed) {
    return (
      <main style={{ padding: "40px" }}>
        <h1>Access Denied</h1>
        <p>Admin access required.</p>
      </main>
    );
  }

  return (
    <main style={{ padding: "40px" }}>
      <h1>Admin Dashboard</h1>

      <div style={{ marginTop: "20px" }}>
        <p>Total Users: {stats.users}</p>

        <p>
          Total Scores Submitted: {stats.scores}
        </p>

        <p>
          Total Draw Entries: {stats.entries}
        </p>

        <p>Total Winners: {stats.winners}</p>
      </div>
    </main>
  );
}