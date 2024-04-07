<script setup lang="ts">
import { GetArticleList } from '@/scripts/articleInfo'
import { useTagStore } from '@/stores/store'

const store = useTagStore()
</script>

<template>
  <div>
    <div
      v-for="(item, key) in GetArticleList()"
      class="font-Dinkie hover:text-activeFuchsia dark:hover:text-indigo-400"
      :key="key"
      v-show="store.IsAllCheckedTagsIn(item.tags)"
    >
      <RouterLink :to="{ name: item.name }"
        ><h1>{{ item.title }}</h1></RouterLink
      >
      <span
        v-for="tag in item.tags?.value"
        :key="tag"
        @click="
          store.checkedTags.has(tag) ? store.checkedTags.delete(tag) : store.checkedTags.add(tag)
        "
        class="mx-1 cursor-pointer select-none rounded-sm p-1 hover:bg-activeFuchsia hover:text-themeViolet dark:hover:bg-indigo-400 dark:hover:text-darkViolet"
        :class="{
          'bg-activeFuchsia': store.TagIsChecked(tag),
          'dark:bg-indigo-400': store.TagIsChecked(tag),
          'text-themeViolet': store.TagIsChecked(tag),
          'dark:text-darkViolet': store.TagIsChecked(tag)
        }"
        >{{ '#' + tag }}</span
      >
      <div class="line-clamp-2 max-w-screen-xl">{{ item.brief }}</div>
      <hr />
    </div>
  </div>
</template>

<style scoped></style>
