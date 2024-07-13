<script lang="ts" setup>
  const props = defineProps<{
    width?: number | string
    height?: number | string
  }>()
</script>

<template>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    :width="props.width"
    :height="props.height"
    viewBox="0 0 14 14"
    shape-rendering="crispEdges"
  >
    <path
      fill="#D4D4D4"
      d="M2 0h1v1H2zM3 0h1v1H3zM4 0h1v1H4zM5 0h1v1H5zM8 0h1v1H8zM9 0h1v1H9zM10 0h1v1h-1zM11 0h1v1h-1zM2 1h1v1H2zM3 1h1v1H3zM4 1h1v1H4zM5 1h1v1H5zM8 1h1v1H8zM9 1h1v1H9zM10 1h1v1h-1zM11 1h1v1h-1zM0 2h1v1H0zM1 2h1v1H1zM6 2h1v1H6zM7 2h1v1H7zM12 2h1v1h-1zM13 2h1v1h-1zM0 3h1v1H0zM1 3h1v1H1zM6 3h1v1H6zM7 3h1v1H7zM12 3h1v1h-1zM13 3h1v1h-1zM0 4h1v1H0zM1 4h1v1H1zM12 4h1v1h-1zM13 4h1v1h-1zM0 5h1v1H0zM1 5h1v1H1zM12 5h1v1h-1zM13 5h1v1h-1zM0 6h1v1H0zM1 6h1v1H1zM12 6h1v1h-1zM13 6h1v1h-1zM0 7h1v1H0zM1 7h1v1H1zM12 7h1v1h-1zM13 7h1v1h-1zM2 8h1v1H2zM3 8h1v1H3zM10 8h1v1h-1zM11 8h1v1h-1zM2 9h1v1H2zM3 9h1v1H3zM10 9h1v1h-1zM11 9h1v1h-1zM4 10h1v1H4zM5 10h1v1H5zM8 10h1v1H8zM9 10h1v1H9zM4 11h1v1H4zM5 11h1v1H5zM8 11h1v1H8zM9 11h1v1H9zM6 12h1v1H6zM7 12h1v1H7zM6 13h1v1H6zM7 13h1v1H7z"
    />
  </svg>
</template>

<style scoped></style>
