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
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M4 4V20H6V4H4ZM8 13V11H10V9H12V11H20V13H12V15H10V13H8ZM12 15H14V17H12V15ZM12 9V7H14V9H12Z"
    />
  </svg>
</template>

<style scoped></style>
