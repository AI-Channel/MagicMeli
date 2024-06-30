<script setup lang="ts">
import { useArticleStore } from '@/stores/store'

const props = defineProps({
  tags: Set<string>
})
const store = useArticleStore()
</script>

<template>
  <nav>
    <span
      v-for="tag in props.tags"
      :key="tag"
      @click="store.checkedTags.has(tag) ? store.checkedTags.delete(tag) : store.checkedTags.add(tag)"
      class="mx-1 cursor-pointer select-none rounded-sm p-1 hover:bg-activeFuchsia hover:text-themeViolet dark:hover:bg-indigo-400 dark:hover:text-darkViolet"
      :class="{
        'bg-activeFuchsia': store.checkedTags.has(tag),
        'dark:bg-indigo-400': store.checkedTags.has(tag),
        'text-themeViolet': store.checkedTags.has(tag),
        'dark:text-darkViolet': store.checkedTags.has(tag)
      }"
      >{{ '#' + tag }}
    </span>
  </nav>
</template>

<style scoped></style>
