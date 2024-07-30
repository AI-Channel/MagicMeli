<script lang="ts" setup>
  const props = defineProps<{
    width?: number | string
    height?: number | string
  }>()
</script>

<template>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    :width="props.width"
    :height="props.height"
    viewBox="0 0 24 24"
    class="fill-themeViolet dark:fill-darkViolet"
  >
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M6 2H14V4H6V2ZM4 6V4H6V6H4ZM4 14H2V6H4V14ZM6 16H4V14H6V16ZM14 16V18H6V16H14ZM16 14H14V16H16V18H18V20H20V22H22V20H20V18H18V16H16V14ZM16 6H18V14H16V6ZM14 6V4H16V6H14ZM14 8V6H12H10V8H12V10H14V8Z"
    />
  </svg>
</template>

<style scoped></style>
