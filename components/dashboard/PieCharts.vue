<script setup lang="ts">
const { data } = defineProps<{
  data:
    | {
        numNights: number | null;
      }[]
    | undefined;
}>();
const numNights2 = computed(() => {
  if (!data) return [];
  return data.filter((booking) => booking.numNights === 2);
});
const numnights3 = computed(() => {
  if (!data) return [];
  return data.filter((booking) => booking.numNights === 3);
});
const numNights4_5 = computed(() => {
  if (!data) return [];
  return data.filter(
    (booking) => booking.numNights === 4 || booking.numNights === 5,
  );
});
const numNights8_14 = computed(() => {
  if (!data) return [];
  return data.filter((booking) => {
    if (booking?.numNights)
      return booking.numNights >= 8 && booking.numNights <= 14;
  });
});

const donutData = ref([
  numNights2.value.length,
  numnights3.value.length,
  numNights4_5.value.length,
  numNights8_14.value.length,
]);

const marketShareLabels = [
  { name: "2 nights", color: "#3b82f6" }, // Blue
  { name: "3 nights", color: "#22c55e" }, // Green
  { name: "4-5 nights", color: "#f59e0b" }, // Amber
  { name: "8-14 nights", color: "#a855f7" }, // Purple
];
</script>
<template>
  <div
    class="bg-grey-100 border-grey-200/50 w-[650px] rounded-sm border p-6 shadow-sm"
  >
    <h1 class="font mb-4 text-xl font-semibold">Stay Duration summary</h1>
    <DonutChart
      :data="donutData"
      :height="250"
      :type="'full'"
      :labels="marketShareLabels"
      :radius="0"
      :arc-width="40"
    />
  </div>
</template>
