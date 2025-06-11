<script setup lang="ts">
import type * as z from "zod";
import type { FormSubmitEvent } from "@nuxt/ui";
import type { SignUpSchema } from "~/utils/schemas";
const supabase = useSupabaseClient();
type Schema = z.output<typeof SignUpSchema>;

const state = reactive<Partial<Schema>>({
  email: undefined,
  password: undefined,
});

const LogIn = async (values: { email: string; password: string }) => {
  try {
    const { data } = await supabase.auth.signInWithPassword({
      email: values.email,
      password: values.password,
    });
    if (data.user) {
      navigateTo("/dashboard");
    }
    console.log("Login in response:", data);
  } catch (error) {
    console.error("Error logging in:", error);
    throw error;
  }
};

const toast = useToast();
async function onSubmit(event: FormSubmitEvent<Schema>) {
  console.log(event.data);
  await LogIn(event.data);
  toast.add({
    title: "Success",
    description: "The form has been submitted.",
    color: "success",
  });
}
</script>

<template>
  <UForm
    :schema="SignUpSchema"
    :state="state"
    class="flex w-full flex-col items-center justify-center space-y-6 py-6"
    :loading-auto="true"
    @submit="onSubmit"
  >
    <UFormField
      label="Email"
      name="email"
      required
      size="lg"
      :ui="{ label: 'font-bold' }"
      class="w-1/2"
    >
      <UInput
        v-model="state.email"
        placeholder="Enter Your Email"
        class="w-full"
      />
    </UFormField>

    <UFormField
      label="Password"
      name="password"
      required
      size="lg"
      class="w-1/2"
      :ui="{ label: 'font-bold' }"
    >
      <UInput
        v-model="state.password"
        type="password"
        class="w-full"
        placeholder="Enter Your Password"
      />
    </UFormField>

    <UButton
      type="submit"
      class="flex w-1/2 items-center justify-center"
      label="Log In"
      variant="solid"
      color="info"
      size="md"
    />
  </UForm>
</template>
