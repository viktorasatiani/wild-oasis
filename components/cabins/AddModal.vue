<script setup lang="ts">
const isModalOpen = ref(false);
const emit = defineEmits(["refreshTable"]);
</script>

<template>
  <UModal
    v-model:open="isModalOpen"
    class="mt-10"
    fullscreen
    title="Add New Cabin"
    description="Fill out the form to add a new cabin"
    :ui="{
      header: 'flex justify-center items-center text-center',
    }"
  >
    <UButton
      class="bg-brand-600 text-brand-50 hover:bg-brand-700 w-fit text-nowrap px-4 py-2 uppercase hover:cursor-pointer"
      size="lg"
      @click="isModalOpen = true"
    >
      Add New Cabin
    </UButton>
    <template #body>
      <FormsNewCabin
        :is-modal-open="isModalOpen"
        @close-modal="
          () => {
            isModalOpen = false;
            emit('refreshTable');
          }
        "
      />
    </template>
  </UModal>
</template>
