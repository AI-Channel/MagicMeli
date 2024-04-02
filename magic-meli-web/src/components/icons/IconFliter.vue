<script setup lang="ts">
const props = defineProps<{
  width?: number
  height?: number
  color?: string
}>()
</script>

<template>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    :width="props.width"
    :height="props.height"
    viewBox="0 0 12 12"
    shape-rendering="crispEdges"
  >
    <path
      :fill="props.color"
      d="M0 0h1v1H0zM1 0h1v1H1zM2 0h1v1H2zM3 0h1v1H3zM4 0h1v1H4zM5 0h1v1H5zM6 0h1v1H6zM7 0h1v1H7zM8 0h1v1H8zM9 0h1v1H9zM10 0h1v1h-1zM11 0h1v1h-1zM0 1h1v1H0zM1 1h1v1H1zM2 1h1v1H2zM3 1h1v1H3zM4 1h1v1H4zM5 1h1v1H5zM6 1h1v1H6zM7 1h1v1H7zM8 1h1v1H8zM9 1h1v1H9zM10 1h1v1h-1zM11 1h1v1h-1zM1 2h1v1H1zM2 2h1v1H2zM3 2h1v1H3zM4 2h1v1H4zM5 2h1v1H5zM6 2h1v1H6zM7 2h1v1H7zM8 2h1v1H8zM9 2h1v1H9zM10 2h1v1h-1zM2 3h1v1H2zM3 3h1v1H3zM4 3h1v1H4zM5 3h1v1H5zM6 3h1v1H6zM7 3h1v1H7zM8 3h1v1H8zM9 3h1v1H9zM3 4h1v1H3zM4 4h1v1H4zM5 4h1v1H5zM6 4h1v1H6zM7 4h1v1H7zM8 4h1v1H8zM4 5h1v1H4zM5 5h1v1H5zM6 5h1v1H6zM7 5h1v1H7zM5 6h1v1H5zM6 6h1v1H6zM5 7h1v1H5zM6 7h1v1H6zM5 8h1v1H5zM6 8h1v1H6zM5 9h1v1H5zM6 9h1v1H6zM5 10h1v1H5z"
    />
  </svg>
</template>

<style scoped></style>
