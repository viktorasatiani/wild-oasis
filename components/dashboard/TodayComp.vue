<script setup lang="ts">
const { data: bookings } = defineProps<{
  data:
    | {
        totalPrice: number | null;
        status: string | null;
        guests: { fullName: string | null; countryFlag: string | null } | null;
        startDate: string | null;
        endDate: string | null;
        id: number;
        numNights: number | null;
      }[]
    | undefined;
}>();
const todaysActivities = computed(() => {
  if (!bookings) return [];
  const today = new Date();
  return bookings.filter((booking) => {
    const startDate = computed(() => new Date(booking.startDate || ""));
    const endDate = computed(() => new Date(booking.endDate || ""));
    if (
      startDate.value.toDateString() === today.toDateString() ||
      endDate.value.toDateString() === today.toDateString()
    ) {
      return {
        ...booking,
        isToday: true,
      };
    }
  });
});
console.log("Today's activities:", todaysActivities.value);
</script>

<template>
  <div class="bg-grey-100 border-grey-200/50 rounded-sm border p-6 shadow-sm">
    <h1 class="font mb-4 text-xl font-semibold">Today</h1>
    <div class="flex w-fit flex-col gap-2">
      <div
        v-for="activity in todaysActivities"
        :key="activity.id"
        class="border-grey-100 flex w-[600px] items-center justify-between gap-3 border-b py-1 first:border-t"
      >
        <div class="basis-24">
          <UBadge
            class="rounded-full"
            :color="`${activity.endDate !== null && new Date(activity.endDate).toDateString() === new Date().toDateString() ? 'secondary' : 'primary'}`"
            :label="`${activity.endDate !== null && new Date(activity.endDate).toDateString() === new Date().toDateString() ? 'Departing' : 'Arriving'}`"
          />
        </div>

        <NuxtImg
          :src="activity.guests?.countryFlag || ''"
          width="20"
          height="40"
        />
        <p class="basis-40 text-nowrap text-sm">
          {{ activity.guests?.fullName || "" }}
        </p>
        <p class="text-nowrap">{{ activity.numNights }} nights</p>
        <UButton
          size="sm"
          :label="`${activity.status === 'checkedIn' ? 'Check Out' : 'Check In'}`"
          color="secondary"
          class="flex w-full basis-24 justify-center hover:cursor-pointer"
          :to="`${activity.status === 'checkedIn' ? '/booking-details' : '/check-in'}/${activity.id}`"
        />
      </div>
    </div>
  </div>
</template>
