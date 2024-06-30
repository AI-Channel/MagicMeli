<script setup lang="ts">
const props = defineProps<{
  width?: number | string
  height?: number | string
}>()
</script>

<template>
  <svg xmlns="http://www.w3.org/2000/svg" :width="props.width" :height="props.height" viewBox="0 0 8 8" shape-rendering="crispEdges">
    <path
      fill="#4D23CF"
      d="M0 0h1v1H0zM1 0h1v1H1zM2 0h1v1H2zM3 0h1v1H3zM4 0h1v1H4zM5 0h1v1H5zM6 0h1v1H6zM7 0h1v1H7zM0 1h1v1H0zM7 1h1v1H7zM0 2h1v1H0zM2 2h1v1H2zM5 2h1v1H5zM7 2h1v1H7zM0 3h1v1H0zM2 3h1v1H2zM5 3h1v1H5zM7 3h1v1H7zM0 4h1v1H0zM7 4h1v1H7zM0 5h1v1H0zM1 5h1v1H1zM5 5h1v1H5zM6 5h1v1H6zM7 5h1v1H7zM2 6h1v1H2zM3 6h1v1H3zM5 6h1v1H5zM4 7h1v1H4zM5 7h1v1H5z"
    />
  </svg>
</template>

<style scoped></style>
