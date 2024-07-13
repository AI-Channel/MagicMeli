<script lang="ts" setup>
  const props = defineProps<{
    width?: number | string
    height?: number | string
  }>()
</script>

<template>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    class="fill-themeViolet dark:fill-white"
    :width="props.width"
    :height="props.height"
    viewBox="0 0 24 24"
  >
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M2 2H22V4V6H20V4H4V6H2V4V2ZM6 8H4V6H6V8ZM8 10H6V8H8V10ZM10 12H8V10H10V12ZM14 12V22H12V20H10V12H12H14ZM16 10V12H14V10H16ZM18 8V10H16V8H18ZM18 8H20V6H18V8Z"
    />
  </svg>
</template>

<style scoped></style>
