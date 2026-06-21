"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

type Contribution = {
  id: string;
  user_id: string;
  charity_id: string;
  amount: number;
  created_at?: string;
};

export default function ContributionsPage() {
  const [contributions, setContributions] = useState<Contribution[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchContributions();
  }, []);

  const fetchContributions = async () => {
    setLoading(true);

    const { data, error } = await supabase
      .from("contributions")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      alert(error.message);
      setLoading(false);
      return;
    }

    setContributions(data || []);
    setLoading(false);
  };

  return (
    <main style={styles.main}>
      <h1 style={styles.title}>💝 Contributions</h1>

      {loading && <p>Loading contributions...</p>}

      {!loading && contributions.length === 0 && (
        <p>No contributions found.</p>
      )}

      <div style={styles.grid}>
        {contributions.map((item) => (
          <div key={item.id} style={styles.card}>
            <p>
              <b>User ID:</b>
              <br />
              {item.user_id}
            </p>

            <p>
              <b>Charity ID:</b>
              <br />
              {item.charity_id}
            </p>

            <p>
              <b>Amount:</b> ₹{item.amount}
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