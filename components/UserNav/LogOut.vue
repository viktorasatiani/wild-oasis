<script setup lang="ts">
const LogOut = async () => {
  const supabase = useSupabaseClient();
  try {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
    console.log("Logged out successfully");
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
