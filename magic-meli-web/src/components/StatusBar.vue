<script setup lang="ts">
import type { Article } from '@/scripts/articleInfo'
import { useArticleStore } from '@/stores/store'
import IconDelete from './icons/IconDelete.vue'
import IconEdit from './icons/IconEdit.vue'
import IconReturn from './icons/IconReturn.vue'
import type { RouteRecordName } from 'vue-router'

const store = useArticleStore()
const props = defineProps<{
  article: Article
  showMode: string | RouteRecordName | null | undefined
}>()
</script>

<template>
  <div class="my-auto flex space-x-3">
    <RouterLink :to="{ name: 'markdown editor' }">
      <IconEdit
        :width="24"
        :height="24"
        @click="
          typeof props.article._content == 'undefined'
            ? (store.atricleContent = '')
            : (store.atricleContent = props.article._content)
        "
      />
    </RouterLink>
    <IconReturn
      v-if="props.showMode === 'recycle'"
      :width="24"
      :height="24"
      class="cursor-pointer"
      @click="$emit('changeDelStatus', false)"
    />
    <IconDelete
      v-else
      :width="24"
      :height="24"
      class="cursor-pointer"
      @click="$emit('changeDelStatus', true)"
    />
  </div>
</template>

<style scoped></style>
