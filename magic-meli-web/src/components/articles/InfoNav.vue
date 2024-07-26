<script lang="ts" setup>
  import { useArticleStore } from '@/stores/store'

  const props = defineProps<{ author: string; tags: Set<string> }>()
  const store = useArticleStore()
</script>

<template>
  <nav class="flex select-none flex-wrap gap-x-12">
    <span>{{ '作者: ' + props.author }}</span>
    <span>
      <span>标签: </span>
      <span
        v-for="tag in props.tags"
        :key="tag"
        :class="{
          'bg-activeFuchsia': store.checkedTags.has(tag),
          'dark:bg-indigo-300': store.checkedTags.has(tag),
          'text-themeViolet': store.checkedTags.has(tag),
          'dark:text-darkViolet': store.checkedTags.has(tag)
        }"
        class="mx-1 cursor-pointer rounded-sm p-1 hover:bg-activeFuchsia hover:text-themeViolet dark:hover:bg-indigo-300 dark:hover:text-darkViolet"
        @click="store.checkedTags.has(tag) ? store.checkedTags.delete(tag) : store.checkedTags.add(tag)"
        >{{ '#' + tag }}
      </span>
    </span>
  </nav>
</template>

<style scoped></style>
