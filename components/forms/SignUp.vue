<script setup lang="ts">
import type * as z from "zod";
import type { FormSubmitEvent } from "@nuxt/ui";
import type { SignUpSchema } from "~/utils/schemas";
import type { Database } from "~/types/database.types";

const supabase = useSupabaseClient<Database>();

const signUp = async (values: {
  email: string;
  password: string;
  userName: string;
}) => {
  console.log(values);
  try {
    const { data } = await supabase.auth.signUp({
      email: values.email,
      password: values.password,
      options: {
        data: {
          name: values.userName,
        },
      },
    });
    if (data.user) {
      toast.add({
        title: "Success",
        description: "Sign Up Successful.",
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
  } catch (error) {
    console.error("Error signing up:", error);
    throw error;
  }
};

type Schema = z.output<typeof SignUpSchema>;

const state = reactive<Partial<Schema>>({
  email: undefined,
  password: undefined,
  userName: undefined,
});

const toast = useToast();
async function onSubmit(event: FormSubmitEvent<Schema>) {
  const values = { ...event.data };
  console.log("Form submitted with values:", values);

  await signUp(values);

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
    loading-auto
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

    <UFormField
      label="userName"
      name="userName"
      required
      size="lg"
      class="w-1/2"
      :ui="{ label: 'font-bold' }"
    >
      <UInput
        v-model="state.userName"
        class="w-full"
        placeholder="Enter Your userName"
      />
    </UFormField>

    <UButton
      type="submit"
      class="flex w-1/2 items-center justify-center"
      label="Sign Up"
      variant="solid"
      color="info"
      size="md"
    />
  </UForm>
</template>
