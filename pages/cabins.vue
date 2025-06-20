<script setup lang="ts">
const supabase = useSupabaseClient();
const toast = useToast();
const {
  data: cabins,
  error,
  refresh,
} = await useAsyncData("cabins", async () => {
  const { data } = await supabase.from("cabins").select("*");
  return data;
});
if (error.value) {
  toast.add({
    title: "Error fetching cabins",
    description: error.value.message,
    color: "error",
  });
}
console.log("Cabins data:", cabins);
</script>
<template>
  <div class="px-14 py-8">
    <div class="flex justify-between">
      <h1 class="text-2xl font-bold">All Cabins</h1>
    </div>
    <div v-if="cabins">
      <CabinsTableData :cabins :refresh="refresh" />
      <UButton
        class="bg-brand-600 text-brand-50 hover:bg-brand-700 px-4 py-2 uppercase hover:cursor-pointer"
        size="lg"
        >Add New Cabin</UButton
      >
    </div>
  </div>
</template>
