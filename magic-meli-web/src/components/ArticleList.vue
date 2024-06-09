<script setup lang="ts">
import type { ArticleMeta } from '@/models/article'
import { updateArticleStatusById, hardDelArticleById, getArticleListByStatus, getAllTagsByStatus } from '@/requests/article'
import { onMounted, onUpdated, ref, type Ref } from 'vue'
import StatusBar from './StatusBar.vue'
import TagsNav from './TagsNav.vue'
import { useArticleStore } from '@/stores/store'
import { renderInline } from '@/scripts/mdRenderer'
import { toast, type ToastOptions } from 'vue3-toastify'

let articleList: Ref<ArticleMeta[]> = ref([])
const store = useArticleStore()

const props = defineProps<{
  showMode: string | undefined
}>()

store.status = props.showMode ?? 'article'

onMounted(async () => {
  if (props.showMode) articleList.value = await getArticleListByStatus(props.showMode)
})

onUpdated(async () => {
  store.articleTags = await getAllTagsByStatus(store.status)
})

async function deleteArticle(id: number) {
  await updateArticleStatusById(id, 'delete')
  if (props.showMode == 'article') articleList.value = await getArticleListByStatus('article')
  else if (props.showMode == 'draft') articleList.value = await getArticleListByStatus('draft')
  autoToast('删除成功')
}

async function revertArticle(id: number) {
  await updateArticleStatusById(id, 'revert')
  articleList.value = await getArticleListByStatus('deleted')
  autoToast('恢复成功')
}

async function publishArticle(id: number) {
  await updateArticleStatusById(id, 'publish')
  articleList.value = await getArticleListByStatus('draft')
  autoToast('发布成功')
}

async function hardDelete(id: number) {
  if (confirm('确定要永久删除此文章吗？')) {
    await hardDelArticleById(id)
  }
  articleList.value = await getArticleListByStatus('deleted')
}

async function unpublishArticle(id: number) {
  await updateArticleStatusById(id, 'unpublish')
  articleList.value = await getArticleListByStatus('article')
  autoToast('撤销发布成功')
}

function autoToast(message: string) {
  toast.success(message, {
    autoClose: 1500,
    position: toast.POSITION.TOP_CENTER
  } as ToastOptions)
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
        @delete="deleteArticle(item.id)"
        @revert="revertArticle(item.id)"
        @hard-delete="hardDelete(item.id)"
        @publish="publishArticle(item.id)"
        @unpublish="unpublishArticle(item.id)"
      />
    </li>
  </ul>
  <img id="placeholder" src="/src/assets/graphs/nothing.svg" v-if="articleList.length == 0" class="m-auto size-36 select-none opacity-60" />
</template>

<style scoped></style>
