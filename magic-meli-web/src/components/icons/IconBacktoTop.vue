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
      d="M20 4H4V6H20V4ZM11 8H13V10H15V12H13V20H11V12H9V10H11V8ZM9 12V14H7V12H9ZM15 12H17V14H15V12Z"
    />
  </svg>
</template>

<style scoped></style>
