"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

type Charity = {
  id: string;
  name: string;
  description: string;
  image_url?: string;
  website_url?: string;
  is_active?: boolean;
};

export default function CharitiesPage() {
  const [charities, setCharities] = useState<Charity[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCharities();
  }, []);

  const fetchCharities = async () => {
    setLoading(true);

    const { data, error } = await supabase
      .from("charities")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      alert(error.message);
      setLoading(false);
      return;
    }

    setCharities(data || []);
    setLoading(false);
  };

  return (
    <main style={styles.main}>
      <h1 style={styles.title}>💰 Charities</h1>

      {loading && <p>Loading charities...</p>}

      {!loading && charities.length === 0 && (
        <p>No charities found.</p>
      )}

      <div style={styles.grid}>
        {charities.map((item) => (
          <div key={item.id} style={styles.card}>
            <h2>{item.name}</h2>

            <p style={styles.desc}>
              {item.description}
            </p>

            {item.image_url && (
              <img
                src={item.image_url}
                style={styles.image}
              />
            )}

            <p>
              <b>Website:</b>{" "}
              <a
                href={item.website_url}
                target="_blank"
                style={styles.link}
              >
                {item.website_url}
              </a>
            </p>

            <p>
              Status:{" "}
              {item.is_active
                ? "🟢 Active"
                : "🔴 Inactive"}
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

  desc: {
    fontSize: "14px",
    opacity: 0.9,
  },

  image: {
    width: "100%",
    height: "180px",
    objectFit: "cover",
    borderRadius: "8px",
    marginTop: "10px",
  },

  link: {
    color: "#60a5fa",
  },
};