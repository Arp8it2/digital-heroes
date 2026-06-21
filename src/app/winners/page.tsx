"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

type Winner = {
  id: string;
  draw_id: string;
  user_id: string;
  match_type: string;
  prize_amount: number;
  status: string;
  created_at?: string;
};

export default function WinnersPage() {
  const [winners, setWinners] = useState<Winner[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchWinners();
  }, []);

  const fetchWinners = async () => {
    setLoading(true);

    const { data, error } = await supabase
      .from("winners")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      alert(error.message);
      setLoading(false);
      return;
    }

    setWinners(data || []);
    setLoading(false);
  };

  return (
    <main style={styles.main}>
      <h1 style={styles.title}>🏆 Winners</h1>

      {loading && <p>Loading winners...</p>}

      {!loading && winners.length === 0 && (
        <p>No winners yet.</p>
      )}

      <div style={styles.grid}>
        {winners.map((w) => (
          <div key={w.id} style={styles.card}>
            <h2>Winner</h2>

            <p>
              <b>User ID:</b>
              <br />
              {w.user_id}
            </p>

            <p>
              <b>Draw ID:</b>
              <br />
              {w.draw_id}
            </p>

            <p>
              <b>Match Type:</b> {w.match_type}
            </p>

            <p>
              <b>Prize:</b> ₹{w.prize_amount}
            </p>

            <p>
              <b>Status:</b>{" "}
              <span
                style={{
                  color:
                    w.status === "paid"
                      ? "lightgreen"
                      : "orange",
                }}
              >
                {w.status}
              </span>
            </p>

            {w.created_at && (
              <p style={styles.small}>
                {new Date(w.created_at).toLocaleString()}
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