<script lang="ts" setup>
  const props = defineProps<{
    title?: string
  }>()
</script>

<template>
  <div
    class="flex max-h-full w-24 select-none flex-col text-balance rounded-sm p-1 text-white sm:scale-100 lg:hover:bg-gray-200 lg:hover:bg-opacity-30 4k:scale-150"
  >
    <div class="flex justify-center">
      <slot></slot>
    </div>
    <span class="text-center font-Dinkie text-themeViolet subpixel-antialiased dark:text-windowFuchsia">
      {{ props.title }}
    </span>
  </div>
</template>

<style scoped></style>
