"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export default function AdminDrawsPage() {
  const [draws, setDraws] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const [drawMonth, setDrawMonth] = useState("");
  const [mode, setMode] = useState("random");
  const [jackpot, setJackpot] = useState("");

  useEffect(() => {
    fetchDraws();
  }, []);

  const fetchDraws = async () => {
    setLoading(true);

    const { data, error } = await supabase
      .from("draws")
      .select("*")
      .order("draw_month", {
        ascending: false,
      });

    if (!error) {
      setDraws(data || []);
    }

    setLoading(false);
  };

  const createDraw = async () => {
    if (!drawMonth || !jackpot) {
      alert("Fill all fields");
      return;
    }

    const { error } = await supabase
      .from("draws")
      .insert([
        {
          draw_month: drawMonth,
          mode,
          jackpot_amount: Number(jackpot),
          status: "draft",
        },
      ]);

    if (error) {
      alert(error.message);
      return;
    }

    setDrawMonth("");
    setJackpot("");

    fetchDraws();
  };

  const deleteDraw = async (id: string) => {
    const confirmDelete = confirm(
      "Delete this draw?"
    );

    if (!confirmDelete) return;

    const { error } = await supabase
      .from("draws")
      .delete()
      .eq("id", id);

    if (error) {
      alert(error.message);
      return;
    }

    fetchDraws();
  };

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
            textTransform: "uppercase",
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
          Manage Draws
        </h1>

        <p style={{ marginTop: "10px" }}>
          Create and manage monthly draws
        </p>
      </div>

      {/* CREATE DRAW */}
      <div
        style={{
          background: "#1a2740",
          borderRadius: "24px",
          padding: "25px",
          marginBottom: "25px",
          border: "1px solid #23375d",
        }}
      >
        <h2
          style={{
            marginBottom: "20px",
          }}
        >
          ➕ Create New Draw
        </h2>

        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit,minmax(220px,1fr))",
            gap: "15px",
          }}
        >
          <input
            type="date"
            value={drawMonth}
            onChange={(e) =>
              setDrawMonth(e.target.value)
            }
            style={inputStyle}
          />

          <select
            value={mode}
            onChange={(e) =>
              setMode(e.target.value)
            }
            style={inputStyle}
          >
            <option value="random">
              Random
            </option>

            <option value="manual">
              Manual
            </option>
          </select>

          <input
            type="number"
            placeholder="Jackpot Amount"
            value={jackpot}
            onChange={(e) =>
              setJackpot(e.target.value)
            }
            style={inputStyle}
          />

          <button
            onClick={createDraw}
            style={{
              border: "none",
              borderRadius: "14px",
              fontWeight: 800,
              cursor: "pointer",
              background:
                "linear-gradient(90deg,#00d26a,#b7f34d)",
              color: "#000",
            }}
          >
            Create Draw
          </button>
        </div>
      </div>

      {/* DRAW LIST */}
      <div
        style={{
          background: "#1a2740",
          borderRadius: "24px",
          padding: "25px",
          border: "1px solid #23375d",
        }}
      >
        <h2
          style={{
            marginBottom: "20px",
          }}
        >
          🎯 Existing Draws
        </h2>

        {loading && (
          <p>Loading draws...</p>
        )}

        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit,minmax(300px,1fr))",
            gap: "20px",
          }}
        >
          {draws.map((draw) => (
            <div
              key={draw.id}
              style={{
                background: "#22314f",
                border:
                  "1px solid #31496f",
                borderRadius: "20px",
                padding: "20px",
              }}
            >
              <h3
                style={{
                  fontSize: "24px",
                  marginBottom: "10px",
                }}
              >
                {draw.draw_month}
              </h3>

              <p>
                <b>Mode:</b>{" "}
                {draw.mode}
              </p>

              <p>
                <b>Status:</b>{" "}
                {draw.status}
              </p>

              <p>
                <b>Jackpot:</b> £
                {draw.jackpot_amount}
              </p>

              <button
                onClick={() =>
                  deleteDraw(draw.id)
                }
                style={{
                  marginTop: "15px",
                  background:
                    "#ef4444",
                  color: "white",
                  border: "none",
                  padding:
                    "10px 16px",
                  borderRadius:
                    "10px",
                  cursor: "pointer",
                }}
              >
                Delete Draw
              </button>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}

const inputStyle = {
  padding: "14px",
  borderRadius: "12px",
  border: "1px solid #334155",
  background: "#0f172a",
  color: "white",
};