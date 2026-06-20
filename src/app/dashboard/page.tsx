"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export default function DashboardPage() {
  const [scores, setScores] = useState<number[]>([]);
  const [totalScores, setTotalScores] = useState(0);

  const [subscription, setSubscription] =
    useState<any>(null);

  const [charity, setCharity] =
    useState("Not Selected");

  const [winnings, setWinnings] =
    useState(0);

  useEffect(() => {
    loadDashboard();
  }, []);

  const loadDashboard = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) return;

    // Scores
    const { data: scoreData } =
      await supabase
        .from("scores")
        .select("score")
        .eq("user_id", user.id)
        .order("score_date", {
          ascending: false,
        })
        .limit(5);

    setScores(
      scoreData?.map(
        (item) => item.score
      ) || []
    );

    const { count } =
      await supabase
        .from("scores")
        .select("*", {
          count: "exact",
          head: true,
        })
        .eq("user_id", user.id);

    setTotalScores(count || 0);

    // Profile
    const { data: profile } =
      await supabase
        .from("profiles")
        .select("*")
        .eq("id", user.id)
        .single();

    if (profile?.charity_id) {
      const { data: charityData } =
        await supabase
          .from("charities")
          .select("name")
          .eq(
            "id",
            profile.charity_id
          )
          .single();

      if (charityData) {
        setCharity(
          charityData.name
        );
      }
    }

    // Subscription
    const { data: subData } =
      await supabase
        .from("subscriptions")
        .select("*")
        .eq("user_id", user.id)
        .eq("status", "active");

    if (
      subData &&
      subData.length > 0
    ) {
      setSubscription(
        subData[0]
      );
    }

    // Winnings
    const { data: winnerData } =
      await supabase
        .from("winners")
        .select(
          "prize_amount"
        )
        .eq("user_id", user.id);

    const total =
      winnerData?.reduce(
        (sum, item) =>
          sum +
          Number(
            item.prize_amount
          ),
        0
      ) || 0;

    setWinnings(total);
  };

  const average =
    scores.length > 0
      ? (
          scores.reduce(
            (a, b) => a + b,
            0
          ) / scores.length
        ).toFixed(1)
      : "0";

  return (
    <main style={{ padding: "40px" }}>
      <h1>Dashboard</h1>

      <h2>Subscription</h2>

      {subscription ? (
        <>
          <p>
            Plan:{" "}
            {subscription.plan}
          </p>

          <p>
            Status:{" "}
            {
              subscription.status
            }
          </p>

          <p>
            Expires:{" "}
            {new Date(
              subscription.current_period_end
            ).toLocaleDateString()}
          </p>
        </>
      ) : (
        <p>
          No Active
          Subscription
        </p>
      )}

      <hr />

      <h2>Selected Charity</h2>

      <p>{charity}</p>

      <hr />

      <h2>Total Scores</h2>

      <p>{totalScores}</p>

      <h2>Last 5 Scores</h2>

      <ul>
        {scores.map(
          (
            score,
            index
          ) => (
            <li key={index}>
              {score}
            </li>
          )
        )}
      </ul>

      <h2>Average Score</h2>

      <p>{average}</p>

      <hr />

      <h2>Total Winnings</h2>

      <p>
        £{winnings}
      </p>
    </main>
  );
}