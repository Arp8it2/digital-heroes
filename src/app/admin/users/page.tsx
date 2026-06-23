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

export default function AdminWinnersPage() {
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
      .order("created_at", {
        ascending: false,
      });

    if (error) {
      alert(error.message);
      setLoading(false);
      return;
    }

    setWinners(data || []);
    setLoading(false);
  };

  const totalPrize = winners.reduce(
    (sum, winner) =>
      sum + (winner.prize_amount || 0),
    0
  );

  const paidWinners = winners.filter(
    (winner) =>
      winner.status?.toLowerCase() ===
      "paid"
  ).length;

  const pendingWinners = winners.filter(
    (winner) =>
      winner.status?.toLowerCase() !==
      "paid"
  ).length;

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
            "linear-gradient(90deg,#f59e0b,#f97316,#ef4444)",
          borderRadius: "30px",
          padding: "35px",
          color: "#fff",
          marginBottom: "25px",
          boxShadow:
            "0 15px 35px rgba(0,0,0,.25)",
        }}
      >
        <p
          style={{
            fontSize: "16px",
            fontWeight: 800,
            textTransform: "uppercase",
            letterSpacing: "2px",
          }}
        >
          Admin Dashboard
        </p>

        <h1
          style={{
            fontSize: "60px",
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
          Manage draw winners and
          prize payouts.
        </p>
      </div>

      {/* STATS */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(auto-fit,minmax(220px,1fr))",
          gap: "20px",
          marginBottom: "25px",
        }}
      >
        <div
          style={{
            background: "#1a2740",
            border:
              "1px solid #23375d",
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

          <p
            style={{
              color: "#94a3b8",
            }}
          >
            Total Winners
          </p>
        </div>

        <div
          style={{
            background: "#1a2740",
            border:
              "1px solid #23375d",
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
            {paidWinners}
          </h2>

          <p
            style={{
              color: "#94a3b8",
            }}
          >
            Paid Winners
          </p>
        </div>

        <div
          style={{
            background: "#1a2740",
            border:
              "1px solid #23375d",
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
            {pendingWinners}
          </h2>

          <p
            style={{
              color: "#94a3b8",
            }}
          >
            Pending Winners
          </p>
        </div>

        <div
          style={{
            background: "#1a2740",
            border:
              "1px solid #23375d",
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
            ₹{totalPrize}
          </h2>

          <p
            style={{
              color: "#94a3b8",
            }}
          >
            Total Prize Pool
          </p>
        </div>
      </div>

      {/* WINNERS */}
      <div
        style={{
          background: "#1a2740",
          border:
            "1px solid #23375d",
          borderRadius: "24px",
          padding: "25px",
        }}
      >
        <h2
          style={{
            marginBottom: "20px",
          }}
        >
          🏆 Winners List
        </h2>

        {loading && (
          <p>Loading winners...</p>
        )}

        {!loading &&
          winners.length === 0 && (
            <p>
              No winners found.
            </p>
          )}

        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit,minmax(280px,1fr))",
            gap: "20px",
          }}
        >
          {winners.map(
            (winner, index) => (
              <div
                key={winner.id}
                style={{
                  background:
                    "#22314f",
                  border:
                    "1px solid #31496f",
                  borderRadius:
                    "20px",
                  padding:
                    "20px",
                }}
              >
                <div
                  style={{
                    display:
                      "flex",
                    justifyContent:
                      "space-between",
                    marginBottom:
                      "15px",
                  }}
                >
                  <span
                    style={{
                      background:
                        "linear-gradient(90deg,#f59e0b,#f97316)",
                      color:
                        "#fff",
                      padding:
                        "6px 14px",
                      borderRadius:
                        "999px",
                      fontWeight: 800,
                    }}
                  >
                    #{index + 1}
                  </span>

                  <span>
                    Winner
                  </span>
                </div>

                <h3
                  style={{
                    fontSize:
                      "40px",
                    fontWeight:
                      900,
                  }}
                >
                  ₹
                  {
                    winner.prize_amount
                  }
                </h3>

                <p
                  style={{
                    color:
                      "#94a3b8",
                    marginTop:
                      "10px",
                  }}
                >
                  User:
                  <br />
                  {
                    winner.user_id
                  }
                </p>

                <p
                  style={{
                    color:
                      "#94a3b8",
                    marginTop:
                      "10px",
                  }}
                >
                  Draw:
                  <br />
                  {
                    winner.draw_id
                  }
                </p>

                <p
                  style={{
                    marginTop:
                      "12px",
                  }}
                >
                  Match Type:
                  {" "}
                  {
                    winner.match_type
                  }
                </p>

                <div
                  style={{
                    marginTop:
                      "15px",
                  }}
                >
                  <span
                    style={{
                      background:
                        winner.status ===
                        "paid"
                          ? "#16a34a"
                          : "#f59e0b",
                      color:
                        "white",
                      padding:
                        "6px 12px",
                      borderRadius:
                        "999px",
                      fontWeight: 700,
                    }}
                  >
                    {
                      winner.status
                    }
                  </span>
                </div>

                {winner.created_at && (
                  <p
                    style={{
                      color:
                        "#64748b",
                      marginTop:
                        "15px",
                      fontSize:
                        "12px",
                    }}
                  >
                    {new Date(
                      winner.created_at
                    ).toLocaleString()}
                  </p>
                )}
              </div>
            )
          )}
        </div>
      </div>
    </main>
    </AuthGuard>
  );
}