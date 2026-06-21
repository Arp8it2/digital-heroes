"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

type Draw = {
  id: string;
  mode: "random" | "algorithmic";
  status: string;
  jackpot_amount: number;
  created_at?: string;
};

export default function AdminDrawsPage() {
  const [draws, setDraws] = useState<Draw[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDraws();
  }, []);

  const fetchDraws = async () => {
    setLoading(true);

    const { data, error } = await supabase
      .from("draws")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      alert(error.message);
      setLoading(false);
      return;
    }

    setDraws(data || []);
    setLoading(false);
  };

  return (
    <main style={styles.main}>
      <h1 style={styles.title}>🎯 Admin Draws</h1>

      {loading && <p>Loading draws...</p>}

      {!loading && draws.length === 0 && (
        <p>No draws found.</p>
      )}

      <div style={styles.grid}>
        {draws.map((draw) => (
          <div key={draw.id} style={styles.card}>
            <h2>Draw ID</h2>
            <p style={styles.small}>{draw.id}</p>

            <p>
              <b>Mode:</b> {draw.mode}
            </p>

            <p>
              <b>Status:</b>{" "}
              <span
                style={{
                  color:
                    draw.status === "published"
                      ? "lightgreen"
                      : "orange",
                }}
              >
                {draw.status}
              </span>
            </p>

            <p>
              <b>Jackpot:</b> ₹{draw.jackpot_amount}
            </p>
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
    wordBreak: "break-word",
  },
};