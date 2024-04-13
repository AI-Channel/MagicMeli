<script setup lang="ts">
import { Article, getArticleList } from '@/scripts/articleInfo'
import { useArticleStore } from '@/stores/store'
import TagsNav from './TagsNav.vue'
import StatusBar from './StatusBar.vue'
import type { RouteRecordName } from 'vue-router'

const store = useArticleStore()
function isArticleShow(
  tags: Set<string> | undefined,
  article: Article,
  showMode: string | RouteRecordName | null | undefined
) {
  switch (showMode) {
    case 'article':
      return store.isAllCheckedTagsIn(tags) && !store.isDeleted(article)
    case 'recycle':
      return store.isAllCheckedTagsIn(tags) && store.isDeleted(article)
  }
}
const props = defineProps<{
  showMode: string | RouteRecordName | null | undefined
}>()
</script>

<template>
  <ul class="m-auto flex flex-col">
    <li
      v-for="(article, key) in getArticleList()"
      class="flex place-content-between border-b border-dashed border-themeViolet p-3 font-Dinkie dark:border-darkViolet"
      :key="key"
      v-show="isArticleShow(article._tags, article, props.showMode)"
    >
      <div class="w-full">
        <RouterLink :to="{ name: article._name }">
          <h1 class="hover:text-activeFuchsia dark:text-darkViolet dark:hover:text-indigo-400">
            {{ $router.resolve({ name: article._name }).meta.title }}
          </h1>
        </RouterLink>
        <TagsNav :tags="article._tags" />
        <p class="line-clamp-3 w-3/4">{{ article._brief }}</p>
      </div>
      <StatusBar
        :article="article"
        :show-mode="props.showMode"
        @change-Del-Status="
          (delStatus) => {
            article.DeleteStatus = delStatus
          }
        "
      />
    </li>
  </ul>
</template>

<style scoped></style>
