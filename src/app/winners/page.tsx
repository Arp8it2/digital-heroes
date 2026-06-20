"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export default function WinnersPage() {
  const [winners, setWinners] = useState<any[]>([]);

  useEffect(() => {
    loadWinners();
  }, []);

  const loadWinners = async () => {
    const { data, error } = await supabase
      .from("winners")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.log(error);
      return;
    }

    setWinners(data || []);
  };

  return (
    <main style={{ padding: "40px" }}>
      <h1>Winners</h1>

      <table border={1} cellPadding={10}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Prize</th>
          </tr>
        </thead>

        <tbody>
          {winners.map((winner) => (
            <tr key={winner.id}>
              <td>{winner.id}</td>
              <td>{winner.prize_amount ?? "N/A"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  );
}