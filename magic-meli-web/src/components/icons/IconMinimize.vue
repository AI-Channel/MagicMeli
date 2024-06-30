<script setup lang="ts">
const props = defineProps<{
  width?: number | string
  height?: number | string
}>()
</script>

<template>
  <svg xmlns="http://www.w3.org/2000/svg" class="fill-themeViolet dark:fill-white" :width="props.width" :height="props.height" viewBox="0 0 24 24">
    <path fill-rule="evenodd" clip-rule="evenodd" d="M4 2H20H22V4V20V22H20H4H2V20V4V2H4ZM4 4H20V20H4V4ZM14 16H6V18H14V16Z" />
  </svg>
</template>

<style scoped></style>
