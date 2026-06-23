"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function SignupPage() {
  const router = useRouter();

  const [email, setEmail] =
    useState("");
  const [password, setPassword] =
    useState("");
  const [loading, setLoading] =
    useState(false);

  const handleSignup = async () => {
    if (!email || !password) {
      alert(
        "Please fill all fields"
      );
      return;
    }

    setLoading(true);

    const { error } =
      await supabase.auth.signUp({
        email,
        password,
      });

    if (error) {
      alert(error.message);
      setLoading(false);
      return;
    }

    alert(
      "Account created successfully!"
    );

    router.push("/login");
  };

  return (
    <main
      style={{
        minHeight: "100vh",
        background: "#020b24",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "30px",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "520px",
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
            marginBottom: "20px",
          }}
        >
          <p
            style={{
              fontWeight: 800,
              textTransform:
                "uppercase",
            }}
          >
            Join The Community
          </p>

          <h1
            style={{
              fontSize: "54px",
              fontWeight: 900,
              marginTop: "10px",
            }}
          >
            Sign Up
          </h1>

          <p
            style={{
              marginTop: "10px",
              fontSize: "18px",
            }}
          >
            Create your Golf Charity
            Platform account today.
          </p>
        </div>

        {/* FORM */}
        <div
          style={{
            background: "#1a2740",
            border:
              "1px solid #23375d",
            borderRadius: "24px",
            padding: "30px",
          }}
        >
          <h2
            style={{
              color: "white",
              marginBottom: "20px",
            }}
          >
            🚀 Create Account
          </h2>

          <div
            style={{
              display: "grid",
              gap: "15px",
            }}
          >
            <input
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) =>
                setEmail(
                  e.target.value
                )
              }
              style={inputStyle}
            />

            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) =>
                setPassword(
                  e.target.value
                )
              }
              style={inputStyle}
            />

            <button
              onClick={
                handleSignup
              }
              disabled={
                loading
              }
              style={{
                border: "none",
                padding: "14px",
                borderRadius:
                  "14px",
                background:
                  "linear-gradient(90deg,#00d26a,#b7f34d)",
                color: "#000",
                fontWeight: 800,
                cursor:
                  "pointer",
                fontSize: "16px",
              }}
            >
              {loading
                ? "Creating Account..."
                : "Create Account"}
            </button>

            <button
              onClick={() =>
                router.push(
                  "/login"
                )
              }
              style={{
                border:
                  "1px solid #334155",
                padding: "14px",
                borderRadius:
                  "14px",
                background:
                  "#0f172a",
                color:
                  "white",
                fontWeight: 700,
                cursor:
                  "pointer",
              }}
            >
              Already Have Account?
              Login
            </button>
          </div>
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
  fontSize: "15px",
};