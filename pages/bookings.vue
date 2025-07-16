<script setup lang="ts">
import type { Database } from "~/types/database.types";

const supabase = useSupabaseClient<Database>();
const toast = useToast();

const {
  data: bookings,
  error,
  execute: refresh,
} = await useAsyncData("bookings", async () => {
  const { data } = await supabase
    .from("bookings")
    .select(
      "id, created_at, startDate, endDate, numNights, numGuests, totalPrice, status,guests(fullName,email),cabins(name)",
    )
    .in("status", ["unconfirmed", "checked_in", "checked_out"]);
  return data;
});
if (error.value) {
  toast.add({
    title: "Error fetching bookings",
    description: error.value.message,
    color: "error",
  });
}
console.log("Bookings data:", bookings.value);
</script>

<template>
  <div class="flex h-full flex-col gap-8 px-14 pt-8">
    <div class="flex justify-between">
      <h1 class="text-2xl font-bold">All Bookings</h1>
    </div>
    <div v-if="bookings">
      <BookingsTableData :bookings :refresh="refresh" />
    </div>
  </div>
</template>
