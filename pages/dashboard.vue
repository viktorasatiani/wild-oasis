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
  <div class="flex h-full flex-col justify-start gap-16 px-12 py-20">
    <h1 class="text-2xl font-semibold">Dashboard</h1>
    <DashboardStatisticComp v-if="bookings" :data="bookings" />
    <div class="flex h-full justify-between">
      <DashboardTodayComp v-if="bookings" :data="bookings" />
      <DashboardPieCharts :data="bookings" />
    </div>
  </div>
</template>
