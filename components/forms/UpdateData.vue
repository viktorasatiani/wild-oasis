<script setup lang="ts">
import type * as z from "zod";
import type { FormSubmitEvent } from "@nuxt/ui";

type Schema = z.output<typeof UpdateDataSchema>;

const state = reactive<Partial<Schema>>({
  email: undefined,
  userName: undefined,
  avatar: undefined,
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
  <div class="flex flex-col gap-8 py-14">
    <h1 class="text-2xl font-bold">Update User Data</h1>
    <UForm
      :schema="UpdateDataSchema"
      :state="state"
      class="bg-grey-100 space-y-4 rounded-sm p-8"
      @submit="onSubmit"
    >
      <div class="border-b-grey-200 flex gap-12 border-b py-4">
        <label for="email" class="w-1/5 font-semibold">Email</label>
        <UFormField name="email">
          <UInput id="email" v-model="state.email" />
        </UFormField>
      </div>
      <div class="border-b-grey-200 flex gap-12 border-b py-4">
        <label for="userName" class="w-1/5 font-semibold">User Name</label>
        <UFormField name="userName">
          <UInput id="userName" v-model="state.userName" />
        </UFormField>
      </div>
      <div class="border-b-grey-200 flex gap-12 border-b py-4">
        <label for="avatar" class="w-1/5 font-semibold">Avatar URL</label>
        <UFormField name="avatar">
          <UInput
            id="avatar"
            v-model="state.avatar"
            type="file"
            class="w-[162px]"
          />
        </UFormField>
      </div>
      <div class="flex justify-end pt-4">
        <UButton type="submit"> Submit </UButton>
        <UButton
          type="reset"
          variant="outline"
          class="ml-2"
          @click="state = {}"
        >
          Cancel
        </UButton>
      </div>
    </UForm>
  </div>
</template>
