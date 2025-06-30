<template>
  <UModal
    fullscreen
    title="Add New Cabin"
    description="Fill out the form to add a new cabin"
  >
    <UButton
      class="bg-brand-600 text-brand-50 hover:bg-brand-700 px-4 py-2 uppercase hover:cursor-pointer"
      size="lg"
    >
      Add New Cabin
    </UButton>
    <template #body>
      <FormsNewCabin />
    </template>
  </UModal>
</template>
