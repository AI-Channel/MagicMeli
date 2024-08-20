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
      d="M21 6H19V8H17V10H15V12H13V14H11V16H9V14H7V12H5V10H3V12H5V14H7V16H9V18H11V16H13V14H15V12H17V10H19V8H21V6Z"
    />
  </svg>
</template>

<style scoped></style>
