"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export default function DrawsPage() {
  const [entries, setEntries] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    loadEntries();
  }, []);

  const loadEntries = async () => {
    try {
      setLoading(true);
      setError("");

      const { data, error } = await supabase
        .from("draw_entries")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) {
        setError(error.message);
        return;
      }

      setEntries(data || []);
    } catch (err: any) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main
      style={{
        padding: "40px",
        background: "#0f172a",
        minHeight: "100vh",
        color: "white",
      }}
    >
      <h1 style={{ marginBottom: "20px" }}>🎯 Draw Entries</h1>

      {loading && <p>Loading entries...</p>}

      {error && (
        <p style={{ color: "red" }}>{error}</p>
      )}

      {!loading && entries.length === 0 && (
        <p>No entries found</p>
      )}

      <div style={{ marginTop: "20px" }}>
        {entries.map((item) => (
          <div
            key={item.id}
            style={{
              padding: "15px",
              marginBottom: "10px",
              background: "#1e293b",
              borderRadius: "10px",
              border: "1px solid #334155",
            }}
          >
            <p>
              <b>User ID:</b> {item.user_id}
            </p>

            <p>
              <b>Draw ID:</b> {item.draw_id}
            </p>

            <p>
              <b>Match Type:</b> {item.match_type}
            </p>

            <p>
              <b>Match Count:</b> {item.match_count}
            </p>

            <p>
              <b>Scores:</b>{" "}
              {Array.isArray(item.scores)
                ? item.scores.join(", ")
                : item.scores}
            </p>
          </div>
        ))}
      </div>
    </main>
  );
}