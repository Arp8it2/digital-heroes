import { supabase } from "./supabase";

/**
 * Get current logged in user
 */
export const getUser = async () => {
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error) {
    console.log("Auth Error:", error.message);
    return null;
  }

  return user;
};

/**
 * Check if user is logged in
 */
export const isLoggedIn = async () => {
  const user = await getUser();
  return !!user;
};

/**
 * Logout user
 */
export const logout = async () => {
  const { error } = await supabase.auth.signOut();

  if (error) {
    console.log("Logout Error:", error.message);
    return false;
  }

  return true;
};

export const isAdmin = async () => {
  const { data: userData } = await supabase.auth.getUser();

  const user = userData.user;

  if (!user) return false;

  const { data } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .single();

  return data?.role === "admin";
};