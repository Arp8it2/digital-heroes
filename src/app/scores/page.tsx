"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";

export default function ScoresPage() {
  const [score, setScore] = useState("");
  const [scoreDate, setScoreDate] = useState("");

  const submitScore = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      alert("Please login first");
      return;
    }

    if (!scoreDate) {
      alert("Please select a date");
      return;
    }

    const scoreValue = Number(score);

    if (scoreValue < 1 || scoreValue > 45) {
      alert("Score must be between 1 and 45");
      return;
    }

    // Duplicate date check
    const { data: existing } = await supabase
      .from("scores")
      .select("id")
      .eq("user_id", user.id)
      .eq("score_date", scoreDate);

    if (existing && existing.length > 0) {
      alert(
        "A score already exists for this date. Edit or delete it instead."
      );
      return;
    }

    // Current scores
    const { data: currentScores } = await supabase
      .from("scores")
      .select("*")
      .eq("user_id", user.id)
      .order("score_date", { ascending: true });

    // Keep only latest 5 scores
    if (currentScores && currentScores.length >= 5) {
      const oldest = currentScores[0];

      await supabase
        .from("scores")
        .delete()
        .eq("id", oldest.id);
    }

    const { error } = await supabase
      .from("scores")
      .insert([
        {
          user_id: user.id,
          score: scoreValue,
          score_date: scoreDate,
        },
      ]);

    if (error) {
      alert(error.message);
      console.log(error);
      return;
    }

    alert("Score Submitted Successfully");

    setScore("");
    setScoreDate("");
  };

  return (
    <main style={{ padding: "40px" }}>
      <h1>Submit Golf Score</h1>

      <input
        type="number"
        min="1"
        max="45"
        placeholder="Score (1-45)"
        value={score}
        onChange={(e) => setScore(e.target.value)}
      />

      <br />
      <br />

      <input
        type="date"
        value={scoreDate}
        onChange={(e) =>
          setScoreDate(e.target.value)
        }
      />

      <br />
      <br />

      <button onClick={submitScore}>
        Submit Score
      </button>
    </main>
  );
}