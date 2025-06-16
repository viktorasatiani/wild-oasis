<script setup lang="ts">
const user = useSupabaseUser();
// Create a reactive state and set default value
const userName = useState(
  "userName",
  () => user.value?.user_metadata?.name || "Guest",
);

console.log("User:", user.value);
</script>
<template>
  <div class="flex items-center justify-center gap-4 text-sm font-medium">
    <UAvatar
      src="https://github.com/benjamincanac.png"
      size="lg"
      alt="Benjamin Canac"
    />
    <span>{{ userName.toUpperCase() }}</span>
  </div>
</template>
