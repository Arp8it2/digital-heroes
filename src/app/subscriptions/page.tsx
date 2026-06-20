"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export default function SubscriptionsPage() {
  const [plans, setPlans] = useState<any[]>([]);
  const [subscription, setSubscription] = useState<any>(null);

  useEffect(() => {
    loadPlans();
    loadSubscription();
  }, []);

  const loadPlans = async () => {
    const { data, error } = await supabase
      .from("subscription_plans")
      .select("*");

    if (error) {
      console.log(error);
      return;
    }

    setPlans(data || []);
  };

  const loadSubscription = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) return;

    const { data, error } = await supabase
      .from("subscriptions")
      .select("*")
      .eq("user_id", user.id)
      .eq("status", "active");

    if (error) {
      console.log(error);
      return;
    }

    if (data && data.length > 0) {
      setSubscription(data[0]);
    }
  };

  const subscribe = async (plan: string) => {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      alert("Login first");
      return;
    }

    if (subscription) {
      alert(
        "You already have an active subscription"
      );
      return;
    }

    const today = new Date();

    const nextMonth = new Date();
    nextMonth.setMonth(
      nextMonth.getMonth() + 1
    );

    const { error } = await supabase
      .from("subscriptions")
      .insert([
        {
          user_id: user.id,
          plan: plan,
          status: "active",
          current_period_start:
            today.toISOString(),
          current_period_end:
            nextMonth.toISOString(),
        },
      ]);

    if (error) {
      alert(error.message);
      return;
    }

    alert("Subscription Activated");

    loadSubscription();
  };

  return (
    <main style={{ padding: "40px" }}>
      <h1>Subscription Plans</h1>

      {subscription && (
        <div
          style={{
            border: "2px solid green",
            padding: "15px",
            marginBottom: "20px",
          }}
        >
          <h3>Active Subscription</h3>

          <p>
            Plan: {subscription.plan}
          </p>

          <p>
            Status: {subscription.status}
          </p>

          <p>
            Expires:{" "}
            {new Date(
              subscription.current_period_end
            ).toLocaleDateString()}
          </p>
        </div>
      )}

      {plans.map((plan) => (
        <div
          key={plan.plan}
          style={{
            border: "1px solid #ccc",
            padding: "15px",
            marginBottom: "10px",
          }}
        >
          <h3>{plan.label}</h3>

          <p>£{plan.price_gbp}</p>

          <button
            onClick={() =>
              subscribe(plan.plan)
            }
          >
            Subscribe
          </button>
        </div>
      ))}
    </main>
  );
}