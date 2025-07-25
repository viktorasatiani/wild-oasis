<script setup lang="ts">
import type { FormSubmitEvent } from "@nuxt/ui";
import type * as z from "zod";
import type { Database } from "~/types/database.types";

const supabase = useSupabaseClient<Database>();
const toast = useToast();

const {
  data: settings,
  error,
  execute: refresh,
} = await useAsyncData("settings", async () => {
  const { data: settings } = await supabase.from("settings").select("*");

  return settings?.[0];
});
if (error.value) {
  toast.add({
    title: "Error fetching Settings",
    description: error.value.message,
    color: "error",
  });
}
console.log("Settings data:", settings.value);

const form = useTemplateRef("form");
type Schema = z.output<typeof UpdateSettingsSchema>;
const isDirty: Ref<boolean | undefined> = computed(() => {
  return form.value?.dirty;
});
const state = reactive<Partial<Schema>>({
  breakfastPrice: settings.value?.breakfastPrice || undefined,
  maxGuestsPerBooking: settings.value?.maxGuestsPerBooking || undefined,
  maxBookingLength: settings.value?.maxBookingLength || undefined,
  minBookingLength: settings.value?.minBookingLength || undefined,
});

function resetStates() {
  state.breakfastPrice = settings.value?.breakfastPrice || undefined;
  state.maxGuestsPerBooking = settings.value?.maxGuestsPerBooking || undefined;
  state.maxBookingLength = settings.value?.maxBookingLength || undefined;
  state.minBookingLength = settings.value?.minBookingLength || undefined;
  form?.value?.clear();
  console.log("Form reset");
}

async function updateSettings(data: Schema) {
  if (!settings.value?.id) {
    toast.add({
      title: "Error",
      description: "Settings ID is missing",
      color: "error",
    });
    return;
  }
  const { error } = await supabase
    .from("settings")
    .update({
      breakfastPrice: data.breakfastPrice,
      maxGuestsPerBooking: data.maxGuestsPerBooking,
      maxBookingLength: data.maxBookingLength,
      minBookingLength: data.minBookingLength,
    })
    .eq("id", settings.value?.id);
  if (error) {
    toast.add({
      title: "Error updating settings",
      description: error.message,
      color: "error",
    });
  } else {
    toast.add({
      title: "Settings updated",
      description: "Your settings have been successfully updated.",
      color: "success",
    });
    await refresh();
  }
}

async function onSubmit(event: FormSubmitEvent<Schema>) {
  console.log("Form submitted:", event.data);

  if (
    settings.value &&
    settings.value.breakfastPrice === event.data.breakfastPrice &&
    settings.value.maxGuestsPerBooking === event.data.maxGuestsPerBooking &&
    settings.value.maxBookingLength === event.data.maxBookingLength &&
    settings.value.minBookingLength === event.data.minBookingLength
  ) {
    toast.add({
      title: "No changes detected",
      description: "Please make changes to update the cabin data.",
      color: "error",
      duration: 2000,
    });
  } else {
    console.log("Updating cabin with data:", event.data);
    await updateSettings(event.data);
    resetStates();
  }
}
</script>
<template>
  <div class="flex flex-col gap-20 p-10">
    <h1 class="text-2xl font-bold">Update Settings Data</h1>
    <UForm
      ref="form"
      :schema="UpdateSettingsSchema"
      :state="state"
      class="bg-grey-100 w-[800px] space-y-2 self-center rounded-sm px-4 py-2"
      @submit.stop="onSubmit"
    >
      <div class="border-b-grey-200 flex gap-12 border-b py-4">
        <label for="minBookingLength" class="w-1/5 font-semibold"
          >Minimum nights/booking</label
        >
        <UFormField name="minBookingLength">
          <UInput
            id="minBookingLength"
            v-model="state.minBookingLength"
            type="number"
            :ui="{
              base: ' disabled:bg-grey-50/10',
            }"
          />
        </UFormField>
      </div>
      <div class="border-b-grey-200 flex gap-12 border-b py-4">
        <label for="maxBookingLength" class="w-1/5 font-semibold"
          >Maximum nights/booking</label
        >
        <UFormField name="maxBookingLength">
          <UInput
            id="maxBookingLength"
            v-model="state.maxBookingLength"
            type="number"
          />
        </UFormField>
      </div>
      <div class="border-b-grey-200 flex gap-12 border-b py-4">
        <label for="maxGuestsPerBooking" class="w-1/5 font-semibold"
          >Maximum guests/booking</label
        >
        <UFormField name="maxGuestsPerBooking">
          <UInput
            id="maxGuestsPerBooking"
            v-model="state.maxGuestsPerBooking"
            type="number"
          />
        </UFormField>
      </div>
      <div class="border-b-grey-200 flex gap-12 border-b py-4">
        <label for="breakfastPrice" class="w-1/5 font-semibold"
          >Breakfast price</label
        >
        <UFormField name="breakfastPrice">
          <UInput
            id="breakfastPrice"
            v-model="state.breakfastPrice"
            type="number"
          />
        </UFormField>
      </div>

      <div class="flex justify-end pt-4">
        <UTooltip arrow text="Data has not been changed" :disabled="isDirty">
          <UButton
            type="submit"
            class="bg-brand-600 text-brand-50 hover:bg-brand-700 px-4 py-2 uppercase hover:cursor-pointer"
            size="lg"
            :disabled="!isDirty"
          >
            Update Data
          </UButton>
        </UTooltip>

        <UButton
          class="bg-grey-200 text-grey-900 hover:bg-grey-50 ml-2 px-4 py-2 uppercase hover:cursor-pointer"
          size="lg"
          @click="
            () => {
              resetStates();
            }
          "
        >
          Reset
        </UButton>
      </div>
    </UForm>
  </div>
</template>
