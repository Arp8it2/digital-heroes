"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export default function AdminCharitiesPage() {
  const [charities, setCharities] = useState<any[]>([]);

  const [name, setName] = useState("");
  const [description, setDescription] =
    useState("");

  const [website, setWebsite] =
    useState("");

  const [image, setImage] =
    useState("");

  useEffect(() => {
    loadCharities();
  }, []);

  const loadCharities = async () => {
    const { data, error } =
      await supabase
        .from("charities")
        .select("*")
        .order("created_at", {
          ascending: false,
        });

    if (error) {
      console.log(error);
      return;
    }

    setCharities(data || []);
  };

  const addCharity = async () => {
    if (!name) {
      alert("Name required");
      return;
    }

    const { error } =
      await supabase
        .from("charities")
        .insert([
          {
            name,
            description,
            website_url:
              website,
            image_url:
              image,
            is_active: true,
            is_featured:
              false,
          },
        ]);

    if (error) {
      alert(error.message);
      return;
    }

    alert(
      "Charity Added"
    );

    setName("");
    setDescription("");
    setWebsite("");
    setImage("");

    loadCharities();
  };

  const toggleActive =
    async (
      id: string,
      current: boolean
    ) => {
      await supabase
        .from("charities")
        .update({
          is_active:
            !current,
        })
        .eq("id", id);

      loadCharities();
    };

  const toggleFeatured =
    async (
      id: string,
      current: boolean
    ) => {
      await supabase
        .from("charities")
        .update({
          is_featured:
            !current,
        })
        .eq("id", id);

      loadCharities();
    };

  return (
    <main
      style={{
        padding: "40px",
      }}
    >
      <h1>
        Admin Charity
        Management
      </h1>

      <h2>
        Add Charity
      </h2>

      <input
        placeholder="Name"
        value={name}
        onChange={(e) =>
          setName(
            e.target.value
          )
        }
      />

      <br />
      <br />

      <input
        placeholder="Website URL"
        value={website}
        onChange={(e) =>
          setWebsite(
            e.target.value
          )
        }
      />

      <br />
      <br />

      <input
        placeholder="Image URL"
        value={image}
        onChange={(e) =>
          setImage(
            e.target.value
          )
        }
      />

      <br />
      <br />

      <textarea
        placeholder="Description"
        value={
          description
        }
        onChange={(e) =>
          setDescription(
            e.target.value
          )
        }
      />

      <br />
      <br />

      <button
        onClick={
          addCharity
        }
      >
        Add Charity
      </button>

      <hr />

      <h2>
        Existing
        Charities
      </h2>

      {charities.map(
        (charity) => (
          <div
            key={
              charity.id
            }
            style={{
              border:
                "1px solid #ccc",
              padding:
                "15px",
              marginBottom:
                "10px",
            }}
          >
            <h3>
              {
                charity.name
              }
            </h3>

            <p>
              Active:
              {" "}
              {String(
                charity.is_active
              )}
            </p>

            <p>
              Featured:
              {" "}
              {String(
                charity.is_featured
              )}
            </p>

            <button
              onClick={() =>
                toggleActive(
                  charity.id,
                  charity.is_active
                )
              }
            >
              Toggle
              Active
            </button>

            {" "}

            <button
              onClick={() =>
                toggleFeatured(
                  charity.id,
                  charity.is_featured
                )
              }
            >
              Toggle
              Featured
            </button>
          </div>
        )
      )}
    </main>
  );
}