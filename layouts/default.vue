<script setup></script>

<template>
  <div class="bg-grey-50 flex h-screen w-screen">
    <aside
      class="bg-grey-0 border-r-grey-100 flex w-[300px] flex-col gap-8 px-6 py-8"
    >
      <WildOasisLogo />
      <PageNav />
    </aside>
    <div class="flex w-full flex-col">
      <UserNav />
      <slot />
    </div>
  </div>
</template>
