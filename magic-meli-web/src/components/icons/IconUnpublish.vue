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
      d="M4 2h1v1H4zM7 2h1v1H7zM4 3h1v1H4zM7 3h1v1H7zM2 4h1v1H2zM4 4h1v1H4zM7 4h1v1H7zM9 4h1v1H9zM3 5h1v1H3zM4 5h1v1H4zM7 5h1v1H7zM8 5h1v1H8zM0 6h1v1H0zM4 6h1v1H4zM7 6h1v1H7zM11 6h1v1h-1zM0 7h1v1H0zM5 7h1v1H5zM6 7h1v1H6zM11 7h1v1h-1zM0 8h1v1H0zM11 8h1v1h-1zM0 9h1v1H0zM2 9h1v1H2zM3 9h1v1H3zM4 9h1v1H4zM5 9h1v1H5zM6 9h1v1H6zM7 9h1v1H7zM8 9h1v1H8zM9 9h1v1H9zM11 9h1v1h-1zM0 10h1v1H0zM11 10h1v1h-1zM0 11h1v1H0zM1 11h1v1H1zM2 11h1v1H2zM3 11h1v1H3zM4 11h1v1H4zM5 11h1v1H5zM6 11h1v1H6zM7 11h1v1H7zM8 11h1v1H8zM9 11h1v1H9zM10 11h1v1h-1zM11 11h1v1h-1z"
    />
  </svg>
</template>

<style scoped></style>
