<script lang="ts" setup>
  import { type ArticleListViewResponse, articleStatusHandles, listQueryMode } from '@/models/article'
  import {
    getAllTagsByArticleList,
    getArticleListByStatus,
    hardDelArticleById,
    updateArticleStatusById
  } from '@/scripts/requests/article'
  import { autoToast } from '@/scripts/libs'
  import { useArticleStore, useUserStore } from '@/stores/store'
  import { onBeforeMount, onUpdated, ref, type Ref } from 'vue'
  import StatusBar from './ToolsBar.vue'
  import TagsNav from './InfoNav.vue'
  import { renderInline } from '@/scripts/mdRenderer'

  let articleList: Ref<ArticleListViewResponse[]> = ref([])
  const articleStore = useArticleStore()
  const userStore = useUserStore()
  const props = defineProps<{
    showMode: listQueryMode
  }>()

  onBeforeMount(async () => {
    articleList.value = await getArticleListByStatus(props.showMode)
    articleStore.articleMount = articleList.value.length
  })

  onUpdated(async () => {
    articleStore.articleTags = await getAllTagsByArticleList(articleList.value)
  })

  async function deleteArticleById(id: number) {
    try {
      await updateArticleStatusById(id, articleStatusHandles.delete)
      if (props.showMode == 'published') articleList.value = await getArticleListByStatus(listQueryMode.published)
      else if (props.showMode == 'draft') articleList.value = await getArticleListByStatus(listQueryMode.draft)
      autoToast('删除成功', 'success')
    } catch (error) {
      console.error('Unable to delete!')
      userStore.isLoggedIn = false
    }
  }

  async function revertArticleById(id: number) {
    try {
      await updateArticleStatusById(id, articleStatusHandles.revert)
      articleList.value = await getArticleListByStatus(listQueryMode.deleted)
      autoToast('恢复成功', 'success')
    } catch (error) {
      if ((error as Error).message == 'Request failed with status code 401') userStore.isLoggedIn = false
    }
  }

  async function publishArticleById(id: number) {
    try {
      await updateArticleStatusById(id, articleStatusHandles.publish)
      articleList.value = await getArticleListByStatus(listQueryMode.draft)
      autoToast('发布成功', 'success')
    } catch (error) {
      if ((error as Error).message == 'Request failed with status code 401') userStore.isLoggedIn = false
    }
  }

  async function hardDeleteArticleById(id: number) {
    try {
      if (confirm('确定要永久删除此文章吗？')) {
        await hardDelArticleById(id)
      }
      articleList.value = await getArticleListByStatus(listQueryMode.deleted)
    } catch (error) {
      if ((error as Error).message == 'Request failed with status code 401') userStore.isLoggedIn = false
    }
  }

  async function unpublishArticleById(id: number) {
    try {
      await updateArticleStatusById(id, articleStatusHandles.unpublish)
      articleList.value = await getArticleListByStatus(listQueryMode.published)
      autoToast('撤销发布成功', 'success')
    } catch (error) {
      if ((error as Error).message == 'Request failed with status code 401') userStore.isLoggedIn = false
    }
  }
</script>

<template>
  <ul class="m-auto flex max-w-[1000px] flex-col gap-y-2 text-themeViolet dark:text-darkViolet">
    <li
      v-for="(item, key) of articleList"
      v-show="articleStore.isContainAllCheckedTags(new Set(item.tags))"
      :key="key"
      class="flex place-content-between border-b border-dashed border-themeViolet p-3 font-Dinkie dark:border-darkViolet"
    >
      <div class="flex w-full flex-col gap-1">
        <h1
          class="my-1 w-fit cursor-pointer select-none hover:text-activeFuchsia dark:hover:text-indigo-400"
          @click="$router.push({ name: 'article', params: { id: item.id } })"
        >
          {{ item.title }}
        </h1>
        <TagsNav :author="item.author" :tags="new Set(item.tags)" class="my-1" />
        <!-- eslint-disable-next-line vue/no-v-html -->
        <p class="line-clamp-4 w-3/4" v-html="renderInline(item.summary)"></p>
      </div>
      <StatusBar
        v-if="userStore.isLoggedIn"
        :article-id="item.id"
        :show-mode="props.showMode"
        @delete="deleteArticleById(item.id)"
        @publish="publishArticleById(item.id)"
        @revert="revertArticleById(item.id)"
        @unpublish="unpublishArticleById(item.id)"
        @hard-delete="hardDeleteArticleById(item.id)"
      />
    </li>
  </ul>
  <img
    v-if="articleList.length == 0"
    id="placeholder"
    class="m-auto size-36 select-none opacity-60"
    src="/src/assets/graphs/nothing.svg"
    alt="该文章列表是空的"
  />
</template>

<style scoped></style>
