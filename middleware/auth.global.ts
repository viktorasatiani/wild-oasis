import type { Database } from "~/types/database.types";
export default defineNuxtRouteMiddleware(async (to) => {
  const supabase = useSupabaseClient<Database>();
  // isAuthenticated() is an example method verifying if a user is authenticated
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user && to.path !== "/login") {
    console.log("User not authenticated, redirecting to login");
    return navigateTo("/login");
  } else if (user && to.path === "/login") {
    console.log(user, "already logged in");
    return navigateTo("/dashboard");
  }
});
