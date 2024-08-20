<script lang="ts" setup>
  import { listQueryMode } from '@/models/article'
  import IconDelete from '../icons/IconDelete.vue'
  import IconEdit from '../icons/IconEdit.vue'
  import IconHardDelete from '../icons/IconHardDelete.vue'
  import IconPublish from '../icons/IconPublish.vue'
  import IconReturn from '../icons/IconReturn.vue'
  import IconUnpublish from '../icons/IconUnpublish.vue'

  const props = defineProps<{
    articleId: number
    showMode: listQueryMode
  }>()
  defineEmits(['publish', 'revert', 'hardDelete', 'unpublish', 'delete'])
</script>

<template>
  <aside class="my-auto flex space-x-2">
    <RouterLink :to="{ name: 'markdown editor', query: { id: articleId } }">
      <IconEdit :height="24" :width="24" />
      <span class="sr-only">编辑文章</span>
    </RouterLink>
    <button v-if="props.showMode === listQueryMode.draft" @click="$emit('publish')">
      <IconPublish :height="24" :width="24" class="cursor-pointer" />
      <span class="sr-only">发布文章</span>
    </button>
    <button v-if="props.showMode === listQueryMode.deleted" @click="$emit('revert')">
      <IconReturn :height="24" :width="24" class="cursor-pointer" />
      <span class="sr-only">还原文章</span>
    </button>
    <button v-if="props.showMode === listQueryMode.deleted" @click="$emit('hardDelete')">
      <IconHardDelete :height="24" :width="24" class="cursor-pointer" />
      <span class="sr-only">彻底删除文章</span>
    </button>
    <button
      v-if="props.showMode === listQueryMode.published || props.showMode === listQueryMode.search"
      @click="$emit('unpublish')"
    >
      <IconUnpublish :height="24" :width="24" class="cursor-pointer" />
      <span class="sr-only">撤销发布</span>
    </button>
    <button v-if="props.showMode !== listQueryMode.deleted" @click="$emit('delete')">
      <IconDelete :height="24" :width="24" class="cursor-pointer" />
      <span class="sr-only">删除文章</span>
    </button>
  </aside>
</template>

<style scoped></style>
