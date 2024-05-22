<script setup lang="ts">
const props = defineProps<{
  width?: number
  height?: number
}>()
</script>

<template>
  <svg xmlns="http://www.w3.org/2000/svg" :width="props.width" :height="props.height" viewBox="0 0 8 8" shape-rendering="crispEdges">
    <path
      class="fill-themeViolet dark:fill-darkViolet"
      d="M2 0h1v1H2zM5 0h1v1H5zM6 0h1v1H6zM7 0h1v1H7zM1 1h1v1H1zM5 1h1v1H5zM6 1h1v1H6zM0 2h1v1H0zM5 2h1v1H5zM7 2h1v1H7zM0 3h1v1H0zM7 3h1v1H7zM0 4h1v1H0zM7 4h1v1H7zM0 5h1v1H0zM7 5h1v1H7zM1 6h1v1H1zM6 6h1v1H6zM2 7h1v1H2zM3 7h1v1H3zM4 7h1v1H4zM5 7h1v1H5z"
    />
  </svg>
</template>

<style scoped></style>
