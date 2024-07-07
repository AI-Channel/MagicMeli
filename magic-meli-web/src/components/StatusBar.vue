<script lang="ts" setup>
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
      <IconEdit :height="24" :width="24" />
    </RouterLink>
    <IconPublish
      v-if="props.showMode === listQueryMode.draft"
      :height="24"
      :width="24"
      class="cursor-pointer"
      @click="$emit('publish')"
    />
    <IconReturn
      v-if="props.showMode === listQueryMode.deleted"
      :height="24"
      :width="24"
      class="cursor-pointer"
      @click="$emit('revert')"
    />
    <IconHardDelete
      v-if="props.showMode === listQueryMode.deleted"
      :height="24"
      :width="24"
      class="cursor-pointer"
      @click="$emit('hardDelete')"
    />
    <IconUnpublish
      v-if="props.showMode === listQueryMode.published"
      :height="24"
      :width="24"
      class="cursor-pointer"
      @click="$emit('unpublish')"
    />
    <IconDelete
      v-if="props.showMode !== listQueryMode.deleted"
      :height="24"
      :width="24"
      class="cursor-pointer"
      @click="$emit('delete')"
    />
  </div>
</template>

<style scoped></style>
