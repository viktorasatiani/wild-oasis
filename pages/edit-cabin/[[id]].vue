<script setup lang="ts">
import { useSupabaseClient } from "#imports";
import { useRoute } from "vue-router";
import type { Database } from "~/types/database.types";
const route = useRoute();

const id = route.params.id as string;
const userId = computed(() => `user-${route.params.id}`);

const supabase = useSupabaseClient<Database>();

const { data: cabinData } = await useAsyncData<Cabin>(
  `${userId.value}`,
  async () => {
    const { data } = await supabase
      .from("cabins")
      .select("*")
      .eq("id", Number(id));
    return data?.[0] as Cabin;
  },
);
console.log(cabinData.value, "cabinData");
</script>

<template>
  <div
    v-if="cabinData"
    class="flex h-full flex-col items-center justify-center py-8"
  >
    <div class="mb-4 flex w-full items-center justify-start px-10">
      <div class="basis-[45%] justify-self-start">
        <UButton
          :to="'/cabins'"
          variant="ghost"
          :icon="'heroicons-solid:arrow-left'"
          class="rounded-full text-gray-500 hover:cursor-pointer hover:bg-gray-700 hover:text-gray-100"
        />
      </div>
      <h1 class="text-2xl font-bold">Edit Cabin</h1>
    </div>
    <div
      class="border-brand-900/10 mt-14 flex h-full w-full max-w-full gap-8 border px-6 py-10 shadow-2xl"
    >
      <NuxtImg
        fit="cover"
        :src="cabinData?.image ?? ''"
        width="500"
        height="300"
      />
      <FormsUpdateCabin :cabin-data="cabinData" />
    </div>
  </div>
</template>
