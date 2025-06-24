<script setup lang="ts">
import { useSupabaseClient } from "#imports";
import { useRoute } from "vue-router";
import type { Database } from "~/types/database.types";
const route = useRoute();
const id = route.params.id as string;

const supabase = useSupabaseClient<Database>();

const { data: cabinData } = await useAsyncData<Cabin[] | null>(
  "cabin",
  async () => {
    const { data } = await supabase
      .from("cabins")
      .select("*")
      .eq("id", Number(id));
    return data as Cabin[] | null;
  },
);
console.log("cabinData", cabinData.value);
</script>

<template>
  <div class="flex h-full flex-col items-center justify-center p-8">
    <h1 class="mb-4 text-2xl font-bold">Edit Cabin</h1>
    <div
      v-if="cabinData"
      class="mt-14 flex h-full w-full gap-8 border border-red-700 py-10"
    >
      <NuxtImg
        fit="cover"
        :src="cabinData[0].image ?? undefined"
        width="500"
        height="300"
      />
      <FormsUpdateCabin :cabin-data="cabinData[0]" />
    </div>
  </div>
</template>
