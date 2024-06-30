<script setup lang="ts">
const props = defineProps<{
  width?: number | string
  height?: number | string
}>()
</script>

<template>
  <svg xmlns="http://www.w3.org/2000/svg" class="fill-themeViolet dark:fill-white" :width="props.width" :height="props.height" viewBox="0 0 24 24">
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M16 2H18V4H16V2ZM14 6V4H16V6H14ZM12 8V6H14V8H12ZM10 10V8H12V10H10ZM8 12V10H10V12H8ZM12 16V18H8H6V16V12H8V16H12ZM14 14V16H12V14H14ZM16 12V14H14V12H16ZM18 10V12H16V10H18ZM20 8V10H18V8H20ZM20 6V4H18V6H20ZM20 6V8H22V6H20ZM4 4H10V6H4V20H18V14H20V20V22H18H4H2V20V6V4H4Z"
    />
  </svg>
</template>

<style scoped></style>
