<script setup lang="ts">
const props = defineProps<{
  title?: string
}>()
</script>

<template>
  <div
    draggable="true"
    class="m-auto flex max-h-full scale-90 select-none flex-col text-balance rounded-sm p-1 text-white sm:scale-100 lg:hover:bg-gray-200 lg:hover:bg-opacity-30 4k:scale-150"
  >
    <div class="flex justify-center">
      <slot></slot>
    </div>
    <p class="text-center font-Dinkie subpixel-antialiased">{{ props.title }}</p>
  </div>
</template>

<style scoped></style>
