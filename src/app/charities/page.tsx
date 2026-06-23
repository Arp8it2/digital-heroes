import AuthGuard from "@/components/AuthGuard";

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

  const activeCount = charities.filter(
    (c) => c.is_active
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
          Charity Hub
        </p>

        <h1
          style={{
            fontSize: "72px",
            fontWeight: 900,
            marginTop: "10px",
            lineHeight: 1,
          }}
        >
          Charities
        </h1>

        <p
          style={{
            marginTop: "15px",
            fontSize: "20px",
            opacity: 0.95,
          }}
        >
          Support amazing causes and
          make a difference through golf.
        </p>
      </div>

      {/* STATS */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(auto-fit,minmax(250px,1fr))",
          gap: "20px",
          marginBottom: "30px",
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
            {charities.length}
          </h2>

          <p
            style={{
              color: "#94a3b8",
              marginTop: "8px",
            }}
          >
            Total Charities
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
            {activeCount}
          </h2>

          <p
            style={{
              color: "#94a3b8",
              marginTop: "8px",
            }}
          >
            Active Charities
          </p>
        </div>
      </div>

      {/* CHARITIES */}
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
          ❤️ Featured Charities
        </h2>

        {loading && (
          <div
            style={{
              textAlign: "center",
              padding: "40px",
            }}
          >
            Loading charities...
          </div>
        )}

        {!loading &&
          charities.length === 0 && (
            <div
              style={{
                textAlign: "center",
                padding: "40px",
                color: "#94a3b8",
              }}
            >
              No charities found.
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
          {charities.map((item) => (
            <div
              key={item.id}
              style={{
                background:
                  "linear-gradient(135deg,#1e293b,#334155)",
                border:
                  "1px solid #475569",
                borderRadius: "22px",
                overflow: "hidden",
                boxShadow:
                  "0 10px 25px rgba(0,0,0,.25)",
              }}
            >
              {item.image_url && (
                <img
                  src={item.image_url}
                  alt={item.name}
                  style={{
                    width: "100%",
                    height: "220px",
                    objectFit: "cover",
                  }}
                />
              )}

              <div
                style={{
                  padding: "22px",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent:
                      "space-between",
                    alignItems: "center",
                    marginBottom: "12px",
                  }}
                >
                  <h3
                    style={{
                      fontSize: "24px",
                      fontWeight: 800,
                    }}
                  >
                    {item.name}
                  </h3>

                  <span
                    style={{
                      background:
                        item.is_active
                          ? "linear-gradient(135deg,#00d26a,#22c55e)"
                          : "#475569",
                      color:
                        item.is_active
                          ? "#000"
                          : "#fff",
                      padding:
                        "6px 12px",
                      borderRadius:
                        "999px",
                      fontSize: "12px",
                      fontWeight: 700,
                    }}
                  >
                    {item.is_active
                      ? "ACTIVE"
                      : "INACTIVE"}
                  </span>
                </div>

                <p
                  style={{
                    color: "#cbd5e1",
                    lineHeight: 1.6,
                    marginBottom: "18px",
                  }}
                >
                  {item.description}
                </p>

                {item.website_url && (
                  <a
                    href={item.website_url}
                    target="_blank"
                    rel="noreferrer"
                    style={{
                      display:
                        "inline-block",
                      background:
                        "linear-gradient(135deg,#3b82f6,#2563eb)",
                      color: "white",
                      textDecoration:
                        "none",
                      padding:
                        "12px 18px",
                      borderRadius:
                        "12px",
                      fontWeight: 700,
                    }}
                  >
                    Visit Website →
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
    </AuthGuard>
  );
}