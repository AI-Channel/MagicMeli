<script setup lang="ts">
const props = defineProps<{
  width?: number
  height?: number
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
      fill="#4D23CF"
      d="M0 0h1v1H0zM1 0h1v1H1zM2 0h1v1H2zM3 0h1v1H3zM4 0h1v1H4zM5 0h1v1H5zM6 0h1v1H6zM7 0h1v1H7zM8 0h1v1H8zM9 0h1v1H9zM10 0h1v1h-1zM11 0h1v1h-1zM0 1h1v1H0zM1 1h1v1H1zM10 1h1v1h-1zM11 1h1v1h-1zM0 2h1v1H0zM2 2h1v1H2zM9 2h1v1H9zM11 2h1v1h-1zM0 3h1v1H0zM3 3h1v1H3zM8 3h1v1H8zM11 3h1v1h-1zM0 4h1v1H0zM4 4h1v1H4zM7 4h1v1H7zM11 4h1v1h-1zM0 5h1v1H0zM5 5h1v1H5zM6 5h1v1H6zM11 5h1v1h-1zM0 6h1v1H0zM5 6h1v1H5zM6 6h1v1H6zM11 6h1v1h-1zM0 7h1v1H0zM4 7h1v1H4zM7 7h1v1H7zM11 7h1v1h-1zM0 8h1v1H0zM3 8h1v1H3zM8 8h1v1H8zM11 8h1v1h-1zM0 9h1v1H0zM2 9h1v1H2zM9 9h1v1H9zM11 9h1v1h-1zM0 10h1v1H0zM1 10h1v1H1zM10 10h1v1h-1zM11 10h1v1h-1zM0 11h1v1H0zM1 11h1v1H1zM2 11h1v1H2zM3 11h1v1H3zM4 11h1v1H4zM5 11h1v1H5zM6 11h1v1H6zM7 11h1v1H7zM8 11h1v1H8zM9 11h1v1H9zM10 11h1v1h-1zM11 11h1v1h-1z"
    />
  </svg>
</template>

<style scoped></style>
