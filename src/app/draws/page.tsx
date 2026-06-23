"use client";
import AuthGuard from "@/components/AuthGuard";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export default function DrawsPage() {
  const [entries, setEntries] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

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
    setLoading(false);
  };

  return (
    <AuthGuard>
      <main
        style={{
          minHeight: "100vh",
          background: "#020b24",
          color: "white",
          padding: "30px",
      }}
    >
      {/* HERO */}
      <div
        style={{
          background:
            "linear-gradient(90deg,#00d26a,#b7f34d)",
          borderRadius: "30px",
          padding: "35px",
          color: "#000",
          marginBottom: "25px",
          boxShadow: "0 15px 35px rgba(0,0,0,0.25)",
        }}
      >
        <p
          style={{
            fontSize: "12px",
            fontWeight: 700,
            textTransform: "uppercase",
            opacity: 0.8,
          }}
        >
          Monthly Charity Draw
        </p>

        <h1
          style={{
            fontSize: "52px",
            fontWeight: 900,
            marginTop: "10px",
          }}
        >
          Draw Entries
        </h1>

        <p
          style={{
            marginTop: "12px",
            fontSize: "18px",
          }}
        >
          Track all your active draw entries and match results.
        </p>
      </div>

      {/* STATS */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(auto-fit,minmax(220px,1fr))",
          gap: "20px",
          marginBottom: "30px",
        }}
      >
        <div
          style={{
            background: "#1a2740",
            border: "1px solid #23375d",
            borderRadius: "24px",
            padding: "25px",
          }}
        >
          <h2
            style={{
              fontSize: "36px",
              fontWeight: 900,
            }}
          >
            {entries.length}
          </h2>
          <p style={{ color: "#94a3b8" }}>
            Total Entries
          </p>
        </div>

        <div
          style={{
            background: "#1a2740",
            border: "1px solid #23375d",
            borderRadius: "24px",
            padding: "25px",
          }}
        >
          <h2
            style={{
              fontSize: "36px",
              fontWeight: 900,
            }}
          >
            Active
          </h2>
          <p style={{ color: "#94a3b8" }}>
            Current Draw Status
          </p>
        </div>

        <div
          style={{
            background: "#1a2740",
            border: "1px solid #23375d",
            borderRadius: "24px",
            padding: "25px",
          }}
        >
          <h2
            style={{
              fontSize: "36px",
              fontWeight: 900,
            }}
          >
            £10,000
          </h2>
          <p style={{ color: "#94a3b8" }}>
            Prize Pool
          </p>
        </div>
      </div>

      {/* ENTRIES */}
      <div
        style={{
          background: "#1a2740",
          border: "1px solid #23375d",
          borderRadius: "24px",
          padding: "25px",
        }}
      >
        <h2
          style={{
            fontSize: "28px",
            marginBottom: "20px",
          }}
        >
          🎯 My Draw Entries
        </h2>

        {loading && (
          <p style={{ color: "#94a3b8" }}>
            Loading entries...
          </p>
        )}

        {!loading && entries.length === 0 && (
          <div
            style={{
              textAlign: "center",
              padding: "50px",
              color: "#94a3b8",
            }}
          >
            No draw entries found.
          </div>
        )}

        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit,minmax(320px,1fr))",
            gap: "20px",
          }}
        >
          {entries.map((item) => (
            <div
              key={item.id}
              style={{
                background: "#22314f",
                border: "1px solid #31496f",
                borderRadius: "20px",
                padding: "20px",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent:
                    "space-between",
                  marginBottom: "15px",
                }}
              >
                <span
                  style={{
                    background:
                      "linear-gradient(90deg,#00d26a,#b7f34d)",
                    color: "#000",
                    padding:
                      "6px 12px",
                    borderRadius: "999px",
                    fontWeight: 700,
                  }}
                >
                  Draw #{item.draw_id}
                </span>

                <span
                  style={{
                    color: "#94a3b8",
                  }}
                >
                  {item.match_count} Matches
                </span>
              </div>

              <p>
                <strong>User:</strong>{" "}
                {item.user_id}
              </p>

              <p
                style={{
                  marginTop: "8px",
                }}
              >
                <strong>Match Type:</strong>{" "}
                {item.match_type}
              </p>

              <p
                style={{
                  marginTop: "8px",
                }}
              >
                <strong>Scores:</strong>{" "}
                {item.scores?.join(", ") ||
                  "N/A"}
              </p>

              <button
                style={{
                  marginTop: "18px",
                  width: "100%",
                  padding: "12px",
                  border: "none",
                  borderRadius: "14px",
                  background:
                    "linear-gradient(90deg,#00d26a,#b7f34d)",
                  color: "#000",
                  fontWeight: 800,
                  cursor: "pointer",
                }}
              >
                View Entry
              </button>
            </div>
          ))}
        </div>
      </div>
    </main>
  </AuthGuard>
  );
}