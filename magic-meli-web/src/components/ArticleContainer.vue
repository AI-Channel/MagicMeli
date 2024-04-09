<script setup lang="ts">
import { GetRender } from '@/scripts/mdRenderer'
const props = defineProps<{
  source: string | undefined
}>()
</script>

<template>
  <div
    v-html="GetRender(typeof props.source == 'undefined' ? '' : props.source)"
    class="m-auto max-w-[750px] space-y-6 font-Fusion leading-7"
  ></div>
</template>

<style scoped>
:deep(a) {
  color: #eaa0e8;
}
:deep(a):hover {
  text-decoration: underline;
}
:deep(.header-anchor) {
  color: #4d23cf;
}
:deep(.header-anchor):hover {
  text-decoration: none;
}
</style>
