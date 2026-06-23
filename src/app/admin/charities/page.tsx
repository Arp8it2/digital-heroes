"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export default function AdminCharitiesPage() {
  const [charities, setCharities] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [website, setWebsite] = useState("");

  useEffect(() => {
    fetchCharities();
  }, []);

  const fetchCharities = async () => {
    setLoading(true);

    const { data } = await supabase
      .from("charities")
      .select("*")
      .order("created_at", { ascending: false });

    setCharities(data || []);
    setLoading(false);
  };

  const createCharity = async () => {
    if (!name) {
      alert("Enter charity name");
      return;
    }

    const { error } = await supabase
      .from("charities")
      .insert([
        {
          name,
          description,
          website_url: website,
          is_active: true,
        },
      ]);

    if (error) {
      alert(error.message);
      return;
    }

    setName("");
    setDescription("");
    setWebsite("");

    fetchCharities();
  };

  const deleteCharity = async (id: string) => {
    if (!confirm("Delete this charity?")) return;

    const { error } = await supabase
      .from("charities")
      .delete()
      .eq("id", id);

    if (error) {
      alert(error.message);
      return;
    }

    fetchCharities();
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
          Manage Charities
        </h1>

        <p style={{ marginTop: "10px" }}>
          Create and manage charity partners
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
            border: "1px solid #23375d",
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
            {charities.length}
          </h2>

          <p style={{ color: "#94a3b8" }}>
            Total Charities
          </p>
        </div>
      </div>

      {/* CREATE */}
      <div
        style={{
          background: "#1a2740",
          borderRadius: "24px",
          padding: "25px",
          marginBottom: "25px",
          border: "1px solid #23375d",
        }}
      >
        <h2>➕ Create New Charity</h2>

        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit,minmax(250px,1fr))",
            gap: "15px",
            marginTop: "20px",
          }}
        >
          <input
            placeholder="Charity Name"
            value={name}
            onChange={(e) =>
              setName(e.target.value)
            }
            style={inputStyle}
          />

          <input
            placeholder="Website URL"
            value={website}
            onChange={(e) =>
              setWebsite(e.target.value)
            }
            style={inputStyle}
          />

          <input
            placeholder="Description"
            value={description}
            onChange={(e) =>
              setDescription(e.target.value)
            }
            style={inputStyle}
          />

          <button
            onClick={createCharity}
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
            Create Charity
          </button>
        </div>
      </div>

      {/* LIST */}
      <div
        style={{
          background: "#1a2740",
          borderRadius: "24px",
          padding: "25px",
          border: "1px solid #23375d",
        }}
      >
        <h2 style={{ marginBottom: "20px" }}>
          ❤️ Charity List
        </h2>

        {loading && <p>Loading charities...</p>}

        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit,minmax(320px,1fr))",
            gap: "20px",
          }}
        >
          {charities.map((charity) => (
            <div
              key={charity.id}
              style={{
                background: "#22314f",
                border: "1px solid #31496f",
                borderRadius: "20px",
                padding: "20px",
              }}
            >
              <h3
                style={{
                  fontSize: "26px",
                  marginBottom: "10px",
                }}
              >
                {charity.name}
              </h3>

              <p
                style={{
                  color: "#cbd5e1",
                  marginBottom: "10px",
                }}
              >
                {charity.description}
              </p>

              <p>
                Status:{" "}
                {charity.is_active
                  ? "🟢 Active"
                  : "🔴 Inactive"}
              </p>

              <button
                onClick={() =>
                  deleteCharity(charity.id)
                }
                style={{
                  marginTop: "15px",
                  background: "#ef4444",
                  color: "white",
                  border: "none",
                  padding: "10px 16px",
                  borderRadius: "10px",
                  cursor: "pointer",
                }}
              >
                Delete
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