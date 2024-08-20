<script lang="ts" setup>
  const props = defineProps<{
    width?: number | string
    height?: number | string
  }>()
</script>

<template>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    class="fill-themeViolet dark:fill-darkViolet"
    :width="props.width"
    :height="props.height"
    viewBox="0 0 24 24"
  >
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M20 20V4H18V20H20ZM16 11V13H14V15H12V13H4V11H12V9H14V11H16ZM12 9H10V7H12V9ZM12 15V17H10V15H12Z"
    />
  </svg>
</template>

<style scoped></style>
