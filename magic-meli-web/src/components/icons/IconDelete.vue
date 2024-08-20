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
      d="M9 2H15V4H21V6V8H19V6H5V8H3V6V4H9V2ZM7 10H5V20V22H7H17H19V20V10H17V20H7V10ZM9 12H11V18H9V12ZM15 12H13V18H15V12Z"
    />
  </svg>
</template>

<style scoped></style>
