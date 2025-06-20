<script setup lang="ts">
const route = useRoute();
const id = route.params.id as string;
</script>

<template>
  <div>
    <h1>Edit Cabin {{ id }}</h1>
  </div>
</template>
