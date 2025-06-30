<script setup lang="ts">
import type * as z from "zod";
import type { FormSubmitEvent } from "@nuxt/ui";
import type { Database } from "~/types/database.types";

const supabase = useSupabaseClient<Database>();
interface Props {
  cabinData: Cabin;
}

const { cabinData } = defineProps<Props>();
const form = useTemplateRef("form");
const isDirty: Ref<boolean | undefined> = computed(() => {
  return form.value?.dirty;
});

async function UpdateCabin({ cabinData }: { cabinData: UpdateCabin }) {
  try {
    const { data, error } = await supabase
      .from("cabins")
      .update({
        name: cabinData.name,
        capacity: cabinData.capacity,
        price: cabinData.price,
        discount: cabinData.discount,
      })
      .eq("id", cabinData.id);
    if (error) {
      throw error;
    }
    toast.add({
      title: "Cabin data updated",
      description: "The cabin data has been successfully updated.",
      color: "success",
      duration: 2000,
      "onUpdate:open": (open: boolean) => {
        if (!open) {
          console.log("Toast closed");
          navigateTo({ name: "cabins" });
        }
      },
    });
    console.log("Cabin updated successfully:", data);
  } catch (error) {
    console.error("Error updating cabin:", error);
  }
}
type Schema = z.output<typeof UpdateCabinSchema>;
const toast = useToast();
const state = reactive<Partial<Schema>>({
  name: cabinData?.name || "",
  capacity: cabinData?.capacity || undefined,
  price: cabinData?.price || undefined,
  discount: cabinData?.discount || undefined,
  image: undefined,
});
async function onSubmit(event: FormSubmitEvent<Schema>) {
  if (
    cabinData &&
    cabinData.capacity === event.data.capacity &&
    cabinData.price === event.data.price &&
    cabinData.discount === event.data.discount &&
    cabinData.name === event.data.name
  ) {
    toast.add({
      title: "No changes detected",
      description: "Please make changes to update the cabin data.",
      color: "info",
      duration: 2000,
    });
  } else {
    console.log("Updating cabin with data:", event.data);
    await UpdateCabin({
      cabinData: {
        ...cabinData,
        name: event.data.name,
        capacity: event.data.capacity,
        price: event.data.price,
        discount: event.data.discount,
      },
    });
    resetStates();
  }
}
function resetStates() {
  state.name = cabinData?.name || "";
  state.capacity = cabinData?.capacity || undefined;
  state.price = cabinData?.price || undefined;
  state.discount = cabinData?.discount || undefined;
  state.image = undefined;
}
</script>

<template>
  <UForm
    ref="form"
    :validate-on="['input']"
    :schema="UpdateCabinSchema"
    :state="state"
    class="w-full space-y-8"
    @submit="onSubmit"
  >
    <div class="border-b-grey-200 flex gap-12 border-b py-4">
      <label for="name" class="w-1/5 font-semibold">Name</label>
      <UFormField name="name">
        <UInput
          id="name"
          v-model="state.name"
          color="info"
          :ui="{
            base: ' disabled:bg-grey-50/10',
          }"
        />
      </UFormField>
    </div>

    <div class="border-b-grey-200 flex gap-12 border-b py-4">
      <label for="capacity" class="w-1/5 font-semibold">Capacity</label>
      <UFormField name="capacity">
        <UInputNumber
          id="capacity"
          v-model="state.capacity"
          color="info"
          :ui="{
            base: ' disabled:bg-grey-50/10',
          }"
        />
      </UFormField>
    </div>

    <div class="border-b-grey-200 flex gap-12 border-b py-4">
      <label for="price" class="w-1/5 font-semibold">Price</label>
      <UFormField name="price">
        <UInputNumber
          id="price"
          v-model="state.price"
          color="info"
          :ui="{
            base: ' disabled:bg-grey-50/10',
          }"
        />
      </UFormField>
    </div>

    <div class="border-b-grey-200 flex gap-12 border-b py-4">
      <label for="discount" class="w-1/5 font-semibold">Discount</label>
      <UFormField name="discount">
        <UInputNumber
          id="discount"
          v-model="state.discount"
          color="info"
          :ui="{
            base: ' disabled:bg-grey-50/10',
          }"
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
            form?.clear();
            resetStates();
          }
        "
      >
        Reset
      </UButton>
    </div>
  </UForm>
</template>
