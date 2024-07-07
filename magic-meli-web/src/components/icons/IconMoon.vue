<script setup lang="ts">
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
      d="M8 0H16V2H14V4H12V2H8V0ZM4 4V2H8V4H4ZM2 8V4H4V8H2ZM2 16H0V8H2V16ZM4 20H2V16H4V20ZM8 22H4V20H8V22ZM16 22V24H8V22H16ZM20 20V22H16V20H20ZM22 16V20H20V16H22ZM20 12V10H22V8H24V16H22V12H20ZM18 14V12H20V14H18ZM12 14V16H18V14H12ZM10 12V14H12V12H10ZM10 6V12H8V6H10ZM10 6H12V4H10V6Z"
    />
  </svg>
</template>

<style scoped></style>
