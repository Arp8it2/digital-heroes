"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export default function DrawsPage() {
  const [entries, setEntries] = useState<any[]>([]);

  useEffect(() => {
    loadEntries();
  }, []);

  const loadEntries = async () => {
    const { data, error } = await supabase
      .from("draw_entries")
      .select("*");

    if (error) {
      alert(error.message);
      return;
    }

    setEntries(data || []);
  };

  return (
    <main style={styles.main}>
      <h1>🎯 Draw Entries</h1>

      <div style={{ marginTop: "20px" }}>
        {entries.map((item) => (
          <div key={item.id} style={styles.card}>
            <p><b>User:</b> {item.user_id}</p>
            <p><b>Draw:</b> {item.draw_id}</p>
            <p><b>Match Type:</b> {item.match_type}</p>
            <p><b>Match Count:</b> {item.match_count}</p>
            <p><b>Scores:</b> {item.scores?.join(", ")}</p>
          </div>
        ))}
      </div>
    </main>
  );
}

const styles = {
  main: {
    padding: "40px",
    minHeight: "100vh",
    background: "#0f172a",
    color: "white",
  },
  card: {
    padding: "15px",
    marginBottom: "10px",
    background: "#1e293b",
    borderRadius: "8px",
  },
};