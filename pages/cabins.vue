<script setup lang="ts">
import type { Database } from "~/types/database.types";

const supabase = useSupabaseClient<Database>();
const toast = useToast();
const {
  data: cabins,
  error,
  execute: refresh,
} = await useAsyncData("cabins", async () => {
  const { data } = await supabase.from("cabins").select("*");
  return data;
});

if (error.value) {
  toast.add({
    title: "Error fetching cabins",
    description: error.value.message,
    color: "error",
  });
}

console.log("Cabins data:", cabins.value);
</script>
<template>
  <div class="flex h-full flex-col gap-8 px-14 pt-8">
    <div class="flex justify-between">
      <h1 class="text-2xl font-bold">All Cabins</h1>
    </div>
    <div v-if="cabins">
      <CabinsTableData :cabins :refresh="refresh" />
    </div>
    <CabinsAddModal />
  </div>
</template>
