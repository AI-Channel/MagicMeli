<script setup lang="ts">
  const props = defineProps<{
    width?: number
    height?: number
  }>()
</script>

<template>
  <svg
    :width="props.width"
    :height="props.height"
    viewBox="0 0 24 24"
    class="fill-themeViolet dark:fill-white"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M15 2H9V4H3V6V8H5V6H19V8H21V6V4H15V2ZM5 10H7V20H17V10H19V20V22H17H7H5V20V10ZM11 12H9V14H11V16H9V18H11V16H13V18H15V16H13V14H15V12H13V14H11V12Z"
      fill="#F87171"
    />
  </svg>
</template>

<style scoped></style>
