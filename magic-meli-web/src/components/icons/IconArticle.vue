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
      d="M5 3H3V21H5H19H21V3H19H5ZM19 5V19H5V5H19ZM17 7H7V9H17V7ZM7 11H17V13H7V11ZM14 15H7V17H14V15Z"
    />
  </svg>
</template>

<style scoped></style>
