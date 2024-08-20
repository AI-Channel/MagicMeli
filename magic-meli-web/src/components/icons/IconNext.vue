<script lang="ts" setup>
  const props = defineProps<{
    width?: number | string
    height?: number | string
  }>()
</script>

<template>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    class="fill-themeViolet dark:fill-darkViolet"
    :width="props.width"
    :height="props.height"
    viewBox="0 0 24 24"
  >
    <path fill-rule="evenodd" clip-rule="evenodd" d="M18 13V11H16V9H14V7H12V9H14V11H6V13H14V15H12V17H14V15H16V13H18Z" />
  </svg>
</template>

<style scoped></style>
