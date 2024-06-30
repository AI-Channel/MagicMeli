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
      d="M10 4H16V6H10V4ZM8 8V6H10V8H8ZM4 10V8H8V10H4ZM2 12V10H4V12H2ZM2 18H0V12H2V18ZM2 18H9V20H2V18ZM18 8H16V6H18V8ZM22 12H20H18V10V8H20V10H22V12ZM22 18H24V12H22V18ZM22 18V20H15V18H22ZM13 20H11V15H7V13H9V11H11V9H13V11H15V13H17V15H13V20Z"
    />
  </svg>
</template>

<style scoped></style>
