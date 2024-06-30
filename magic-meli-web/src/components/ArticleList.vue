<script setup lang="ts">
import { articleStatusHandles, listQueryMode, type ArticleListViewResponse } from '@/models/article'
import { getAllTagsByStatus, getArticleListByStatus, hardDelArticleById, updateArticleStatusById } from '@/requests/article'
import { autoToast } from '@/scripts/libs'
import { renderInline } from '@/scripts/mdRenderer'
import { useArticleStore } from '@/stores/store'
import { onMounted, onUpdated, ref, type Ref } from 'vue'
import StatusBar from './StatusBar.vue'
import TagsNav from './TagsNav.vue'

let articleList: Ref<ArticleListViewResponse[]> = ref([])
const store = useArticleStore()

const props = defineProps<{
  showMode: listQueryMode
}>()

store.status = props.showMode ?? listQueryMode.published

onMounted(async () => {
  articleList.value = await getArticleListByStatus(props.showMode)
})

onUpdated(async () => {
  store.articleTags = await getAllTagsByStatus(store.status)
})

async function deleteArticleById(id: number) {
  await updateArticleStatusById(id, articleStatusHandles.delete)
  if (props.showMode == 'published') articleList.value = await getArticleListByStatus(listQueryMode.published)
  else if (props.showMode == 'draft') articleList.value = await getArticleListByStatus(listQueryMode.draft)
  autoToast('删除成功', 'success')
}

async function revertArticleById(id: number) {
  await updateArticleStatusById(id, articleStatusHandles.revert)
  articleList.value = await getArticleListByStatus(listQueryMode.deleted)
  autoToast('恢复成功', 'success')
}

async function publishArticleById(id: number) {
  await updateArticleStatusById(id, articleStatusHandles.publish)
  articleList.value = await getArticleListByStatus(listQueryMode.draft)
  autoToast('发布成功', 'success')
}

async function hardDeleteArticleById(id: number) {
  if (confirm('确定要永久删除此文章吗？')) {
    await hardDelArticleById(id)
  }
  articleList.value = await getArticleListByStatus(listQueryMode.deleted)
}

async function unpublishArticleById(id: number) {
  await updateArticleStatusById(id, articleStatusHandles.unpublish)
  articleList.value = await getArticleListByStatus(listQueryMode.published)
  autoToast('撤销发布成功', 'success')
}
</script>

<template>
  <ul class="mx-2 my-auto flex flex-col text-themeViolet dark:text-darkViolet">
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
        @delete="deleteArticleById(item.id)"
        @revert="revertArticleById(item.id)"
        @hard-delete="hardDeleteArticleById(item.id)"
        @publish="publishArticleById(item.id)"
        @unpublish="unpublishArticleById(item.id)"
      />
    </li>
  </ul>
  <img id="placeholder" src="/src/assets/graphs/nothing.svg" v-if="articleList.length == 0" class="m-auto size-36 select-none opacity-60" />
</template>

<style scoped></style>
