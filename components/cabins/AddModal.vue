<template>
  <UModal
    class="mt-10"
    fullscreen
    title="Add New Cabin"
    description="Fill out the form to add a new cabin"
    :ui="{
      header: 'flex justify-center items-center text-center',
    }"
  >
    <UButton
      class="bg-brand-600 text-brand-50 hover:bg-brand-700 max-w-1/6 px-4 py-2 uppercase hover:cursor-pointer"
      size="lg"
    >
      Add New Cabin
    </UButton>
    <template #body>
      <FormsNewCabin />
    </template>
  </UModal>
</template>
