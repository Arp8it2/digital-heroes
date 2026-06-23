import AuthGuard from "@/components/AuthGuard";

"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export default function ProfilePage() {
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
          Account Center
        </p>

        <h1
          style={{
            fontSize: "60px",
            fontWeight: 900,
            marginTop: "10px",
          }}
        >
          My Profile
        </h1>

        <p
          style={{
            marginTop: "10px",
            fontSize: "18px",
          }}
        >
          Manage your account
          information and membership.
        </p>
      </div>

      {/* PROFILE STATS */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(auto-fit,minmax(250px,1fr))",
          gap: "20px",
          marginBottom: "25px",
        }}
      >
        <div style={card}>
          <h2
            style={{
              fontSize: "36px",
              fontWeight: 900,
            }}
          >
            👤
          </h2>

          <p style={label}>
            Account Status
          </p>

          <h3>
            Active Member
          </h3>
        </div>

        <div style={card}>
          <h2
            style={{
              fontSize: "36px",
              fontWeight: 900,
            }}
          >
            ⛳
          </h2>

          <p style={label}>
            Membership
          </p>

          <h3>
            Premium Plan
          </h3>
        </div>

        <div style={card}>
          <h2
            style={{
              fontSize: "36px",
              fontWeight: 900,
            }}
          >
            🎯
          </h2>

          <p style={label}>
            Draw Access
          </p>

          <h3>Enabled</h3>
        </div>
      </div>

      {/* PROFILE INFO */}
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
          👤 Account Details
        </h2>

        <div
          style={{
            display: "grid",
            gap: "20px",
          }}
        >
          <div>
            <p style={label}>
              Email Address
            </p>

            <div style={infoBox}>
              {user?.email ||
                "Loading..."}
            </div>
          </div>

          <div>
            <p style={label}>
              User ID
            </p>

            <div style={infoBox}>
              {user?.id ||
                "Loading..."}
            </div>
          </div>

          <div>
            <p style={label}>
              Last Sign In
            </p>

            <div style={infoBox}>
              {user?.last_sign_in_at
                ? new Date(
                    user.last_sign_in_at
                  ).toLocaleString()
                : "N/A"}
            </div>
          </div>
        </div>
      </div>

      {/* ACTIONS */}
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
          ⚙ Account Actions
        </h2>

        <div
          style={{
            display: "flex",
            gap: "15px",
            flexWrap: "wrap",
          }}
        >
          <button
            style={greenBtn}
          >
            Edit Profile
          </button>

          <button
            style={blueBtn}
          >
            Change Password
          </button>

          <button
            style={redBtn}
            onClick={async () => {
              await supabase.auth.signOut();
              window.location.href =
                "/login";
            }}
          >
            Logout
          </button>
        </div>
      </div>
    </main>
    </AuthGuard>
  );
}

const card = {
  background: "#1a2740",
  border: "1px solid #23375d",
  borderRadius: "24px",
  padding: "25px",
};

const label = {
  color: "#94a3b8",
  marginBottom: "8px",
};

const infoBox = {
  background: "#0f172a",
  border: "1px solid #334155",
  borderRadius: "12px",
  padding: "14px",
  wordBreak: "break-all" as const,
};

const greenBtn = {
  border: "none",
  padding: "14px 24px",
  borderRadius: "14px",
  background:
    "linear-gradient(90deg,#00d26a,#b7f34d)",
  color: "#000",
  fontWeight: 800,
  cursor: "pointer",
};

const blueBtn = {
  border: "none",
  padding: "14px 24px",
  borderRadius: "14px",
  background: "#2563eb",
  color: "#fff",
  fontWeight: 800,
  cursor: "pointer",
};

const redBtn = {
  border: "none",
  padding: "14px 24px",
  borderRadius: "14px",
  background: "#ef4444",
  color: "#fff",
  fontWeight: 800,
  cursor: "pointer",
};