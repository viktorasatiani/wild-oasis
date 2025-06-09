<script setup lang="ts">
const PageNavLinks: NavLinks[] = [
  { name: "Home", path: "/dashboard", icon: "heroicons-solid:home" },
  {
    name: "Bookings",
    path: "/bookings",
    icon: "heroicons-solid:calendar-days",
  },
  { name: "Cabins", path: "/cabins", icon: "heroicons-solid:home-modern" },
  { name: "Users", path: "/users", icon: "heroicons-solid:user" },
  {
    name: "Settings",
    path: "/settings",
    icon: "heroicons-solid:adjustments-horizontal",
  },
];
</script>

<template>
  <nav>
    <ul class="flex flex-col gap-2">
      <li v-for="{ name, path, icon } in PageNavLinks" :key="name">
        <ULink
          raw
          exact
          :to="path"
          class="hover:text-brand-600 hover:bg-grey-50 flex items-center gap-3 rounded-sm px-6 py-3 font-medium"
          active-class="bg-grey-50 text-brand-600 rounded-sm"
        >
          <UIcon :name="icon" size="24" />
          {{ name }}
        </ULink>
      </li>
    </ul>
  </nav>
</template>
