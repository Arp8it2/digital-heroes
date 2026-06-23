import AuthGuard from "@/components/AuthGuard";

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
      return;
    }

    setWinners(data || []);
    setLoading(false);
  };

  const totalPrize = winners.reduce(
    (sum, item) => sum + Number(item.prize_amount || 0),
    0
  );

  return (
    <AuthGuard>
      <main
        style={{
      height: "100vh",
      overflow: "hidden",
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
          boxShadow: "0 15px 35px rgba(0,0,0,.25)",
        }}
      >
        <p
          style={{
            fontSize: "18px",
            fontWeight: 700,
            textTransform: "uppercase",
            letterSpacing: "2  px",
          }}
        >
          Hall Of Fame
        </p>

        <h1
          style={{
            fontSize: "54px",
            fontWeight: 900,
            marginTop: "10px",
          }}
        >
          Winners
        </h1>

        <p
          style={{
            marginTop: "10px",
            fontSize: "18px",
          }}
        >
          Celebrate our latest draw winners and prize payouts.
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
            {winners.length}
          </h2>

          <p style={{ color: "#94a3b8" }}>
            Total Winners
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
            ₹{totalPrize.toLocaleString()}
          </h2>

          <p style={{ color: "#94a3b8" }}>
            Prize Paid
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
            Monthly
          </h2>

          <p style={{ color: "#94a3b8" }}>
            Draw Cycle
          </p>
        </div>
      </div>

      {/* WINNERS SECTION */}
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
          🏆 Latest Winners
        </h2>

        {loading && (
          <p style={{ color: "#94a3b8" }}>
            Loading winners...
          </p>
        )}

        {!loading && winners.length === 0 && (
          <div
            style={{
              textAlign: "center",
              padding: "50px",
              color: "#94a3b8",
            }}
          >
            No winners yet.
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
          {winners.map((winner) => (
            <div
              key={winner.id}
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
                  alignItems: "center",
                  marginBottom: "15px",
                }}
              >
                <span
                  style={{
                    background:
                      "linear-gradient(90deg,#00d26a,#b7f34d)",
                    color: "#000",
                    padding:
                      "6px 14px",
                    borderRadius: "999px",
                    fontWeight: 700,
                  }}
                >
                  Draw #{winner.draw_id}
                </span>

                <span
                  style={{
                    color:
                      winner.status ===
                      "paid"
                        ? "#22c55e"
                        : "#f59e0b",
                    fontWeight: 700,
                  }}
                >
                  {winner.status}
                </span>
              </div>

              <h3
                style={{
                  fontSize: "22px",
                  marginBottom: "10px",
                }}
              >
                🏆 Winner
              </h3>

              <p>
                <strong>User ID:</strong>
                <br />
                {winner.user_id}
              </p>

              <p
                style={{
                  marginTop: "10px",
                }}
              >
                <strong>
                  Match Type:
                </strong>{" "}
                {winner.match_type}
              </p>

              <p
                style={{
                  marginTop: "10px",
                  fontSize: "22px",
                  fontWeight: 800,
                  color: "#00d26a",
                }}
              >
                ₹
                {Number(
                  winner.prize_amount
                ).toLocaleString()}
              </p>

              {winner.created_at && (
                <p
                  style={{
                    marginTop: "15px",
                    fontSize: "12px",
                    color: "#94a3b8",
                  }}
                >
                  {new Date(
                    winner.created_at
                  ).toLocaleString()}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    </main>
    </AuthGuard>
  );
}