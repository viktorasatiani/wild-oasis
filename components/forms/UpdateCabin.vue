<script setup lang="ts">
import * as z from "zod";
import type { FormSubmitEvent } from "@nuxt/ui";
interface Props {
  cabinData?: Cabin;
}
const props = defineProps<Props>();
console.log(props.cabinData, "from form");
const schema = z.object({
  name: z.string().min(1, "Cabin name is required"),
  capacity: z.number().min(1, "Capacity must be at least 1").optional(),
  price: z.number().min(0, "Price must be at least 0").optional(),
  discount: z.number().min(0, "Discount must be at least 0").optional(),
  image: z.string().optional(),
});

type Schema = z.output<typeof schema>;

const state = reactive<Partial<Schema>>({
  name: props.cabinData?.name || "",
  capacity: props.cabinData?.capacity || undefined,
  price: props.cabinData?.price || undefined,
  discount: props.cabinData?.discount || undefined,
  image: props.cabinData?.image || undefined,
});

const toast = useToast();
async function onSubmit(event: FormSubmitEvent<Schema>) {
  toast.add({
    title: "Success",
    description: "The form has been submitted.",
    color: "success",
  });
  console.log(event.data);
}
</script>

<template>
  <UForm
    :schema="schema"
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
          :ui="{
            base: ' disabled:bg-grey-50/10',
          }"
        />
      </UFormField>
    </div>

    <div class="border-b-grey-200 flex gap-12 border-b py-4">
      <label for="capacity" class="w-1/5 font-semibold">Capacity</label>
      <UFormField name="capacity">
        <UInput
          id="capacity"
          v-model="state.capacity"
          type="text"
          :ui="{
            base: ' disabled:bg-grey-50/10',
          }"
        />
      </UFormField>
    </div>

    <div class="border-b-grey-200 flex gap-12 border-b py-4">
      <label for="price" class="w-1/5 font-semibold">Price</label>
      <UFormField name="price">
        <UInput
          id="price"
          v-model="state.price"
          type="text"
          :ui="{
            base: ' disabled:bg-grey-50/10',
          }"
        />
      </UFormField>
    </div>

    <div class="border-b-grey-200 flex gap-12 border-b py-4">
      <label for="discount" class="w-1/5 font-semibold">Discount</label>
      <UFormField name="discount">
        <UInput
          id="discount"
          v-model="state.discount"
          type="text"
          :ui="{
            base: ' disabled:bg-grey-50/10',
          }"
        />
      </UFormField>
    </div>

    <UFormField label="Image" name="image">
      <UInput v-model="state.image" />
    </UFormField>

    <UButton type="submit"> Submit </UButton>
  </UForm>
</template>
