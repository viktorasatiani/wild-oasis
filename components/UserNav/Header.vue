<template>
  <ul class="flex gap-2">
    <li>
      <ULink as="button" to="/account">
        <UButton
          icon="heroicons-solid:user"
          size="md"
          class="text-brand-600 hover:bg-grey-100 rounded-full p-2 transition-all hover:cursor-pointer"
          variant="ghost"
        />
      </ULink>
    </li>
    <li>
      <ChangeTheme />
    </li>
    <li>
      <UserNavLogOut />
    </li>
  </ul>
</template>
