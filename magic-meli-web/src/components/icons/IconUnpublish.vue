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
      d="M10 4H16V6H10V4ZM8 8V6H10V8H8ZM4 10V8H8V10H4ZM2 12V10H4V12H2ZM2 18H0V12H2V18ZM22 18V20H2V18H22ZM22 12H24V18H22V12ZM18 8H20V10H22V12H20H18V10V8ZM18 8V6H16V8H18ZM11 12V10H9V12H11ZM13 12H11V14H9V16H11V14H13V16H15V14H13V12ZM13 12V10H15V12H13Z"
    />
  </svg>
</template>

<style scoped></style>
