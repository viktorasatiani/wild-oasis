<script setup lang="ts">
const user = useSupabaseUser();

const userName = computed(() => user.value?.user_metadata?.name || "Guest");
const userAvatar = computed(() => user.value?.user_metadata?.avatar || "");
</script>
<template>
  <div class="flex items-center justify-center gap-4 text-sm font-medium">
    <UAvatar :src="userAvatar" size="lg" :alt="userName" />
    <span>{{ userName.toUpperCase() }}</span>
  </div>
</template>
