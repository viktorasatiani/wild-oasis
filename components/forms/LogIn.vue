<script setup lang="ts">
import type * as z from "zod";
import type { FormSubmitEvent } from "@nuxt/ui";
import type { SignUpSchema } from "~/utils/schemas";

const supabase = useSupabaseClient();
const isLoading = ref(false);

const toast = useToast();
type Schema = z.output<typeof SignUpSchema>;

const state = reactive<Partial<Schema>>({
  email: undefined,
  password: undefined,
});

const LogIn = async (values: { email: string; password: string }) => {
  isLoading.value = true;
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: values.email,
      password: values.password,
    });
    if (data.user) {
      toast.add({
        title: "Success",
        description: "Logged in successfully.",
        color: "success",
        "onUpdate:open": (open: boolean) => {
          if (!open) {
            console.log("Toast closed");
            navigateTo("/dashboard");
          }
        },
        duration: 1000,
      });
    }

    console.log("Login in response:", data);
    if (error) {
      throw error;
    }
  } catch (error) {
    toast.add({
      title: "Error! Something went wrong.",
      description: `${error}`,
      icon: "heroicons-solid:exclamation",
      color: "error",
    });
    console.error("Error logging in:", error);
    throw error;
  } finally {
    isLoading.value = false;
  }
};

async function onSubmit(event: FormSubmitEvent<Schema>) {
  console.log(event.data);
  await LogIn(event.data);
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
