<script setup lang="ts">
import type { ArticleMeta } from '@/models/article'
import { delArticleById, getAllTags, getArticleList, getDelArticleList, hardDelArticleById, revertArticleById } from '@/requests/article'
import { onMounted, ref, type Ref } from 'vue'
import StatusBar from './StatusBar.vue'
import TagsNav from './TagsNav.vue'
import { useArticleStore } from '@/stores/store'
import { renderInline } from '@/scripts/mdRenderer'

let articleList: Ref<ArticleMeta[]> = ref([])
const store = useArticleStore()

const props = defineProps<{
  showMode: string | undefined
}>()

onMounted(async () => {
  if (props.showMode === 'article') articleList.value = await getArticleList()
  else if (props.showMode === 'recycle') articleList.value = await getDelArticleList()
  store.articleTags = await getAllTags()
})

async function hardDelete(id: number) {
  if (confirm('确定要永久删除此文章吗？')) {
    await hardDelArticleById(id)
  }
  articleList.value = await getDelArticleList()
}
</script>

<template>
  <ul class="m-auto flex flex-col text-themeViolet dark:text-darkViolet">
    <li
      v-for="(item, key) in articleList"
      class="flex place-content-between border-b border-dashed border-themeViolet p-3 font-Dinkie dark:border-darkViolet"
      :key="key"
      v-show="store.isAllCheckedTagsIn(new Set(item.tags))"
    >
      <div class="w-full">
        <RouterLink :to="{ name: 'article', params: { id: item.id } }">
          <h1 class="my-1 select-none hover:text-activeFuchsia dark:hover:text-indigo-400">
            {{ item.title }}
          </h1>
        </RouterLink>

        <TagsNav :tags="new Set(item.tags)" class="my-1" />
        <p class="line-clamp-3 w-3/4" v-html="renderInline(item.summary)"></p>
      </div>
      <StatusBar
        :article-id="item.id"
        :show-mode="props.showMode"
        @delete="
          async () => {
            await delArticleById(item.id)
            articleList = await getArticleList()
          }
        "
        @revert="
          async () => {
            await revertArticleById(item.id)
            articleList = await getDelArticleList()
          }
        "
        @hard-delete="hardDelete(item.id)"
      />
    </li>
  </ul>
</template>

<style scoped></style>
