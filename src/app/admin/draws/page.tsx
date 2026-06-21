"use client";

import { supabase } from "@/lib/supabase";

export default function AdminDrawsPage() {
  const runDraw = async () => {
    // 1. get published draw
    const { data: draw } = await supabase
      .from("draws")
      .select("*")
      .eq("status", "published")
      .single();

    if (!draw) {
      alert("No active draw found");
      return;
    }

    // 2. get entries
    const { data: entries } = await supabase
      .from("draw_entries")
      .select("*")
      .eq("draw_id", draw.id);

    if (!entries || entries.length === 0) {
      alert("No entries found");
      return;
    }

    let winner;

    // RANDOM MODE
    if (draw.mode === "random") {
      winner =
        entries[Math.floor(Math.random() * entries.length)];
    }

    // ALGORITHM MODE
    else {
      const sorted = [...entries].sort(
        (a, b) => b.match_count - a.match_count
      );

      winner = sorted[0];
    }

    // 3. insert winner
    await supabase.from("winners").insert([
      {
        draw_id: draw.id,
        user_id: winner.user_id,
        prize_amount: draw.jackpot_amount,
        status: "pending",
      },
    ]);

    // 4. update draw
    await supabase
      .from("draws")
      .update({ status: "completed" })
      .eq("id", draw.id);

    alert("🎉 Winner Selected!");
  };

  return (
    <main style={{ padding: "40px" }}>
      <h1>Admin Draw System</h1>

      <button
        onClick={runDraw}
        style={{
          padding: "10px 20px",
          background: "green",
          color: "white",
          border: "none",
          borderRadius: "6px",
        }}
      >
        Run Draw
      </button>
    </main>
  );
}