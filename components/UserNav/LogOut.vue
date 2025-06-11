<script setup lang="ts">
const LogOut = async () => {
  const supabase = useSupabaseClient();
  try {
    await supabase.auth.signOut();
    console.log("Logged out successfully");
    navigateTo("/login");
  } catch (error) {
    console.error("Error logging out:", error);
  }
};
</script>

<template>
  <UButton
    icon="heroicons-solid:logout"
    size="md"
    class="text-brand-600 hover:bg-grey-100 rounded-full p-2 transition-all hover:cursor-pointer"
    variant="ghost"
    @click="LogOut"
  />
</template>
