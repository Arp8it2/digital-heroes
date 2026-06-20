"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export default function AdminWinnersPage() {
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

  const verifyWinner = async (id: string) => {
    await supabase
      .from("winners")
      .update({ status: "verified" })
      .eq("id", id);

    loadWinners();
  };

  const rejectWinner = async (id: string) => {
    await supabase
      .from("winners")
      .update({ status: "rejected" })
      .eq("id", id);

    loadWinners();
  };

  const markPaid = async (id: string) => {
    await supabase
      .from("winners")
      .update({ status: "paid" })
      .eq("id", id);

    loadWinners();
  };

  return (
    <main style={{ padding: "40px" }}>
      <h1>Winner Verification</h1>

      <table border={1} cellPadding={10}>
        <thead>
          <tr>
            <th>Prize</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {winners.map((winner) => (
            <tr key={winner.id}>
              <td>£{winner.prize_amount}</td>

              <td>{winner.status}</td>

              <td>
                <button
                  onClick={() =>
                    verifyWinner(winner.id)
                  }
                >
                  Verify
                </button>

                {" "}

                <button
                  onClick={() =>
                    rejectWinner(winner.id)
                  }
                >
                  Reject
                </button>

                {" "}

                <button
                  onClick={() =>
                    markPaid(winner.id)
                  }
                >
                  Mark Paid
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  );
}