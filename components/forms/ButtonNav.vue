<script setup lang="ts">
defineOptions({
  inheritAttrs: false,
});
const { submitText, cancelText } = defineProps<{
  submitText: string;
  cancelText: string;
}>();
</script>

<template>
  <div class="flex justify-end pt-4">
    <UButton
      type="submit"
      class="bg-brand-600 text-brand-50 hover:bg-brand-700 px-4 py-2 uppercase hover:cursor-pointer"
      size="lg"
    >
      {{ submitText }}
    </UButton>
    <UButton
      type="reset"
      class="bg-grey-200 text-grey-900 hover:bg-grey-50 ml-2 px-4 py-2 uppercase hover:cursor-pointer"
      size="lg"
      v-bind="$attrs"
    >
      {{ cancelText }}
    </UButton>
  </div>
</template>
