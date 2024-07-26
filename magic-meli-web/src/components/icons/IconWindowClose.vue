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
      d="M4 2H20H22V4V20V22H20H4H2V20V4V2H4ZM6 20H18V18H20V6H18V4H6V6H4V18H6V20ZM8 16H6V18H8V16ZM10 14H8V16H10V14ZM10 10V14H14V16H16V18H18V16H16V14H14V10H16V8H18V6H16V8H14V10H10ZM8 8V6H6V8H8ZM8 8V10H10V8H8Z"
    />
  </svg>
</template>

<style scoped></style>
