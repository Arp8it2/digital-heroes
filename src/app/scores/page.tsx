"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

type Score = {
  id: string;
  user_id: string;
  course_name?: string;
  score: number;
  created_at?: string;
};

export default function ScoresPage() {
  const [scores, setScores] = useState<Score[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchScores();
  }, []);

  const fetchScores = async () => {
    setLoading(true);

    const { data, error } = await supabase
      .from("scores")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      alert(error.message);
      setLoading(false);
      return;
    }

    setScores(data || []);
    setLoading(false);
  };

  return (
    <main style={styles.main}>
      <h1 style={styles.title}>🏌️ Scores</h1>

      {loading && <p>Loading scores...</p>}

      {!loading && scores.length === 0 && (
        <p>No scores found.</p>
      )}

      <div style={styles.grid}>
        {scores.map((item) => (
          <div key={item.id} style={styles.card}>
            <p>
              <b>User:</b> {item.user_id}
            </p>

            <p>
              <b>Course:</b>{" "}
              {item.course_name || "N/A"}
            </p>

            <p>
              <b>Score:</b> {item.score}
            </p>

            {item.created_at && (
              <p style={styles.small}>
                {new Date(item.created_at).toLocaleString()}
              </p>
            )}
          </div>
        ))}
      </div>
    </main>
  );
}

const styles: { [key: string]: React.CSSProperties } = {
  main: {
    padding: "40px",
    minHeight: "100vh",
    background: "#0f172a",
    color: "#fff",
    fontFamily: "sans-serif",
  },

  title: {
    fontSize: "28px",
    marginBottom: "20px",
  },

  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
    gap: "15px",
  },

  card: {
    background: "#1e293b",
    padding: "15px",
    borderRadius: "10px",
  },

  small: {
    fontSize: "12px",
    opacity: 0.7,
  },
};