"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export default function DrawsPage() {
  const [entries, setEntries] = useState<any[]>([]);

  useEffect(() => {
    loadEntries();
  }, []);

  const loadEntries = async () => {
    const { data, error } = await supabase
      .from("draw_entries")
      .select("*");

    if (error) {
      console.log(error);
      return;
    }

    setEntries(data || []);
  };

  return (
    <main style={{ padding: "40px" }}>
      <h1>Draw Entries</h1>

      <pre>
        {JSON.stringify(entries, null, 2)}
      </pre>
    </main>
  );
}