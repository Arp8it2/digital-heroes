"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

type Subscription = {
  id: string;
  user_id: string;
  status: string;
  amount: number;
  start_date?: string;
  end_date?: string;
};

export default function SubscriptionsPage() {
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSubscriptions();
  }, []);

  const fetchSubscriptions = async () => {
    setLoading(true);

    const { data, error } = await supabase
      .from("subscriptions")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      alert(error.message);
      setLoading(false);
      return;
    }

    setSubscriptions(data || []);
    setLoading(false);
  };

  return (
    <main style={styles.main}>
      <h1 style={styles.title}>💳 Subscriptions</h1>

      {loading && <p>Loading subscriptions...</p>}

      {!loading && subscriptions.length === 0 && (
        <p>No subscriptions found.</p>
      )}

      <div style={styles.grid}>
        {subscriptions.map((item) => (
          <div key={item.id} style={styles.card}>
            <p>
              <b>User ID:</b>
              <br />
              {item.user_id}
            </p>

            <p>
              <b>Status:</b>{" "}
              <span
                style={{
                  color:
                    item.status === "active"
                      ? "lightgreen"
                      : "orange",
                }}
              >
                {item.status}
              </span>
            </p>

            <p>
              <b>Amount:</b> ₹{item.amount}
            </p>

            {item.start_date && (
              <p>
                <b>Start Date:</b>{" "}
                {new Date(item.start_date).toLocaleDateString()}
              </p>
            )}

            {item.end_date && (
              <p>
                <b>End Date:</b>{" "}
                {new Date(item.end_date).toLocaleDateString()}
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
};