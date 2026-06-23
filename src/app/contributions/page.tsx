"use client";
import AuthGuard from "@/components/AuthGuard";

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
  const [contributions, setContributions] = useState<
    Contribution[]
  >([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchContributions();
  }, []);

  const fetchContributions = async () => {
    setLoading(true);

    const { data, error } = await supabase
      .from("contributions")
      .select("*")
      .order("created_at", {
        ascending: false,
      });

    if (error) {
      alert(error.message);
      setLoading(false);
      return;
    }

    setContributions(data || []);
    setLoading(false);
  };

  const totalAmount = contributions.reduce(
    (sum, item) => sum + item.amount,
    0
  );

  const highestDonation =
    contributions.length > 0
      ? Math.max(
          ...contributions.map(
            (item) => item.amount
          )
        )
      : 0;

  const averageDonation =
    contributions.length > 0
      ? Math.round(
          totalAmount /
            contributions.length
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
            "linear-gradient(90deg,#00d26a,#b7f34d)",
          borderRadius: "30px",
          padding: "35px",
          color: "#000",
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
          Charity Dashboard
        </p>

        <h1
          style={{
            fontSize: "60px",
            fontWeight: 900,
            marginTop: "10px",
          }}
        >
          Contributions
        </h1>

        <p
          style={{
            marginTop: "10px",
            fontSize: "18px",
          }}
        >
          Track donations and support
          charities worldwide.
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
            {contributions.length}
          </h2>

          <p
            style={{
              color: "#94a3b8",
            }}
          >
            Total Donations
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
            ₹{totalAmount}
          </h2>

          <p
            style={{
              color: "#94a3b8",
            }}
          >
            Total Raised
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
            ₹{highestDonation}
          </h2>

          <p
            style={{
              color: "#94a3b8",
            }}
          >
            Highest Donation
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
            ₹{averageDonation}
          </h2>

          <p
            style={{
              color: "#94a3b8",
            }}
          >
            Average Donation
          </p>
        </div>
      </div>

      {/* DONATION HISTORY */}
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
          💝 Donation History
        </h2>

        {loading && (
          <p>
            Loading contributions...
          </p>
        )}

        {!loading &&
          contributions.length === 0 && (
            <p>
              No contributions found.
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
          {contributions.map(
            (item, index) => (
              <div
                key={item.id}
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
                        "linear-gradient(90deg,#00d26a,#b7f34d)",
                      color:
                        "#000",
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
                    Donation
                  </span>
                </div>

                <h3
                  style={{
                    fontSize:
                      "42px",
                    fontWeight:
                      900,
                  }}
                >
                  ₹{item.amount}
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
                  {item.user_id}
                </p>

                <p
                  style={{
                    color:
                      "#94a3b8",
                    marginTop:
                      "10px",
                  }}
                >
                  Charity:
                  <br />
                  {item.charity_id}
                </p>

                {item.created_at && (
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
                      item.created_at
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