<script setup lang="ts">
import type { Database } from "~/types/database.types";

const supabase = useSupabaseClient<Database>();
const toast = useToast();
const { data: bookings, error } = await useAsyncData("dashboard", async () => {
  const { data, error } = await supabase
    .from("bookings")
    .select(
      "totalPrice,status,guests(fullName,countryFlag),startDate,endDate,id,numNights",
    );

  if (error) {
    throw error;
  }

  return data;
});
if (error.value) {
  toast.add({
    title: "Error fetching dashboard data",
    description: error.value.message,
    color: "error",
  });
}
</script>

<template>
  <div class="flex flex-col gap-4 p-12">
    <h1 class="text-2xl font-semibold">Dashboard</h1>
    <DashboardStatisticComp v-if="bookings" :data="bookings" />
    <div class="flex justify-between">
      <DashboardTodayComp v-if="bookings" :data="bookings" />
    </div>
  </div>
</template>
