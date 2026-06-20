"use client";

import { supabase } from "@/lib/supabase";

export default function AdminDrawsPage() {
  const runDraw = async () => {
    const { data: draw, error: drawError } =
      await supabase
        .from("draws")
        .select("*")
        .eq("status", "published")
        .single();

    console.log("DRAW =", draw);
    console.log(
      "DRAW ERROR =",
      drawError
    );

    if (drawError || !draw) {
      alert("No published draw found");
      return;
    }

    const { data: entries, error } =
      await supabase
        .from("draw_entries")
        .select("*")
        .eq("draw_id", draw.id);

    console.log(
      "ENTRIES =",
      entries
    );

    console.log(
      "ENTRIES ERROR =",
      error
    );

    if (error) {
      alert(error.message);
      return;
    }

    if (
      !entries ||
      entries.length === 0
    ) {
      alert(
        "No draw entries found"
      );
      return;
    }

    let winner;

    // RANDOM DRAW
    if (draw.mode === "random") {
      winner =
        entries[
          Math.floor(
            Math.random() *
              entries.length
          )
        ];
    }

    // ALGORITHMIC DRAW
    else {
      const sorted =
        [...entries].sort(
          (a, b) =>
            b.match_count -
            a.match_count
        );

      winner = sorted[0];
    }

    console.log(
      "WINNER =",
      winner
    );

    const {
      error: winnerError,
    } = await supabase
      .from("winners")
      .insert([
        {
          draw_id: draw.id,
          draw_entry_id:
            winner.id,
          user_id:
            winner.user_id,
          match_type:
            winner.match_type,
          prize_amount:
            draw.jackpot_amount,
          status:
            "pending",
        },
      ]);

    console.log(
      "WINNER ERROR =",
      winnerError
    );

    if (winnerError) {
      alert(
        winnerError.message
      );
      return;
    }

    await supabase
      .from("draws")
      .update({
        status:
          "simulation",
      })
      .eq("id", draw.id);

    alert(
      `Winner Selected (${draw.mode})`
    );
  };

  return (
    <main
      style={{
        padding: "40px",
      }}
    >
      <h1>
        Admin Draw Management
      </h1>

      <p>
        Random Mode =
        Random Winner
      </p>

      <p>
        Algorithmic Mode =
        Highest Match Count
        Wins
      </p>

      <button
        onClick={runDraw}
      >
        Run Draw
      </button>
    </main>
  );
}