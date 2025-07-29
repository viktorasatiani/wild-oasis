<script setup lang="ts">
const { data: bookings } = defineProps<{
  data: {
    totalPrice: number | null;
    status: string | null;
  }[];
}>();
const totalBookings = computed(() => {
  return bookings ? bookings.length : 0;
});
const totalRevenue = computed(() => {
  return bookings
    ? bookings.reduce(
        (sum, booking) => (booking.totalPrice ? sum + booking.totalPrice : sum),
        0,
      )
    : 0;
});
const totalCheckins = computed(() => {
  return bookings
    ? bookings.filter((booking) => booking.status === "checkedIn").length
    : 0;
});
const occupancyRate = computed(() => {
  return bookings && bookings.length > 0
    ? (
        (bookings.filter((booking) => booking.status === "checkedIn").length /
          bookings.length) *
        100
      ).toFixed(2) + "%"
    : "0.00%";
});
const StatisticArray = computed(() => {
  return [
    {
      title: "Bookings",
      text: `${totalBookings.value}`,
      icon: "heroicons:chart-pie",
      bgColor: "bg-indigo-100",
      textColor: "text-indigo-700",
    },
    {
      title: "Sales",
      text: `$${totalRevenue.value.toFixed(2)}`,
      icon: "heroicons:banknotes",
      bgColor: "bg-green-100",
      textColor: "text-green-700",
    },
    {
      title: "Check Ins",
      text: `${totalCheckins.value} `,
      icon: "heroicons:calendar-days-solid",
      bgColor: "bg-blue-100",
      textColor: "text-blue-700",
    },
    {
      title: "Occupancy Rate",
      text: `${occupancyRate.value}`,
      icon: "heroicons:chart-bar",
      bgColor: "bg-yellow-100",
      textColor: "text-yellow-700",
    },
  ];
});
</script>

<template>
  <div class="mt-8 flex gap-4">
    <div
      v-for="item in StatisticArray"
      :key="item.title"
      class="bg-grey-100 border-grey-200/50 flex w-[300px] items-center justify-start gap-4 rounded-md border p-4"
    >
      <div
        :class="`inline-flex items-center justify-center rounded-full ${item.bgColor} p-4`"
      >
        <UIcon :name="item.icon" :class="`size-8 ${item.textColor}`" />
      </div>
      <div class="flex flex-col text-xl font-semibold">
        <p class="text-grey-500 text-base">{{ item.title }}</p>
        <p>{{ item.text }}</p>
      </div>
    </div>
  </div>
</template>
