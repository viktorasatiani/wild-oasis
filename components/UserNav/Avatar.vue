<script setup lang="ts">
const user = useSupabaseUser();
console.log("User:", user.value);
</script>
<template>
  <div class="flex items-center justify-center gap-4 text-sm font-medium">
    <UAvatar
      src="https://github.com/benjamincanac.png"
      size="lg"
      alt="Benjamin Canac"
    />
    <span>Benjamin </span>
  </div>
</template>
