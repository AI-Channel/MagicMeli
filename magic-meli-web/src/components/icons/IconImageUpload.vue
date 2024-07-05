<script setup lang="ts">
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
    viewBox="0 0 12 12"
    shape-rendering="crispEdges"
  >
    <path
      class="fill-themeViolet dark:fill-white"
      d="M0 0h1v1H0zM1 0h1v1H1zM2 0h1v1H2zM3 0h1v1H3zM4 0h1v1H4zM5 0h1v1H5zM6 0h1v1H6zM7 0h1v1H7zM8 0h1v1H8zM9 0h1v1H9zM10 0h1v1h-1zM11 0h1v1h-1zM0 1h1v1H0zM11 1h1v1h-1zM0 2h1v1H0zM3 2h1v1H3zM4 2h1v1H4zM11 2h1v1h-1zM0 3h1v1H0zM2 3h1v1H2zM3 3h1v1H3zM4 3h1v1H4zM5 3h1v1H5zM11 3h1v1h-1zM0 4h1v1H0zM2 4h1v1H2zM3 4h1v1H3zM4 4h1v1H4zM5 4h1v1H5zM11 4h1v1h-1zM0 5h1v1H0zM3 5h1v1H3zM4 5h1v1H4zM11 5h1v1h-1zM0 6h1v1H0zM10 6h1v1h-1zM11 6h1v1h-1zM0 7h1v1H0zM9 7h1v1H9zM10 7h1v1h-1zM11 7h1v1h-1zM0 8h1v1H0zM4 8h1v1H4zM5 8h1v1H5zM8 8h1v1H8zM9 8h1v1H9zM10 8h1v1h-1zM11 8h1v1h-1zM0 9h1v1H0zM3 9h1v1H3zM4 9h1v1H4zM5 9h1v1H5zM6 9h1v1H6zM7 9h1v1H7zM8 9h1v1H8zM9 9h1v1H9zM10 9h1v1h-1zM11 9h1v1h-1zM0 10h1v1H0zM2 10h1v1H2zM3 10h1v1H3zM4 10h1v1H4zM5 10h1v1H5zM6 10h1v1H6zM7 10h1v1H7zM8 10h1v1H8zM9 10h1v1H9zM10 10h1v1h-1zM11 10h1v1h-1zM0 11h1v1H0zM1 11h1v1H1zM2 11h1v1H2zM3 11h1v1H3zM4 11h1v1H4zM5 11h1v1H5zM6 11h1v1H6zM7 11h1v1H7zM8 11h1v1H8zM9 11h1v1H9zM10 11h1v1h-1zM11 11h1v1h-1z"
    />
  </svg>
</template>

<style scoped></style>
