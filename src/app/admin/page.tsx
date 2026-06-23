"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { isAdmin } from "@/lib/auth";

export default function AdminPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkAdmin();
  }, []);

  const checkAdmin = async () => {
    const admin = await isAdmin();

    if (!admin) {
      router.push("/dashboard");
    } else {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <main
        style={{
          minHeight: "100vh",
          background: "#020b24",
          color: "white",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "22px",
          fontWeight: 700,
        }}
      >
        Checking Admin Access...
      </main>
    );
  }

  const cardStyle = {
    background: "#1a2740",
    border: "1px solid #23375d",
    borderRadius: "24px",
    padding: "25px",
    cursor: "pointer",
    transition: ".3s",
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
            "linear-gradient(90deg,#ef4444,#f97316,#facc15)",
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
          Admin Dashboard
        </p>

        <h1
          style={{
            fontSize: "60px",
            fontWeight: 900,
            marginTop: "10px",
          }}
        >
          Control Center
        </h1>

        <p
          style={{
            marginTop: "10px",
            fontSize: "18px",
          }}
        >
          Manage users, draws, winners,
          charities and platform data.
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
        <div style={cardStyle}>
          <h2
            style={{
              fontSize: "42px",
              fontWeight: 900,
            }}
          >
            👥
          </h2>

          <p
            style={{
              color: "#94a3b8",
            }}
          >
            Users
          </p>
        </div>

        <div style={cardStyle}>
          <h2
            style={{
              fontSize: "42px",
              fontWeight: 900,
            }}
          >
            🎯
          </h2>

          <p
            style={{
              color: "#94a3b8",
            }}
          >
            Draws
          </p>
        </div>

        <div style={cardStyle}>
          <h2
            style={{
              fontSize: "42px",
              fontWeight: 900,
            }}
          >
            🏆
          </h2>

          <p
            style={{
              color: "#94a3b8",
            }}
          >
            Winners
          </p>
        </div>

        <div style={cardStyle}>
          <h2
            style={{
              fontSize: "42px",
              fontWeight: 900,
            }}
          >
            💰
          </h2>

          <p
            style={{
              color: "#94a3b8",
            }}
          >
            Donations
          </p>
        </div>
      </div>

      {/* QUICK ACTIONS */}
      <div
        style={{
          background: "#1a2740",
          border: "1px solid #23375d",
          borderRadius: "24px",
          padding: "25px",
          marginBottom: "25px",
        }}
      >
        <h2
          style={{
            marginBottom: "20px",
          }}
        >
          ⚡ Quick Actions
        </h2>

        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit,minmax(220px,1fr))",
            gap: "15px",
          }}
        >
          <button
            onClick={() =>
              router.push("/admin/users")
            }
            style={buttonStyle}
          >
            👥 Manage Users
          </button>

          <button
            onClick={() =>
              router.push("/admin/charities")
            }
            style={buttonStyle}
          >
            💝 Manage Charities
          </button>

          <button
            onClick={() =>
              router.push("/admin/draws")
            }
            style={buttonStyle}
          >
            🎯 Manage Draws
          </button>

          <button
            onClick={() =>
              router.push("/admin/winners")
            }
            style={buttonStyle}
          >
            🏆 Winners
          </button>

          <button
            onClick={() =>
              router.push("/admin/scores")
            }
            style={buttonStyle}
          >
            ⛳ Scores
          </button>

          <button
            onClick={() =>
              router.push("/admin/contributions")
            }
            style={buttonStyle}
          >
            💰 Contributions
          </button>
        </div>
      </div>

      {/* SYSTEM STATUS */}
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
            marginBottom: "20px",
          }}
        >
          🚀 Platform Status
        </h2>

        <div
          style={{
            display: "grid",
            gap: "15px",
          }}
        >
          <div
            style={{
              background: "#22314f",
              padding: "18px",
              borderRadius: "15px",
            }}
          >
            ✅ Supabase Connected
          </div>

          <div
            style={{
              background: "#22314f",
              padding: "18px",
              borderRadius: "15px",
            }}
          >
            ✅ Admin Access Verified
          </div>

          <div
            style={{
              background: "#22314f",
              padding: "18px",
              borderRadius: "15px",
            }}
          >
            ✅ Dashboard Ready
          </div>
        </div>
      </div>
    </main>
  );
}

const buttonStyle = {
  background:
    "linear-gradient(90deg,#ef4444,#f97316)",
  border: "none",
  color: "white",
  padding: "16px",
  borderRadius: "14px",
  fontWeight: 800,
  cursor: "pointer",
};