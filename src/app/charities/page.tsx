"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export default function CharitiesPage() {
  const [charities, setCharities] = useState<any[]>([]);
  const [selectedCharity, setSelectedCharity] = useState("");

  useEffect(() => {
    loadCharities();
    loadSelectedCharity();
  }, []);

  const loadCharities = async () => {
    const { data, error } = await supabase
      .from("charities")
      .select("*")
      .eq("is_active", true);

    if (error) {
      console.log(error);
      return;
    }

    setCharities(data || []);
  };

  const loadSelectedCharity = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) return;

    const { data } = await supabase
      .from("profiles")
      .select("charity_id")
      .eq("id", user.id)
      .single();

    if (data?.charity_id) {
      setSelectedCharity(data.charity_id);
    }
  };

  const selectCharity = async (charityId: string) => {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      alert("Please login first");
      return;
    }

    const { error } = await supabase
      .from("profiles")
      .update({
        charity_id: charityId,
      })
      .eq("id", user.id);

    if (error) {
      alert(error.message);
      return;
    }

    setSelectedCharity(charityId);

    alert("Charity Selected Successfully");
  };

  return (
    <main style={{ padding: "40px" }}>
      <h1>Select Charity</h1>

      {charities.map((charity) => (
        <div
          key={charity.id}
          style={{
            border: "1px solid #ccc",
            padding: "15px",
            marginBottom: "10px",
          }}
        >
          <h3>{charity.name}</h3>

          <p>{charity.description}</p>

          <button
            onClick={() =>
              selectCharity(charity.id)
            }
          >
            {selectedCharity === charity.id
              ? "Selected"
              : "Select Charity"}
          </button>
        </div>
      ))}
    </main>
  );
}