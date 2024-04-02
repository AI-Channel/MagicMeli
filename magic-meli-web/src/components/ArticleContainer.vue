<script setup lang="ts">
import { GetRender } from '@/scripts/mdRenderer'
const props = defineProps<{
  source: string
}>()
</script>

<template>
  <div
    v-html="GetRender(props.source)"
    class="m-auto flex max-w-[750px] flex-wrap space-y-6 leading-7"
  ></div>
</template>

<style scoped></style>
