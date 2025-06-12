<script setup lang="ts">
const LogOut = async () => {
  const supabase = useSupabaseClient();
  const toast = useToast();
  try {
    const { error } = await supabase.auth.signOut();
    if (error) {
      throw error;
    }
    toast.add({
      title: "Success",
      description: "LogOut Successful.",
      color: "success",
      "onUpdate:open": (open: boolean) => {
        if (!open) {
          console.log("Toast closed");
          navigateTo("/login");
        }
      },
      duration: 1000,
    });
  } catch (error) {
    toast.add({
      title: "Error! Something went wrong.",
      description: `${error}`,
      icon: "heroicons-solid:exclamation",
      color: "error",
    });
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
