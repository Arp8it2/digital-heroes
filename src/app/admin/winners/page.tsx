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

  const markAsPaid = async (
    id: string
  ) => {
    const { error } = await supabase
      .from("winners")
      .update({
        status: "paid",
      })
      .eq("id", id);

    if (error) {
      alert(error.message);
      return;
    }

    fetchWinners();
  };

  const deleteWinner = async (
    id: string
  ) => {
    if (
      !confirm(
        "Delete this winner?"
      )
    )
      return;

    const { error } = await supabase
      .from("winners")
      .delete()
      .eq("id", id);

    if (error) {
      alert(error.message);
      return;
    }

    fetchWinners();
  };

  const totalPrize =
    winners.reduce(
      (sum, item) =>
        sum +
        (item.prize_amount || 0),
      0
    );

  const paidCount =
    winners.filter(
      (w) =>
        w.status === "paid"
    ).length;

  return (
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
        }}
      >
        <p
          style={{
            fontWeight: 800,
            textTransform:
              "uppercase",
          }}
        >
          Admin Control Center
        </p>

        <h1
          style={{
            fontSize: "60px",
            fontWeight: 900,
            marginTop: "10px",
          }}
        >
          Manage Winners
        </h1>

        <p
          style={{
            marginTop: "10px",
          }}
        >
          View, manage and pay
          draw winners
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
              fontSize: "38px",
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
              fontSize: "38px",
              fontWeight: 900,
            }}
          >
            {paidCount}
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
              fontSize: "38px",
              fontWeight: 900,
              color: "#22c55e",
            }}
          >
            £{totalPrize}
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
          borderRadius: "24px",
          padding: "25px",
          border:
            "1px solid #23375d",
        }}
      >
        <h2
          style={{
            marginBottom: "20px",
          }}
        >
          🏆 Winner Records
        </h2>

        {loading && (
          <p>
            Loading winners...
          </p>
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
                border:
                  "1px solid #31496f",
                borderRadius:
                  "20px",
                padding: "20px",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent:
                    "space-between",
                  marginBottom:
                    "15px",
                }}
              >
                <span
                  style={{
                    background:
                      winner.status ===
                      "paid"
                        ? "#22c55e"
                        : "#f59e0b",
                    color: "#000",
                    padding:
                      "6px 12px",
                    borderRadius:
                      "999px",
                    fontWeight: 800,
                  }}
                >
                  {winner.status}
                </span>

                <span>
                  {winner.match_type}
                </span>
              </div>

              <h2
                style={{
                  fontSize: "42px",
                  fontWeight: 900,
                  color: "#22c55e",
                }}
              >
                £
                {
                  winner.prize_amount
                }
              </h2>

              <p
                style={{
                  marginTop: "15px",
                }}
              >
                <strong>
                  User ID:
                </strong>
                <br />
                {winner.user_id}
              </p>

              <p
                style={{
                  marginTop: "10px",
                }}
              >
                <strong>
                  Draw ID:
                </strong>
                <br />
                {winner.draw_id}
              </p>

              {winner.created_at && (
                <p
                  style={{
                    marginTop:
                      "12px",
                    color:
                      "#94a3b8",
                    fontSize:
                      "13px",
                  }}
                >
                  {new Date(
                    winner.created_at
                  ).toLocaleString()}
                </p>
              )}

              <div
                style={{
                  display: "flex",
                  gap: "10px",
                  marginTop: "20px",
                }}
              >
                {winner.status !==
                  "paid" && (
                  <button
                    onClick={() =>
                      markAsPaid(
                        winner.id
                      )
                    }
                    style={{
                      flex: 1,
                      border:
                        "none",
                      padding:
                        "10px",
                      borderRadius:
                        "10px",
                      background:
                        "#22c55e",
                      color:
                        "#000",
                      fontWeight: 700,
                      cursor:
                        "pointer",
                    }}
                  >
                    Mark Paid
                  </button>
                )}

                <button
                  onClick={() =>
                    deleteWinner(
                      winner.id
                    )
                  }
                  style={{
                    flex: 1,
                    border:
                      "none",
                    padding:
                      "10px",
                    borderRadius:
                      "10px",
                    background:
                      "#ef4444",
                    color:
                      "white",
                    fontWeight: 700,
                    cursor:
                      "pointer",
                  }}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}