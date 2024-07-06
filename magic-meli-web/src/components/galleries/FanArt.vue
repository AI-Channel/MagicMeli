<script setup lang="ts">
  import { getImages } from '@/scripts/imageinfo'
  import MasonryLayout from '@/components/MasonryLayout.vue'
</script>

<template>
  <MasonryLayout :images="getImages('fanart').value" />
</template>

<style scoped></style>
