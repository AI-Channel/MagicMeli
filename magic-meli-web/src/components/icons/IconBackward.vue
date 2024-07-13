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
      d="M21 3L21 5L21 19L21 21L3 21L3 19L3 5L3 3L21 3ZM5 19L19 19L19 5L5 5L5 19ZM17 11L17 13L11 13L11 15L9 15L9 13L7 13L7 11L9 11L9 9L11 9L11 11L17 11ZM13 9L11 9L11 7L13 7L13 9ZM13 17L13 15L11 15L11 17L13 17Z"
    />
  </svg>
</template>

<style scoped></style>
