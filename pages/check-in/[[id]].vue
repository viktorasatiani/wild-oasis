<script setup lang="ts">
import { useRoute } from "vue-router";

const route = useRoute();
</script>

<template>
  <div>there will be checkin form with id {{ route.params.id }}</div>
</template>
