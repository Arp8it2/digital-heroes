"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const login = async () => {
    setLoading(true);

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    setLoading(false);

    if (error) {
      alert(error.message);
      return;
    }

    alert("Login Success 🚀");

    // redirect after login
    router.push("/dashboard");
  };

  return (
    <main style={styles.main}>
      <h1>🔐 Login</h1>

      <input
        style={styles.input}
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        style={styles.input}
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <button
        style={styles.btn}
        onClick={login}
        disabled={loading}
      >
        {loading ? "Logging in..." : "Login"}
      </button>
    </main>
  );
}

const styles: any = {
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
    background: "#16a34a",
    color: "white",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
  },
};