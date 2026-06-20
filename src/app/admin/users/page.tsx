"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export default function AdminUsersPage() {
  const [users, setUsers] = useState<any[]>([]);

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    const { data, error } = await supabase
      .from("profiles")
      .select("*")
      .order("created_at", {
        ascending: false,
      });

    if (error) {
      console.log(error);
      return;
    }

    setUsers(data || []);
  };

  const changeRole = async (
    userId: string,
    role: string
  ) => {
    const { error } = await supabase
      .from("profiles")
      .update({
        role: role,
      })
      .eq("id", userId);

    if (error) {
      alert(error.message);
      return;
    }

    alert("Role Updated");

    loadUsers();
  };

  return (
    <main style={{ padding: "40px" }}>
      <h1>Admin User Management</h1>

      <table
        border={1}
        cellPadding={10}
      >
        <thead>
          <tr>
            <th>Email</th>
            <th>Role</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>
                {user.email}
              </td>

              <td>
                {user.role}
              </td>

              <td>
                <button
                  onClick={() =>
                    changeRole(
                      user.id,
                      "admin"
                    )
                  }
                >
                  Make Admin
                </button>

                {" "}

                <button
                  onClick={() =>
                    changeRole(
                      user.id,
                      "subscriber"
                    )
                  }
                >
                  Make Subscriber
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  );
}