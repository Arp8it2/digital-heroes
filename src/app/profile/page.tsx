"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export default function ProfilePage() {
  const [profile, setProfile] = useState<any>(null);
  const [charityName, setCharityName] = useState("");

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) return;

    const { data, error } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", user.id)
      .single();

    if (error) {
      console.log(error);
      return;
    }

    setProfile(data);

    if (data?.charity_id) {
      const { data: charity } = await supabase
        .from("charities")
        .select("name")
        .eq("id", data.charity_id)
        .single();

      if (charity) {
        setCharityName(charity.name);
      }
    }
  };

  if (!profile) {
    return (
      <main style={{ padding: "40px" }}>
        <h1>Loading Profile...</h1>
      </main>
    );
  }

  return (
    <main style={{ padding: "40px" }}>
      <h1>My Profile</h1>

      <p>
        <strong>Name:</strong>{" "}
        {profile.full_name || "Not Set"}
      </p>

      <p>
        <strong>Email:</strong>{" "}
        {profile.email}
      </p>

      <p>
        <strong>Role:</strong>{" "}
        {profile.role}
      </p>

      <p>
        <strong>Charity %:</strong>{" "}
        {profile.charity_pct}%
      </p>

      <p>
        <strong>Selected Charity:</strong>{" "}
        {charityName || "Not Selected"}
      </p>
    </main>
  );
}