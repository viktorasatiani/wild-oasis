<script setup lang="ts">
import type * as z from "zod";
import type { FormSubmitEvent } from "@nuxt/ui";
import type { Database } from "~/types/database.types";
const InputObject = [
  {
    label: "New Password",
    type: "password",
    id: "newPassword",
  },
  {
    label: "Confirm Password",
    type: "password",
    id: "confirmPassword",
  },
];
const form = useTemplateRef<HTMLFormElement>("form");
const supabase = useSupabaseClient<Database>();
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
function resetStates() {
  state.newPassword = "";
  state.confirmPassword = "";
  form.value?.clear();
}
async function onSubmit(event: FormSubmitEvent<Schema>) {
  if (event.data.newPassword !== event.data.confirmPassword) {
    toast.add({
      title: "Error",
      description: "Passwords do not match.",
      color: "error",
      duration: 2000,
    });
    resetStates();
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
      <div
        v-for="item in InputObject"
        :key="item.id"
        class="border-b-grey-200 flex gap-12 border-b py-4"
      >
        <label :for="item.id" class="w-1/5 font-semibold">{{
          item.label
        }}</label>
        <UFormField :name="item.id">
          <UInput
            :id="item.id"
            v-model="state[item.id as keyof typeof state]"
            :type="item.type"
          />
        </UFormField>
      </div>
      <FormsButtonNav
        submit-text="Update Password"
        cancel-text="Cancel"
        @click.stop="resetStates"
      />
    </UForm>
  </div>
</template>
