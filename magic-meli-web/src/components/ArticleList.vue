<script setup lang="ts">
import type { ArticleMeta } from '@/models/article'
import { updateArticleStatusById, getAllTags, hardDelArticleById, getArticleListByStatus } from '@/requests/article'
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
  if (props.showMode) articleList.value = await getArticleListByStatus(props.showMode)
  store.articleTags = await getAllTags()
})

async function hardDelete(id: number) {
  if (confirm('确定要永久删除此文章吗？')) {
    await hardDelArticleById(id)
  }
  articleList.value = await getArticleListByStatus('deleted')
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
            await updateArticleStatusById(item.id, 'delete')
            if ($props.showMode == 'article') articleList = await getArticleListByStatus('article')
            else if ($props.showMode == 'draft') articleList = await getArticleListByStatus('draft')
          }
        "
        @revert="
          async () => {
            await updateArticleStatusById(item.id, 'revert')
            articleList = await getArticleListByStatus('deleted')
          }
        "
        @hard-delete="hardDelete(item.id)"
        @publish="
          async () => {
            await updateArticleStatusById(item.id, 'publish')
            articleList = await getArticleListByStatus('draft')
          }
        "
        @unpublish="
          async () => {
            await updateArticleStatusById(item.id, 'unpublish')
            articleList = await getArticleListByStatus('article')
          }
        "
      />
    </li>
  </ul>
</template>

<style scoped></style>
