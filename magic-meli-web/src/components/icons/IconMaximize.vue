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
    class="fill-themeViolet dark:fill-white"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M20 2H4H2V4V20V22H4H20H22V20V4V2H20ZM20 4H4V20H20V4ZM8 6H16H18V8V16V18H16H8H6V16V8V6H8ZM8 16H16V8H8V16Z"
    />
  </svg>
</template>

<style scoped></style>
