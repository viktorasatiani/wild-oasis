<script setup lang="ts">
import type * as z from "zod";
import type { FormSubmitEvent } from "@nuxt/ui";
const form = useTemplateRef("form");
const supabase = useSupabaseClient();
type Schema = z.output<typeof ChangePasswordSchema>;

const state = reactive<Partial<Schema>>({
  newPassword: "",
  confirmPassword: "",
});
const toast = useToast();

async function UpdatePassword(password: string) {
  try {
    const { error } = await supabase.auth.updateUser({
      password,
    });
    if (error) {
      throw error;
    } else {
      toast.add({
        title: "Success",
        description: "Password updated successfully.",
        color: "success",
        duration: 2000,
      });
      state.newPassword = "";
      state.confirmPassword = "";
    }
  } catch (error) {
    console.error("Error updating password:", error);
    toast.add({
      title: "Error",
      description: "Failed to update password.",
      color: "error",
      duration: 2000,
    });
  }
}

async function onSubmit(event: FormSubmitEvent<Schema>) {
  if (event.data.newPassword !== event.data.confirmPassword) {
    toast.add({
      title: "Error",
      description: "Passwords do not match.",
      color: "error",
      duration: 2000,
    });
    return;
  } else {
    await UpdatePassword(event.data.newPassword);
  }
}
</script>

<template>
  <div class="flex flex-col gap-8 py-4">
    <h1 class="text-2xl font-bold">Update Password</h1>
    <UForm
      ref="form"
      :schema="ChangePasswordSchema"
      :state="state"
      class="bg-grey-100 space-y-2 rounded-sm px-4 py-2"
      @submit="onSubmit"
    >
      <div class="border-b-grey-200 flex gap-12 border-b py-4">
        <label for="newPassword" class="w-1/5 font-semibold"
          >New Password</label
        >
        <UFormField name="newPassword">
          <UInput
            id="newPassword"
            v-model="state.newPassword"
            type="password"
          />
        </UFormField>
      </div>
      <div class="border-b-grey-200 flex gap-12 border-b py-4">
        <label for="confirmPassword" class="w-1/5 font-semibold"
          >Confirm Password</label
        >
        <UFormField name="confirmPassword">
          <UInput
            id="confirmPassword"
            v-model="state.confirmPassword"
            type="password"
            :ui="{
              base: ' disabled:bg-grey-50/10',
            }"
          />
        </UFormField>
      </div>
      <div class="flex justify-end pt-4">
        <UButton
          type="submit"
          class="bg-brand-600 text-brand-50 hover:bg-brand-700 px-4 py-2 uppercase"
          size="lg"
        >
          Update Password
        </UButton>
        <UButton
          class="bg-grey-200 text-grey-900 hover:bg-grey-50 ml-2 px-4 py-2 uppercase"
          size="lg"
          @click="
            state.confirmPassword = '';
            state.newPassword = '';
            form?.clear();
          "
        >
          Cancel
        </UButton>
      </div>
    </UForm>
  </div>
</template>
