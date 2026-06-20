"use client";

import { useState } from "react";

export default function ScoreForm() {
  const [score, setScore] = useState("");

  return (
    <div>
      <h3>Add Score</h3>

      <input
        value={score}
        onChange={(e) => setScore(e.target.value)}
        placeholder="Enter score"
      />

      <button onClick={() => alert(`Score Saved: ${score}`)}>
        Save Score
      </button>
    </div>
  );
}