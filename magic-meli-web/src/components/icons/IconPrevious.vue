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
    <path fill-rule="evenodd" clip-rule="evenodd" d="M6 11V13H8V15H10V17H12V15H10V13H18V11H10V9H12V7H10V9H8V11H6Z" />
  </svg>
</template>

<style scoped></style>
