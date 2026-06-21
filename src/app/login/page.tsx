"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const login = async () => {
    const res = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (res.error) {
      alert(res.error.message);
      return;
    }

    alert("Login Success");
  };

  return (
    <main style={styles.main}>
      <h1>🔐 Login</h1>

      <input
        style={styles.input}
        placeholder="Email"
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        style={styles.input}
        type="password"
        placeholder="Password"
        onChange={(e) => setPassword(e.target.value)}
      />

      <button style={styles.btn} onClick={login}>
        Login
      </button>
    </main>
  );
}

const styles = {
  main: {
    padding: "40px",
    minHeight: "100vh",
    background: "#0f172a",
    color: "white",
  },
  input: {
    display: "block",
    padding: "10px",
    marginTop: "10px",
    width: "300px",
    borderRadius: "6px",
    border: "none",
  },
  btn: {
    marginTop: "15px",
    padding: "10px 15px",
    background: "green",
    color: "white",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
  },
};