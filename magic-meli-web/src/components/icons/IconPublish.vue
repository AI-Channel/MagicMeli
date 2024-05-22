<script setup lang="ts">
const props = defineProps<{
  width?: number
  height?: number
}>()
</script>

<template>
  <svg xmlns="http://www.w3.org/2000/svg" :width="props.width" :height="props.height" viewBox="0 0 12 12" shape-rendering="crispEdges">
    <path
      class="fill-themeViolet dark:fill-darkViolet"
      d="M8 0h1v1H8zM9 0h1v1H9zM10 0h1v1h-1zM11 0h1v1h-1zM5 1h1v1H5zM6 1h1v1H6zM7 1h1v1H7zM10 1h1v1h-1zM11 1h1v1h-1zM2 2h1v1H2zM3 2h1v1H3zM4 2h1v1H4zM5 2h1v1H5zM9 2h1v1H9zM11 2h1v1h-1zM1 3h1v1H1zM8 3h1v1H8zM11 3h1v1h-1zM0 4h1v1H0zM1 4h1v1H1zM7 4h1v1H7zM10 4h1v1h-1zM1 5h1v1H1zM2 5h1v1H2zM6 5h1v1H6zM10 5h1v1h-1zM3 6h1v1H3zM4 6h1v1H4zM5 6h1v1H5zM9 6h1v1H9zM10 6h1v1h-1zM5 7h1v1H5zM9 7h1v1H9zM5 8h1v1H5zM9 8h1v1H9zM6 9h1v1H6zM9 9h1v1H9zM6 10h1v1H6zM7 10h1v1H7zM8 10h1v1H8zM7 11h1v1H7z"
    />
  </svg>
</template>

<style scoped></style>
