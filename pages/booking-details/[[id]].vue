<script setup lang="ts">
import { useRoute } from "vue-router";
import { format } from "date-fns";
import type { Database } from "~/types/database.types";
const supabase = useSupabaseClient<Database>();
const route = useRoute();
const id = route.params.id as string;
const userId = computed(() => `user-${route.params.id}`);

const {
  data: bookings,
  error,
  execute: refresh,
} = await useAsyncData(userId, async () => {
  const { data } = await supabase
    .from("bookings")
    .select("*, cabins(name)")
    .eq("id", Number(id));

  return data as BookingDetails;
});
const statusColor = computed(() => {
  switch (bookings.value?.[0]?.status) {
    case "unconfirmed":
      return "info";
    case "checkedIn":
      return "primary";
    case "checkedOut":
      return "neutral";
    default:
      return "neutral";
  }
});

console.log("Booking data:", bookings.value);
</script>

<template>
  <div v-if="bookings" class="flex flex-col">
    <div v-if="bookings[0]" class="flex items-center justify-between p-8">
      <div class="flex items-center justify-center gap-4">
        <h1 class="text-3xl font-bold">Booking #{{ bookings[0].id }}</h1>
        <UBadge :color="statusColor">{{
          bookings[0].status?.toUpperCase()
        }}</UBadge>
      </div>
      <div
        class="text-brand-500 flex items-center justify-center font-semibold hover:cursor-pointer"
      >
        <UButton
          :to="'/cabins'"
          variant="ghost"
          label="Back"
          size="xl"
          :icon="'heroicons-solid:arrow-left'"
          class="text-brand-500 hover:text-brand-600 hover:cursor-pointer hover:bg-transparent"
        />
      </div>
    </div>
    <div
      class="bg-grey-100 mx-auto h-[calc(100%-2rem)] w-[calc(100%-2rem)] rounded-sm"
    >
      <div
        class="bg-brand-500 flex items-center justify-between rounded-sm px-8 py-4"
      >
        <div class="flex items-center justify-center gap-6 text-xl font-bold">
          <UIcon name="heroicons-solid:building-office" class="size-10" />
          <p>
            {{ bookings[0]?.numNights }} nights in Cabin
            {{ bookings[0]?.cabins?.name }}
          </p>
        </div>
        <p>
          <span class="font-semibold"> From </span>
          {{
            bookings[0]?.startDate !== undefined &&
            format(bookings[0]?.startDate, "dd/MMM/yyyy")
          }}
          <span class="font-semibold"> - To </span>
          {{
            bookings[0]?.endDate !== undefined &&
            format(bookings[0]?.endDate, "dd/MMM/yyyy")
          }}
        </p>
      </div>
      <div>content</div>
    </div>
  </div>
</template>
