"use client";
import AuthGuard from "@/components/AuthGuard";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export default function SubscriptionsPage() {
  const [user, setUser] =
    useState<any>(null);

  useEffect(() => {
    loadUser();
  }, []);

  const loadUser = async () => {
    const { data } =
      await supabase.auth.getUser();

    setUser(data.user);
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
        }}
      >
        <p
          style={{
            fontWeight: 800,
            textTransform:
              "uppercase",
          }}
        >
          Membership Center
        </p>

        <h1
          style={{
            fontSize: "60px",
            fontWeight: 900,
            marginTop: "10px",
          }}
        >
          Subscriptions
        </h1>

        <p
          style={{
            marginTop: "10px",
            fontSize: "18px",
          }}
        >
          Manage your Golf Charity
          Platform membership.
        </p>
      </div>

      {/* CURRENT PLAN */}
      <div
        style={{
          background: "#1a2740",
          border:
            "1px solid #23375d",
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
          ⭐ Current Membership
        </h2>

        <div
          style={{
            display: "flex",
            justifyContent:
              "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: "20px",
          }}
        >
          <div>
            <h1
              style={{
                fontSize: "42px",
                fontWeight: 900,
              }}
            >
              Pro Yearly
            </h1>

            <p
              style={{
                color: "#94a3b8",
                marginTop: "8px",
              }}
            >
              Premium access to
              draws, scores and
              charity features.
            </p>
          </div>

          <div
            style={{
              background:
                "linear-gradient(90deg,#00d26a,#b7f34d)",
              color: "#000",
              padding:
                "12px 20px",
              borderRadius:
                "999px",
              fontWeight: 800,
            }}
          >
            Active
          </div>
        </div>
      </div>

      {/* PLANS */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(auto-fit,minmax(320px,1fr))",
          gap: "20px",
        }}
      >
        {/* BASIC */}
        <div style={planCard}>
          <h2
            style={{
              fontSize: "32px",
            }}
          >
            Basic
          </h2>

          <h1
            style={{
              fontSize: "52px",
              marginTop: "10px",
            }}
          >
            £0
          </h1>

          <p style={planText}>
            Limited platform
            access
          </p>

          <ul style={list}>
            <li>
              ✓ View Scores
            </li>
            <li>
              ✓ View Winners
            </li>
            <li>
              ✕ Draw Entries
            </li>
            <li>
              ✕ Premium Benefits
            </li>
          </ul>

          <button
            style={blueBtn}
          >
            Current Plan
          </button>
        </div>

        {/* PRO */}
        <div
          style={{
            ...planCard,
            border:
              "2px solid #22c55e",
          }}
        >
          <div
            style={{
              background:
                "linear-gradient(90deg,#00d26a,#b7f34d)",
              color: "#000",
              display:
                "inline-block",
              padding:
                "6px 12px",
              borderRadius:
                "999px",
              fontWeight: 800,
              marginBottom:
                "15px",
            }}
          >
            MOST POPULAR
          </div>

          <h2
            style={{
              fontSize: "32px",
            }}
          >
            Pro Yearly
          </h2>

          <h1
            style={{
              fontSize: "52px",
              marginTop: "10px",
            }}
          >
            £99
          </h1>

          <p style={planText}>
            Per year
          </p>

          <ul style={list}>
            <li>
              ✓ Unlimited Draws
            </li>
            <li>
              ✓ Full Dashboard
            </li>
            <li>
              ✓ Premium Rewards
            </li>
            <li>
              ✓ Charity Support
            </li>
          </ul>

          <button
            style={greenBtn}
          >
            Active Plan
          </button>
        </div>

        {/* VIP */}
        <div style={planCard}>
          <h2
            style={{
              fontSize: "32px",
            }}
          >
            VIP
          </h2>

          <h1
            style={{
              fontSize: "52px",
              marginTop: "10px",
            }}
          >
            £199
          </h1>

          <p style={planText}>
            Per year
          </p>

          <ul style={list}>
            <li>
              ✓ Everything in Pro
            </li>
            <li>
              ✓ VIP Draw Access
            </li>
            <li>
              ✓ Exclusive Events
            </li>
            <li>
              ✓ Priority Support
            </li>
          </ul>

          <button
            style={goldBtn}
          >
            Upgrade
          </button>
        </div>
      </div>

      {/* USER INFO */}
      <div
        style={{
          background: "#1a2740",
          border:
            "1px solid #23375d",
          borderRadius: "24px",
          padding: "25px",
          marginTop: "25px",
        }}
      >
        <h2
          style={{
            marginBottom: "15px",
          }}
        >
          👤 Subscriber
          Information
        </h2>

        <p
          style={{
            color: "#94a3b8",
          }}
        >
          {user?.email ||
            "Loading account..."}
        </p>
      </div>
    </main>
    </AuthGuard>
  );
}

const planCard = {
  background: "#1a2740",
  border: "1px solid #23375d",
  borderRadius: "24px",
  padding: "25px",
};

const planText = {
  color: "#94a3b8",
  marginTop: "10px",
};

const list = {
  marginTop: "20px",
  lineHeight: 2,
  color: "#cbd5e1",
};

const greenBtn = {
  marginTop: "20px",
  width: "100%",
  border: "none",
  padding: "14px",
  borderRadius: "14px",
  background:
    "linear-gradient(90deg,#00d26a,#b7f34d)",
  color: "#000",
  fontWeight: 800,
  cursor: "pointer",
};

const blueBtn = {
  marginTop: "20px",
  width: "100%",
  border: "none",
  padding: "14px",
  borderRadius: "14px",
  background: "#2563eb",
  color: "#fff",
  fontWeight: 800,
  cursor: "pointer",
};

const goldBtn = {
  marginTop: "20px",
  width: "100%",
  border: "none",
  padding: "14px",
  borderRadius: "14px",
  background: "#f59e0b",
  color: "#000",
  fontWeight: 800,
  cursor: "pointer",
};