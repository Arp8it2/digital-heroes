"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export default function ScoresPage() {
  const [scores, setScores] = useState<any[]>([]);
  const [score, setScore] = useState("");

  useEffect(() => {
    loadScores();
  }, []);

  const loadScores = async () => {
    const { data } = await supabase
      .from("scores")
      .select("*")
      .order("score", { ascending: false });

    setScores(data || []);
  };

  const addScore = async () => {
    if (!score) return;

    const { error } = await supabase.from("scores").insert([
      {
        score: Number(score),
        user_id: "manual-user",
      },
    ]);

    if (error) {
      alert(error.message);
      return;
    }

    setScore("");
    loadScores();
  };

  return (
    <main style={{ padding: "40px", color: "white" }}>
      <h1>🏆 Leaderboard</h1>

      {/* ADD SCORE */}
      <div style={{ marginBottom: "20px" }}>
        <input
          value={score}
          onChange={(e) => setScore(e.target.value)}
          placeholder="Enter score"
          style={{
            padding: "10px",
            marginRight: "10px",
          }}
        />

        <button onClick={addScore}>
          Add Score
        </button>
      </div>

      {/* LEADERBOARD */}
      <div>
        {scores.map((s, i) => (
          <div
            key={i}
            style={{
              padding: "10px",
              margin: "5px 0",
              background: "#1e293b",
              borderRadius: "8px",
            }}
          >
            <b>#{i + 1}</b> — Score: {s.score}
          </div>
        ))}
      </div>
    </main>
  );
}