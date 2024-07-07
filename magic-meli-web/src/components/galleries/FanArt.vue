<script lang="ts" setup>
  import { getImages } from '@/scripts/imageinfo'
  import MasonryLayout from '@/components/MasonryLayout.vue'
</script>

<template>
  <MasonryLayout :images="getImages('fanart').value" />
</template>

<style scoped></style>
