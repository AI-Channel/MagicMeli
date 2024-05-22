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
      d="M2 0h1v1H2zM3 0h1v1H3zM4 0h1v1H4zM5 0h1v1H5zM6 0h1v1H6zM7 0h1v1H7zM8 0h1v1H8zM1 1h1v1H1zM9 1h1v1H9zM10 1h1v1h-1zM0 2h1v1H0zM8 2h1v1H8zM9 2h1v1H9zM10 2h1v1h-1zM0 3h1v1H0zM7 3h1v1H7zM8 3h1v1H8zM9 3h1v1H9zM11 3h1v1h-1zM0 4h1v1H0zM6 4h1v1H6zM7 4h1v1H7zM8 4h1v1H8zM11 4h1v1h-1zM0 5h1v1H0zM5 5h1v1H5zM6 5h1v1H6zM7 5h1v1H7zM11 5h1v1h-1zM0 6h1v1H0zM4 6h1v1H4zM5 6h1v1H5zM6 6h1v1H6zM11 6h1v1h-1zM0 7h1v1H0zM3 7h1v1H3zM4 7h1v1H4zM5 7h1v1H5zM11 7h1v1h-1zM0 8h1v1H0zM3 8h1v1H3zM4 8h1v1H4zM11 8h1v1h-1zM0 9h1v1H0zM11 9h1v1h-1zM1 10h1v1H1zM10 10h1v1h-1zM2 11h1v1H2zM3 11h1v1H3zM4 11h1v1H4zM5 11h1v1H5zM6 11h1v1H6zM7 11h1v1H7zM8 11h1v1H8zM9 11h1v1H9z"
    />
  </svg>
</template>

<style scoped></style>
