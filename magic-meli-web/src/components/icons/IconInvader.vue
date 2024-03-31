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
    viewBox="0 0 11 11"
    shape-rendering="crispEdges"
  >
    <path
      fill="#4D23CF"
      d="M2 1h1v1H2zM8 1h1v1H8zM3 2h1v1H3zM7 2h1v1H7zM2 3h1v1H2zM3 3h1v1H3zM4 3h1v1H4zM5 3h1v1H5zM6 3h1v1H6zM7 3h1v1H7zM8 3h1v1H8zM1 4h1v1H1zM2 4h1v1H2zM4 4h1v1H4zM5 4h1v1H5zM6 4h1v1H6zM8 4h1v1H8zM9 4h1v1H9zM0 5h1v1H0zM1 5h1v1H1zM2 5h1v1H2zM3 5h1v1H3zM4 5h1v1H4zM5 5h1v1H5zM6 5h1v1H6zM7 5h1v1H7zM8 5h1v1H8zM9 5h1v1H9zM10 5h1v1h-1zM0 6h1v1H0zM2 6h1v1H2zM3 6h1v1H3zM4 6h1v1H4zM5 6h1v1H5zM6 6h1v1H6zM7 6h1v1H7zM8 6h1v1H8zM10 6h1v1h-1zM0 7h1v1H0zM2 7h1v1H2zM8 7h1v1H8zM10 7h1v1h-1zM3 8h1v1H3zM4 8h1v1H4zM6 8h1v1H6zM7 8h1v1H7z"
    />
  </svg>
</template>

<style scoped></style>
