<script setup lang="ts">
import type { TabsItem } from "@nuxt/ui";
import SignUp from "~/components/forms/SignUp.vue";
import LogIn from "~/components/forms/LogIn.vue";
definePageMeta({
  layout: "login",
});

const items = [
  {
    label: "Sign Up",
    icon: "heroicons-solid:user-add",
    content: "Enter Your Credentials and Sign Up",
    slot: "signUp" as const,
  },
  {
    label: "Log In",
    icon: "heroicons-solid:login",
    content: "If you already have an account, Log In here",
    slot: "logIn" as const,
  },
] satisfies TabsItem[];
</script>
<template>
  <UTabs
    :items="items"
    class="flex w-[500px] items-center justify-center space-y-4"
    color="info"
  >
    <template #signUp="{ item }">
      <h1 class="text-center font-semibold">
        {{ item.content }}
      </h1>
      <SignUp />
    </template>
    <template #logIn="{ item }">
      <h1 class="text-center font-semibold">
        {{ item.content }}
      </h1>
      <LogIn />
    </template>
  </UTabs>
</template>
