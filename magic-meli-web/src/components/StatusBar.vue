<script setup lang="ts">
import type { RouteRecordName } from 'vue-router'
import IconDelete from './icons/IconDelete.vue'
import IconEdit from './icons/IconEdit.vue'
import IconHardDelete from './icons/IconHardDelete.vue'
import IconReturn from './icons/IconReturn.vue'

const props = defineProps<{
  articleId: number
  showMode: string | RouteRecordName | null | undefined
}>()
</script>

<template>
  <div class="my-auto flex space-x-3">
    <RouterLink :to="{ name: 'markdown editor', query: { id: articleId } }">
      <IconEdit :width="24" :height="24" />
    </RouterLink>
    <IconReturn v-if="props.showMode === 'recycle'" :width="24" :height="24" class="cursor-pointer" @click="$emit('revert')" />
    <IconHardDelete v-if="props.showMode === 'recycle'" :width="24" :height="24" class="cursor-pointer" @click="$emit('hardDelete')" />
    <IconDelete v-else :width="24" :height="24" class="cursor-pointer" @click="$emit('delete')" />
  </div>
</template>

<style scoped></style>
