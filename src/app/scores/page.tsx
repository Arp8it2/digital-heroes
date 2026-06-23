"use client";
import AuthGuard from "@/components/AuthGuard";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export default function ScoresPage() {
  const [scores, setScores] = useState<any[]>([]);
  const [score, setScore] = useState("");

  useEffect(() => {
    loadScores();
  }, []);

  const loadScores = async () => {
    const { data } = await supabase
      .from("scores")
      .select("*")
      .order("score", { ascending: false });

    setScores(data || []);
  };

  const addScore = async () => {
    if (!score) return;

    const { error } = await supabase
      .from("scores")
      .insert([
        {
          score: Number(score),
          user_id: "manual-user",
        },
      ]);

    if (error) {
      alert(error.message);
      return;
    }

    setScore("");
    loadScores();
  };

  const bestScore =
    scores.length > 0
      ? Math.max(...scores.map((s) => s.score))
      : 0;

  const avgScore =
    scores.length > 0
      ? Math.round(
          scores.reduce(
            (a, b) => a + b.score,
            0
          ) / scores.length
        )
      : 0;

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
            "linear-gradient(135deg,#00d26a 0%,#22c55e 25%,#3b82f6 65%,#7c3aed 100%)",
          borderRadius: "32px",
          padding: "40px",
          marginBottom: "30px",
          color: "white",
          boxShadow:
            "0 20px 50px rgba(0,0,0,.35)",
        }}
      >
        <p
          style={{
            fontSize: "18px",
            fontWeight: 800,
            textTransform: "uppercase",
            letterSpacing: "3px",
          }}
        >
          Performance Center
        </p>

        <h1
          style={{
            fontSize: "72px",
            fontWeight: 900,
            marginTop: "10px",
            lineHeight: 1,
          }}
        >
          Leaderboard
        </h1>

        <p
          style={{
            marginTop: "15px",
            fontSize: "20px",
            opacity: 0.95,
          }}
        >
          Track scores, climb rankings and
          compete with players across the platform.
        </p>
      </div>

      {/* STATS */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(auto-fit,minmax(240px,1fr))",
          gap: "20px",
          marginBottom: "25px",
        }}
      >
        <div
          style={{
            background:
              "linear-gradient(135deg,#1e293b,#334155)",
            borderRadius: "24px",
            padding: "25px",
            boxShadow:
              "0 10px 25px rgba(0,0,0,.25)",
          }}
        >
          <h2
            style={{
              fontSize: "42px",
              fontWeight: 900,
            }}
          >
            {scores.length}
          </h2>

          <p
            style={{
              color: "#94a3b8",
              marginTop: "8px",
            }}
          >
            Total Scores
          </p>
        </div>

        <div
          style={{
            background:
              "linear-gradient(135deg,#1e293b,#334155)",
            borderRadius: "24px",
            padding: "25px",
            boxShadow:
              "0 10px 25px rgba(0,0,0,.25)",
          }}
        >
          <h2
            style={{
              fontSize: "42px",
              fontWeight: 900,
              color: "#22c55e",
            }}
          >
            {bestScore}
          </h2>

          <p
            style={{
              color: "#94a3b8",
              marginTop: "8px",
            }}
          >
            Best Score
          </p>
        </div>

        <div
          style={{
            background:
              "linear-gradient(135deg,#1e293b,#334155)",
            borderRadius: "24px",
            padding: "25px",
            boxShadow:
              "0 10px 25px rgba(0,0,0,.25)",
          }}
        >
          <h2
            style={{
              fontSize: "42px",
              fontWeight: 900,
              color: "#60a5fa",
            }}
          >
            {avgScore}
          </h2>

          <p
            style={{
              color: "#94a3b8",
              marginTop: "8px",
            }}
          >
            Average Score
          </p>
        </div>
      </div>

      {/* ADD SCORE */}
      <div
        style={{
          background:
            "linear-gradient(135deg,#1e293b,#334155)",
          borderRadius: "24px",
          padding: "25px",
          marginBottom: "25px",
          boxShadow:
            "0 10px 25px rgba(0,0,0,.25)",
        }}
      >
        <h2
          style={{
            fontSize: "24px",
            marginBottom: "15px",
          }}
        >
          ➕ Add New Score
        </h2>

        <div
          style={{
            display: "flex",
            gap: "15px",
          }}
        >
          <input
            value={score}
            onChange={(e) =>
              setScore(e.target.value)
            }
            placeholder="Enter score"
            style={{
              flex: 1,
              padding: "15px",
              borderRadius: "14px",
              border:
                "1px solid #475569",
              background: "#0f172a",
              color: "white",
              fontSize: "16px",
            }}
          />

          <button
            onClick={addScore}
            style={{
              padding:
                "15px 35px",
              border: "none",
              borderRadius: "14px",
              fontWeight: 800,
              cursor: "pointer",
              background:
                "linear-gradient(135deg,#00d26a,#22c55e)",
              color: "#000",
              fontSize: "16px",
            }}
          >
            Add Score
          </button>
        </div>
      </div>

      {/* TOP SCORES */}
      <div
        style={{
          background:
            "linear-gradient(135deg,#1e293b,#334155)",
          borderRadius: "24px",
          padding: "25px",
          boxShadow:
            "0 10px 25px rgba(0,0,0,.25)",
        }}
      >
        <h2
          style={{
            fontSize: "28px",
            marginBottom: "20px",
          }}
        >
          🏆 Top Scores
        </h2>

        {scores.length === 0 && (
          <div
            style={{
              textAlign: "center",
              padding: "40px",
              color: "#94a3b8",
            }}
          >
            No scores found.
          </div>
        )}

        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit,minmax(280px,1fr))",
            gap: "20px",
          }}
        >
          {scores.map((item, index) => (
            <div
              key={index}
              style={{
                background:
                  "linear-gradient(135deg,#1e293b,#334155)",
                border:
                  "1px solid #475569",
                borderRadius: "20px",
                padding: "22px",
                boxShadow:
                  "0 10px 25px rgba(0,0,0,.25)",
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
                      "linear-gradient(135deg,#00d26a,#22c55e)",
                    color: "#000",
                    padding:
                      "7px 14px",
                    borderRadius: "999px",
                    fontWeight: 800,
                  }}
                >
                  #{index + 1}
                </span>

                <span
                  style={{
                    color: "#94a3b8",
                  }}
                >
                  Score
                </span>
              </div>

              <h3
                style={{
                  fontSize: "56px",
                  fontWeight: 900,
                  color: "#22c55e",
                }}
              >
                {item.score}
              </h3>

              <p
                style={{
                  color: "#94a3b8",
                  marginTop: "12px",
                }}
              >
                User: {item.user_id}
              </p>
            </div>
          ))}
        </div>
      </div>
    </main>
    </AuthGuard>
  );
}