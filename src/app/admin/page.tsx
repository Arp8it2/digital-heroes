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
    return <p style={{ padding: "40px" }}>Checking admin...</p>;
  }

  return (
    <main style={{ padding: "40px" }}>
      <h1>🔥 Admin Panel</h1>
      <p>Only admins can see this page</p>
    </main>
  );
}