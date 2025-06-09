<script setup>
const colorMode = useColorMode();

const isDark = computed({
  get() {
    return colorMode.value === "dark";
  },
  set(_isDark) {
    colorMode.preference = _isDark ? "dark" : "light";
  },
});
</script>

<template>
  <NuxtImg
    :src="isDark ? '/logo-dark.png' : '/logo-light.png'"
    alt="Wild Oasis Logo"
  />
</template>
