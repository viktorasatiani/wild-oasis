<script setup lang="ts">
import type { TabsItem } from "@nuxt/ui";
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
    class="flex w-[500px] items-center justify-center"
    color="info"
  >
    <template #signUp="{ item }">
      <Transition name="tab-fade" mode="out-in" appear>
        <div key="signup" class="pt-4">
          <h1 class="text-center font-semibold">
            {{ item.content }}
          </h1>
          <FormsSignUp />
        </div>
      </Transition>
    </template>
    <template #logIn="{ item }">
      <Transition name="tab-fade" mode="out-in" appear>
        <div key="login" class="pt-4">
          <h1 class="text-center font-semibold">
            {{ item.content }}
          </h1>
          <FormsLogIn />
        </div>
      </Transition>
    </template>
  </UTabs>
</template>

<style>
.tab-fade-enter-active,
.tab-fade-leave-active {
  transition: all 0.8s ease;
}

.tab-fade-enter-from {
  opacity: 0;
  transform: translateX(10px);
}

.tab-fade-leave-to {
  opacity: 0;
  transform: translateX(-10px);
}
</style>
