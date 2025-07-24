<script setup lang="ts">
import { useRoute } from "vue-router";
import { format } from "date-fns";
import type { Database } from "~/types/database.types";
const supabase = useSupabaseClient<Database>();
const route = useRoute();
const id = route.params.id as string;
const userId = computed(() => `user-${route.params.id}`);

const {
  data: booking,
  error,
  execute: refresh,
} = await useAsyncData<BookingDetails>(userId, async () => {
  const { data } = await supabase
    .from("bookings")
    .select("*, cabins(name), guests(fullName, email,nationalID,countryFlag)")
    .eq("id", Number(id));

  return data?.[0] as BookingDetails;
});
if (error.value) {
  useToast().add({
    title: "Error fetching booking details",
    description: error.value.message,
    color: "error",
  });
}
const statusColor = computed(() => {
  switch (booking.value?.status) {
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

console.log("Booking data:", booking.value);
</script>

<template>
  <div v-if="booking" class="mx-auto flex w-[calc(100%-20rem)] flex-col">
    <div class="flex items-center justify-between p-8">
      <div class="flex items-center justify-center gap-4">
        <h1 class="text-3xl font-bold">Booking #{{ booking.id }}</h1>
        <UBadge :color="statusColor">{{
          booking.status?.toUpperCase()
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
        <div
          class="flex items-center justify-center gap-6 text-xl font-bold text-white"
        >
          <UIcon name="heroicons-solid:building-office" class="size-10" />
          <p>
            {{ booking?.numNights }} nights in Cabin
            {{ booking?.cabins?.name }}
          </p>
        </div>
        <p class="text-white">
          <span class="font-semibold"> From </span>
          {{
            booking?.startDate !== null &&
            format(booking.startDate, "dd/MMM/yyyy")
          }}
          <span class="font-semibold"> - To </span>
          {{
            booking?.endDate !== null && format(booking.endDate, "dd/MMM/yyyy")
          }}
        </p>
      </div>
      <div class="flex flex-col gap-4 px-12 py-8">
        <div class="flex items-center gap-2">
          <NuxtImg
            :src="booking?.guests?.countryFlag ?? ''"
            width="30"
            height="50"
          />
          <p class="flex items-center gap-2">
            {{ booking?.guests?.fullName }} +
            {{ booking?.numGuests ? booking.numGuests - 1 : 0 }}
            <span class="text-grey-700/40 font-bold"
              >{{ booking?.guests?.email }} - National ID:
              {{ booking?.guests?.nationalID }}</span
            >
          </p>
        </div>
        <div class="flex items-start gap-2">
          <UIcon name="heroicons-solid:chat" class="text-brand-200 size-6" />
          <p>
            Observations: <span>{{ booking?.observations }}</span>
          </p>
        </div>
        <div class="flex items-center gap-2">
          <UIcon
            name="heroicons-solid:check-circle"
            class="text-brand-200 size-6"
          />
          <p>
            Breakfast Included ?
            <span>{{ booking?.hasBreakfast ? "Yes" : "No" }}</span>
          </p>
        </div>
        <div
          :class="`${booking?.status === 'unconfirmed' ? 'bg-yellow-100' : 'bg-green-600'} flex justify-between rounded-sm p-4 font-semibold uppercase`"
        >
          <div class="flex items-center gap-2">
            <UIcon name="heroicons:currency-dollar" class="size-6" />
            <p>total price ${{ booking?.totalPrice?.toPrecision(6) }}</p>
          </div>
          <div>
            {{ statusColor === "info" ? "will pay at property" : "paid" }}
          </div>
        </div>
        <p class="text-grey-400 text-xs">
          Booked on
          {{
            booking?.created_at &&
            format(booking?.created_at, "E, MMM dd yyyy, h:mm a")
          }}
        </p>
      </div>
    </div>
  </div>
</template>
