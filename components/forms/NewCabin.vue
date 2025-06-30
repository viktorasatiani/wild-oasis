<script setup lang="ts">
import type * as z from "zod";
import type { FormSubmitEvent } from "@nuxt/ui";
import type { Database } from "~/types/database.types";
const supabase = useSupabaseClient<Database>();
type Schema = z.output<typeof CreateCabinSchema>;
type CreateCabin = {
  name: string;
  capacity: number;
  price: number;
  discount: number;
  description: string;
  image: File;
};
const state = reactive<Partial<Schema>>({
  name: undefined,
  capacity: undefined,
  price: undefined,
  discount: undefined,
  description: undefined,
  image: undefined,
});

const toast = useToast();
async function checkName(name: string) {
  try {
    const { data, error } = await supabase
      .from("cabins")
      .select("name")
      .eq("name", name);
    if (error) {
      throw error;
    }
    return data.length > 0;
  } catch (error) {
    toast.add({
      title: "Can't check name",
      description: `${error}`,
      color: "error",
      duration: 2000,
    });
  }
}
async function createCabin({ cabin }: { cabin: CreateCabin }) {
  try {
    const fileName = `cabin-${cabin.name}.jpg`;
    const { error: storageError } = await supabase.storage
      .from("images")
      .upload(fileName, cabin.image, {
        contentType: "image/jpg",
      });

    if (storageError) {
      throw storageError;
    }
    if (!storageError) {
      const { data } = supabase.storage.from("images").getPublicUrl(fileName);
      const cabinUrl = data.publicUrl;
      const { error } = await supabase.from("cabins").insert({
        name: cabin.name,
        capacity: cabin.capacity,
        price: cabin.price,
        discount: cabin.discount,
        description: cabin.description,
        image: cabinUrl,
      });
      if (error) {
        throw error;
      }
    }
  } catch (error) {
    toast.add({
      title: "Error",
      description: `${error} `,
      color: "error",
      duration: 2000,
    });
  }
}
async function onSubmit(event: FormSubmitEvent<Schema>) {
  const isNameTaken = await checkName(event.data.name);
  if (isNameTaken) {
    toast.add({
      title: "Error",
      description: "Cabin name is already taken.",
      color: "error",
      duration: 2000,
    });
    return;
  } else {
    await createCabin({
      cabin: {
        name: event.data.name,
        capacity: event.data.capacity,
        price: event.data.price,
        discount: event.data.discount,
        description: event.data.description as string,
        image: event.data.image as File,
      },
    });
  }
  toast.add({
    title: "Success",
    description: "The form has been submitted.",
    color: "success",
    duration: 2000,
  });
  console.log(event.data);
}
</script>

<template>
  <UForm
    :schema="CreateCabinSchema"
    :state="state"
    class="space-y-4"
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
    <div class="border-b-grey-200 flex gap-12 border-b py-4">
      <label for="description" class="w-1/5 font-semibold">Description</label>
      <UFormField name="description">
        <UInput
          id="description"
          v-model="state.description"
          color="info"
          :ui="{
            base: ' disabled:bg-grey-50/10',
          }"
        />
      </UFormField>
    </div>
    <div class="border-b-grey-200 flex gap-12 border-b py-4">
      <label for="avatar" class="w-1/5 font-semibold">Avatar URL</label>
      <UFormField name="avatar">
        <UInput
          id="avatar"
          type="file"
          class="w-[162px]"
          @change="
            (e: Event) => {
              const files = (e.target as HTMLInputElement).files;
              state.image = files && files.length > 0 ? files[0] : undefined;
            }
          "
        />
      </UFormField>
    </div>

    <UButton type="submit"> Submit </UButton>
  </UForm>
</template>
