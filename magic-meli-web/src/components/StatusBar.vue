<script setup lang="ts">
  import { listQueryMode } from '@/models/article'
  import IconDelete from './icons/IconDelete.vue'
  import IconEdit from './icons/IconEdit.vue'
  import IconHardDelete from './icons/IconHardDelete.vue'
  import IconPublish from './icons/IconPublish.vue'
  import IconReturn from './icons/IconReturn.vue'
  import IconUnpublish from './icons/IconUnpublish.vue'

  const props = defineProps<{
    articleId: number
    showMode: listQueryMode
  }>()
  defineEmits(['publish', 'revert', 'hardDelete', 'unpublish', 'delete'])
</script>

<template>
  <div class="my-auto flex space-x-2">
    <RouterLink :to="{ name: 'markdown editor', query: { id: articleId } }">
      <IconEdit :width="24" :height="24" />
    </RouterLink>
    <IconPublish
      v-if="props.showMode === listQueryMode.draft"
      :width="24"
      :height="24"
      class="cursor-pointer"
      @click="$emit('publish')"
    />
    <IconReturn
      v-if="props.showMode === listQueryMode.deleted"
      :width="24"
      :height="24"
      class="cursor-pointer"
      @click="$emit('revert')"
    />
    <IconHardDelete
      v-if="props.showMode === listQueryMode.deleted"
      :width="24"
      :height="24"
      class="cursor-pointer"
      @click="$emit('hardDelete')"
    />
    <IconUnpublish
      v-if="props.showMode === listQueryMode.published"
      :width="24"
      :height="24"
      class="cursor-pointer"
      @click="$emit('unpublish')"
    />
    <IconDelete
      v-if="props.showMode !== listQueryMode.deleted"
      :width="24"
      :height="24"
      class="cursor-pointer"
      @click="$emit('delete')"
    />
  </div>
</template>

<style scoped></style>
