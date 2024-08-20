<script lang="ts" setup>
  const props = defineProps<{
    width?: number | string
    height?: number | string
  }>()
</script>

<template>
  <svg
    :width="props.width"
    :height="props.height"
    viewBox="0 0 24 24"
    class="fill-themeViolet dark:fill-darkViolet"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M10 4H8V6H6V8H4V16H6V18H8V20H16V18H18V16H20V8H18V6H20V4H18H14V8V10H16V8H18V16H16V18H8V16H6V8H8V6H10V4Z"
    />
  </svg>
</template>

<style scoped></style>
