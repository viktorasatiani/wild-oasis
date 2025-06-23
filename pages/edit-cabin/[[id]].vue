<script setup lang="ts">
import { useSupabaseClient } from "#imports";
import { useRoute } from "vue-router";

const route = useRoute();
const id = route.params.id as string;

const supabase = useSupabaseClient();
const cabin = ref<Cabin | null>(null);

const { data: cabinData } = await useAsyncData("cabin", async () => {
  const { data } = await supabase.from("cabins").select("*").eq("id", id);

  return data ? data[0] : null;
});

cabin.value = cabinData.value;
</script>

<template>
  <div class="p-8">
    <div v-if="cabin">
      <NuxtImg :src="cabin.image" />
    </div>
  </div>
</template>
